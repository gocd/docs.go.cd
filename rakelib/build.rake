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
    if file.exclude? 'index.md'
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

desc "build the documentation"
task :compile => [:clean, :init, :check_for_title, :run_hugo]
task :build => [:compile, "static_checks:all"]

