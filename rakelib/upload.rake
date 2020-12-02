require 'aws-sdk-s3'
require 'json'
require 'parallel'
require 'mime/types'

desc "upload files to s3 differentially"
task :upload_to_s3 do

  S3_BUCKET = ENV['S3_BUCKET']
  REMOTE_NAME = ENV['REMOTE_NAME'] || "origin"

  def compute_md5_of_local_object(local_file)
    return %Q{"#{Digest::MD5.file(local_file).to_s}"}
  end

  def has_md5_changed?(etag_from_s3, computed_md5)
    return !etag_from_s3.eql?(computed_md5)
  end

  s3_client = Aws::S3::Client.new(region: 'us-east-1')
  last_key = nil
  objects = []
  begin
    new_objects = s3_client.list_objects(bucket: S3_BUCKET, marker: last_key)
    objects += new_objects.contents
    last_key = objects.last.key
  end while !new_objects.contents.empty?
  objects_from_s3 = {}
  objects.each do |object|
    objects_from_s3[object.key] = object.etag
  end

  repo_url = `git config --get remote.#{REMOTE_NAME}.url`.strip
  # Whatever's there on gh-pages is what we need to upload to s3
  rm_rf "build"
  sh("git clone #{repo_url} build --branch gh-pages --depth 1")

  cd "build" do
    rm_rf ".git"
    rm_rf ".bundle"
    rm_rf "vendor"
    # each key represents a path on the local file relative to build directory if it exists, else it needs to be deleted from the bucket
    need_to_be_deleted = []
    need_to_be_changed = []
    objects_from_s3.keys.each do |key|
      if File.exist?(key)
        if has_md5_changed?(objects_from_s3[key], compute_md5_of_local_object(key))
          need_to_be_changed << key
        end
      else
        need_to_be_deleted << {key: key}
      end
    end

    local_files =  Dir.glob('**/*', File::FNM_DOTMATCH).reject {|fn| File.directory?(fn) }
    local_files << Dir.glob("current/**/*", File::FNM_DOTMATCH).reject {|fn| File.directory?(fn) }

    need_to_be_created = local_files.flatten.select {|object_to_be_created| !objects_from_s3.include?(object_to_be_created);}

    unless need_to_be_created.empty?
      puts 'Files that need to be created on s3'
      p need_to_be_created
      puts "Creating..."
      Parallel.map(need_to_be_created, in_threads: 5) do |file|
        puts "Uploading new file #{file} to #{S3_BUCKET}/#{file}"
        s3_client.put_object({acl:           "public-read",
                              body:          File.read(file),
                              bucket:        S3_BUCKET,
                              cache_control: "max-age=600",
                              content_type:  MIME::Types.type_for(file).first.content_type,
                              content_md5:   Digest::MD5.file(file).base64digest,
                              key:           file
                             })
      end
    end

    unless need_to_be_changed.empty?
      puts 'Files that need to be updated on s3'
      p need_to_be_changed
      puts "Syncing changed files..."
      Parallel.map(need_to_be_changed, in_threads: 5) do |file|
        puts "Uploading changed file #{file} to #{S3_BUCKET}/#{file}"
        s3_client.put_object({acl:           "public-read",
                              body:          File.read(file),
                              bucket:        S3_BUCKET,
                              cache_control: "max-age=600",
                              content_type:  MIME::Types.type_for(file).first.content_type,
                              content_md5:   Digest::MD5.file(file).base64digest,
                              key:           file
                             })
      end
    end

    unless need_to_be_deleted.empty?
      puts 'Files that need to be deleted on s3'
      p need_to_be_deleted
      puts "Deleting files..."
      objects_to_be_deleted = need_to_be_deleted.map { |object_to_be_deleted| object_to_be_deleted[:key] }
      puts objects_to_be_deleted
      s3_client.delete_objects({bucket: S3_BUCKET,
                                delete: {
                                    objects: need_to_be_deleted
                                }
                               })
    end
  end
end
