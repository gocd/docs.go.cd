import cd.go.contrib.plugins.configrepo.groovy.dsl.*
import java.util.function.*

def buildStage = {
  new Stage("Build", {
    jobs {
      job("BuildWebsite") {
        elasticProfileId = 'ecs-gocd-dev-build'
        tasks {
          bash {
            commandString = "bundle install --path .bundle --jobs 4"
          }
          bash {
            commandString = "bundle exec rake build"
          }
        }
      }
    }
  })
}

def pushToGHPages = {
  new Stage("PushToGHPages", {
    jobs {
      job("PushToGHPages") {
        elasticProfileId = 'ecs-gocd-dev-build'
        tasks {
          bash {
            commandString = "git remote add upstream 'https://\${BUILD_MAP_USER}:\${BUILD_MAP_PASSWORD}@github.com/gocd/docs.go.cd'"
          }
          bash {
            commandString = "bundle install --path .bundle --jobs 4"
          }
          bash {
            commandString = "ALLOW_DIRTY=true REMOTE_NAME=upstream bundle exec rake publish"
          }
        }
      }
    }
  })
}

GoCD.script { GoCD buildScript ->

  pipelines {

    pipeline("docs.gocd.org-master") {
      group = 'gocd-help-docs'
      materials {
        git {
          url = 'https://github.com/gocd/docs.go.cd'
          branch = "master"
          shallowClone = true
        }
      }
      trackingTool {
        link = 'https://github.com/gocd/docs.go.cd/issues/${ID}'
        regex = ~/##(\\d+)/
      }
      stages {
        add(buildStage())
        add(pushToGHPages())
      }
    }

    pipeline("docs.gocd.org-PR") {
      group = 'gocd-help-docs'
      materials {
        pluggable {
          scm = '4b2cfb9e-95ed-4b39-9ac0-cf007f6c7c41'
        }
      }
      trackingTool {
        link = 'https://github.com/gocd/docs.go.cd/issues/${ID}'
        regex = ~/##(\\d+)/
      }
      stages {
        add(buildStage())
      }
    }

    ['17.8.0', '17.9.0', '17.10.0', '17.11.0', '17.12.0', '18.1.0', '18.2.0', '18.3.0', '18.4.0', '18.5.0', '18.6.0', '18.7.0', '18.8.0', '18.9.0', '18.10.0', '18.11.0'].reverse().each { String releaseVersion ->
      pipeline("docs.gocd.org-${releaseVersion}") {
        group = "gocd-help-docs"
        materials {
          git {
            url = 'https://github.com/gocd/docs.go.cd'
            branch = "release-${releaseVersion}"
            shallowClone = true
          }
        }
        trackingTool {
          link = 'https://github.com/gocd/docs.go.cd/issues/${ID}'
          regex = ~/##(\\d+)/
        }
        stages {
          add(buildStage())
          add(pushToGHPages())
        }
      }
    }
  }
  
  environments {
    environment("docs-website") {
      pipelines = buildScript.pipelines.getNames().findAll {!it.toUpperCase().contains('PR')}
    }
  }
}
