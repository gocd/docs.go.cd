require 'rake/clean'
require 'yaml'
require 'nokogiri'

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

desc 'Add anchor tag to all the headers'
task :header_anchors do
  begin
    Dir["public/**/*.html"].select {|file|
      html = Nokogiri::HTML(open(file))
      puts "Parsing file: " + file.pathmap
      html.css('h1,h2,h3,h4,h5,h6').each {|header|
        if header['id'] == nil || header['id'].exclude?('searchResultTitle')
          id               = header['id'] || generate_id(header.text)
          i                = Nokogiri::XML::Node.new "i", html
          i['class']       = "fa fa-link"
          i['aria-hidden'] = "true"

          a          = Nokogiri::XML::Node.new "a", html
          a['href']  = '#' + id
          a['class'] = "header-anchor"
          a.content  = "a"

          i.parent = a
          header.children.first.add_previous_sibling(a)
        end
      }
      File.write(file, html.to_html)
    }
    puts 'Successfully created header anchors!!!'
  rescue Exception => e
    puts 'Failed: Error while generating header anchors!!!' + e.message
    puts e.backtrace
  end
end

desc "build the documentation"
task :compile => [:clean, :init, :check_for_title, :run_hugo, :header_anchors]
task :build => [:compile, "static_checks:all"]

private_methods

def generate_id text
  downcase       = text.strip.downcase
  id_with_spaces = downcase.gsub! /[^a-zA-z0-9_]+/, ' '
  if id_with_spaces === nil
    return downcase
  end
  id_with_spaces = id_with_spaces.strip
  id             = id_with_spaces.gsub! /[ ]+/, '-'
  if id === nil
    return id_with_spaces
  end
  id
end
