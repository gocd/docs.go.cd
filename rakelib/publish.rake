desc "publish the documentation"
task :publish => :compile do
  def env(key, default=nil)
    value = ENV[key].to_s.strip
    if default
      if value == ''
        value = default
      end
    else
      fail "Please specify #{key}" if value == ''
    end

    value
  end

  git_short_sha=`git log -1 --format=%h`.strip
  remote_name = env('REMOTE_NAME', 'origin')

  repo_url = `git config --get remote.#{remote_name}.url`.strip

  rm_rf "build"
  sh("git clone #{repo_url} build --branch gh-pages --depth 1 --quiet")
  cd "build" do
    rm_rf GOCD_VERSION
    cp_r '../public', GOCD_VERSION
    response = %x[git status]
    unless response.include?('nothing to commit')
      sh("git add --all .")
      sh("git commit -m 'Updating site to latest commit (#{git_short_sha})'")
      sh("git push")
    end
  end
end
