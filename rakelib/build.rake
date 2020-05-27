require 'rake/clean'
require 'yaml'

CLEAN.include('build')
CLEAN.include('resources')
CLEAN.include('public')

task :init do
  sh("npm install")
end

task :run_hugo do
  sh('npm run index')
  sh('npm run hugo')
end

desc 'Check for title property on every md file'
task :check_for_title do
  missing_title = []
  Dir['content/**/*.md'].select {|file|
    unless file.include? 'menu/index.md'
      begin
        thing = YAML.load_file(file)
        title = thing['title']
        unless title
          missing_title.push(file)
        end
      rescue
        missing_title.push(file)
      end
    end
  }
  if missing_title.length > 0
    raise 'Title is mandatory for search functionality' + "\n" + missing_title.join("\n")
  else
    puts 'Success!!!'
  end
end

desc 'Check for non-ascii chars in the md files'
task :exit_if_non_ascii_file_found do
  error_files = []
  Dir['content/**/*.md'].select {|filename|
    contents   = File.read(filename)
    ascii_only = contents.ascii_only?
    unless ascii_only
      error_files.push(filename)
    end
  }
  if error_files.length > 0
    raise "Warning!!! Following files have non-ASCII chars in them. Please rectify them!" + "\n" + error_files.join('\n')
  else
    puts "No non-ASCII chars found!!!"
  end
end

desc "build the documentation"
task :compile => [:clean, :init]
task :run_pre_tests => [:compile, :check_for_title, :exit_if_non_ascii_file_found]
task :build => [:compile, :run_hugo]
task :run_post_tests => ["static_checks:all"]

task :complete_build => [:run_pre_tests, :run_hugo, :run_post_tests]

