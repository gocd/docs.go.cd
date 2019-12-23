import cd.go.contrib.plugins.configrepo.groovy.dsl.*

def olderReleases = ['18.6.0', '18.7.0', '18.8.0', '18.9.0', '18.10.0', '18.11.0', '18.12.0', '19.1.0', '19.2.0', '19.3.0', '19.4.0','19.5.0','19.6.0','19.7.0','19.8.0','19.9.0','19.10.0','19.11.0','19.12.0']

def secureEnvironmentVariable = [
        S3_BUCKET            : 'AES:mL2zKhw4ubTrkW6VpSeyzA==:18KxKvOYTeRz1Q66Ku4wR5OudnR/fg242hnV9U/xluvkgXZfJKilC/fTrAbeEvg1',
        AWS_ACCESS_KEY_ID    : 'AES:Fg2eF3OOL7HT/9i44QRkcQ==:LYBNfjX8iKms0SY134E9OYmJgnUmtoi1YQF2v02Q7ig=',
        AWS_SECRET_ACCESS_KEY: 'AES:xDx9e28nKpnGNBi1FIsVLw==:LBfSbRxTzuA3zeatXKUkI6B1ytDQJ/5X+foL4pZPTKBCg/eXuQIk6jMXZaA5ivhz'
]


def buildStage = {
    new Stage("Build", {
        cleanWorkingDir = true
        jobs {
            job("BuildWebsite") {
                elasticProfileId = 'ubuntu18-ruby-java11'
                tasks {
                    bash {
                        commandString = "bundle install --path .bundle --jobs 4"
                    }
                    bash {
                        commandString = "RUN_EXTERNAL_CHECKS=true bundle exec rake complete_build"
                    }
                }
            }
        }
    })
}

def pushToGHPages = {
    new Stage("PushToGHPages", {
        cleanWorkingDir = true
        jobs {
            job("PushToGHPages") {
                elasticProfileId = 'ubuntu18-ruby-java11'
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
        cleanWorkingDir = true    
        jobs {
            job("upload") {
                elasticProfileId = 'ubuntu18-ruby-java11'
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
            secureEnvironmentVariables = secureEnvironmentVariable

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

        olderReleases.reverse().each { String releaseVersion ->
            pipeline("docs.gocd.org-${releaseVersion}") {
                group = "gocd-help-docs"
                materials {
                    git {
                        url = 'https://github.com/gocd/docs.go.cd'
                        branch = "release-${releaseVersion}"
                        shallowClone = true
                    }
                }
                environmentVariables = [
                    'GOCD_VERSION': releaseVersion
                ]
                secureEnvironmentVariables = secureEnvironmentVariable
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
        }
    }

    environments {
        environment("docs-website") {
            pipelines = buildScript.pipelines.getNames().findAll { !it.toUpperCase().contains('PR') }
        }
    }
}
