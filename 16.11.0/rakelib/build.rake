desc "build the documentation"
task :build do
  sh('npm prune')
  sh('npm install')
  sh('npm run-script init-gitbook')
  sh('npm run-script build')
  sh('npm run-script minify')
end
