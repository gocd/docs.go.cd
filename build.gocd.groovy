import cd.go.contrib.plugins.configrepo.groovy.dsl.*

def buildStage = {
  new Stage("Build", {
    jobs {
      job("BuildWebsite") {
        elasticProfileId = 'azure-plugin-ubuntu-with-ruby'
        tasks {
          bash {
            commandString = "bundle install --path .bundle --jobs 4"
          }
          bash {
            commandString = "RUN_EXTERNAL_CHECKS=true bundle exec rake build"
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
        elasticProfileId = 'azure-plugin-ubuntu-with-ruby'
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

def publishToS3 = {
  new Stage("S3Sync", {
    approval {
      type = 'manual'
    }
    jobs {
      job("upload") {
        elasticProfileId = 'azure-plugin-ubuntu-with-ruby'
        tasks {
          bash {
            commandString = "bundle install --path .bundle --jobs 4"
          }
          bash {
            commandString = "bundle exec rake upload_to_s3"
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
      secureEnvironmentVariables = [
          S3_BUCKET: 'AES:wApT20gDs92BBye8P4KRdQ==:s7UcbL2meF2oaJByRVByctUhP4zJ3tYbWb8yRA9XhxfjZVgiZGIjsNBBFRWwXSab',
          AWS_ACCESS_KEY_ID: 'AES:95gXr1OS5axZIU3/M87fEQ==:z+klSBd3uRG4FAaQeQXiUqQPhdL5Q1e2e01Lf6AxKQQ=',
          AWS_SECRET_ACCESS_KEY: 'AES:6cotZPRM2XvOcWChu/ckEQ==:QqDO6vq2N8nE8c3thzATmVi0UEhEmTNaJvjUMXB9G9JaZF4dLQpjY5qnbVvJ8wa8'
      ]
      
      trackingTool {
        link = 'https://github.com/gocd/docs.go.cd/issues/${ID}'
        regex = ~/##(\\d+)/
      }
      stages {
        add(buildStage())
        add(pushToGHPages())
        add(publishToS3())
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

    ['18.2.0', '18.3.0', '18.4.0', '18.5.0', '18.6.0', '18.7.0', '18.8.0', '18.9.0', '18.10.0', '18.11.0', '18.12.0', '19.1.0'].reverse().each { String releaseVersion ->
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
