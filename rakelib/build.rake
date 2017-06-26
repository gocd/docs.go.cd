desc "build the documentation"
task :build do
  sh('yarn install')
  sh('yarn run init-gitbook')
  sh('yarn run build')
  sh('yarn run minify')
end
