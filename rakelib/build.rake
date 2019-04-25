require 'rake/clean'
require 'yaml'

CLEAN.include('build')
CLEAN.include('resources')
CLEAN.include('public')

task :init do
  sh("yarn install")
end

task :run_hugo do
  sh('yarn run index')
  sh('yarn run hugo')
end

desc 'Check for title property on every md file'
task :check_for_title do
  missing_title = []
  Dir['content/**/*.md'].select {|file|
    if file.exclude? 'menu/index.md'
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
def files_with_non_ascii_chars(non_allowed_char_files)
  Dir['content/**/*.md'].select {|filename|
    contents   = File.read(filename)
    ascii_only = contents.ascii_only?
    unless ascii_only
      non_allowed_char_files.push(filename)
    end
  }
end

task :check_for_non_ascii_chars do
  non_allowed_char_files = []
  files_with_non_ascii_chars(non_allowed_char_files)
  if non_allowed_char_files.length > 0
    warn "Warning!!! Following files have non-ASCII chars in them. Please rectify them!" + "\n" + non_allowed_char_files.join('\n')
  else
    puts "No non-ASCII chars found!!!"
  end
end

task :exit_if_non_ascii_file_found do
  error_files = []
  files_with_non_ascii_chars(error_files)
  if error_files.length > 0
    raise "Warning!!! Following files have non-ASCII chars in them. Please rectify them!" + "\n" + error_files.join('\n')
  else
    puts "No non-ASCII chars found!!!"
  end
end

desc "build the documentation"
task :compile => [:clean, :init, :check_for_title, :check_for_non_ascii_chars, :run_hugo]
task :build => [:compile, "static_checks:all"]

desc 'extra tasks for PR to be approved'
task :compile_pr => [:clean, :init, :check_for_title, :exit_if_non_ascii_file_found, :run_hugo]
task :build_pr => [:compile_pr, "static_checks:all"]

