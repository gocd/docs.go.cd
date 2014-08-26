
 

Writing a package material plugin
=================================

### Introduction

A package repository typically holds a set of packages, each of which
can have multiple versions. Package repository material allows Go to
trigger a pipeline(s) when a newer version of a package is published. Go
bundles [yum-repo-poller plugin](yum_repository_poller.md) by default,
this plugin can communicate with a yum repository. The following
sections talk about how to write a plugin which can communicate with
other type of repositories.

The starting point for the plugin author while writing [package
material](../advanced_usage/package_material.html) plugin is to implement the
PackageMaterialProvider interface. The implementation of
PackageMaterialProvider interface is responsible for providing a
configuration provider (say SampleRepositoryConfiguration) and a
repository poller (say SampleRepositoryPoller) for the package.

``` {.code}
    public class SamplePackageRepoMaterial implements PackageMaterialProvider {
        public SampleRepositoryConfiguration getConfig() {
            return new SampleRepositoryConfiguration();
        }

        public SampleRepositoryPoller getPoller() {
            return new SampleRepositoryPoller();
        }
    }
        
```

Here SampleRepositoryConfiguration is the configuration provider and is
responsible for dictating what configurations should be captured by Go
to communicate with the package repository.

``` {.code}
    public class SampleRepositoryConfiguration implements PackageMaterialConfiguration {
        public RepositoryConfiguration getRepositoryConfiguration() {
            ...
        }

        public PackageConfiguration getPackageConfiguration() {
            ...
        }

        public ValidationResult isRepositoryConfigurationValid(RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public ValidationResult isPackageConfigurationValid(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }
    }
        
```

For a given configuration, repository poller, in this case
SamplePackageMaterialPoller, should communicate with the package
repository to fetch the latest package.

``` {.code}
    public class SamplePackageMaterialPoller implements PackageMaterialPoller {
        public PackageRevision getLatestRevision(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public PackageRevision latestModificationSince(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration, PackageRevision packageRevision) {
            ...
        }

        public Result checkConnectionToRepository(RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public Result checkConnectionToPackage(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }
    }
        
```

### Configuration Provider

The configuration provider should implement PackageMaterialConfiguration
interface. Go will communicate with the implementation of
PackageMaterialConfiguration to know what configuration should be
captured, so that the PackageMaterialPoller can later use this
information to get latest package details. PackageMaterialConfiguration
is also expected to validate configurations. Every configuration type
(Example : RepositoryConfiguration and PackageConfiguration) will have a
set properties. Each
[property](../resources/javadoc/com/thoughtworks/go/plugin/api/material/packagerepository/Property.html)
has a key, value and a list of options. Options are a way to define
metadata for the property, For example: Display name of the property can
be set using the Property.DISPLAY\_NAME option.
PackageMaterialConfiguration forces plugin author to implement following
methods.

-   **getRepositoryConfiguration:** This method should return the
    repository level configuration that is needed to be captured while
    configuring a package material in Go. The configuration information
    should be returned as an instance of RepositoryConfiguration.

    ``` {.code}
        public RepositoryConfiguration getRepositoryConfiguration() {
            RepositoryConfiguration repositoryConfiguration = new RepositoryConfiguration();
            repositoryConfiguration.add(new Property("REPO_URL").with(Property.DISPLAY_NAME, "Repository Url").with(Property.DISPLAY_ORDER, 0));
            repositoryConfiguration.add(new Property("USERNAME").with(Property.DISPLAY_NAME, "Username").with(Property.DISPLAY_ORDER, 1));
            repositoryConfiguration.add(new Property("PASSWORD").with(Property.DISPLAY_NAME, "Password").with(Property.DISPLAY_ORDER, 2));
            return repositoryConfiguration;
        }
                    
    ```

-   **getPackageConfiguration:** This method should return the package
    configuration that is needed to be captured while configuring a
    package material in Go. The configuration information should be
    returned as an instance of PackageConfiguration.

    ``` {.code}
        public PackageConfiguration getPackageConfiguration() {
            PackageConfiguration packageConfiguration = new PackageConfiguration();
            packageConfiguration.add(new Property("PACKAGE_DETAILS"));
            return packageConfiguration;
        }
                    
    ```

-   **isRepositoryConfigurationValid:** This is a callback from Go to
    validate the user configured repository configuration. If
    ValidationResult contains one or more errors, these would be
    reported by Go.

    ``` {.code}
        public ValidationResult isRepositoryConfigurationValid(RepositoryConfiguration repositoryConfiguration) {
            ValidationResult validationResult = new ValidationResult();
            Property url = repositoryConfiguration.get("REPO_URL");
            if ( the configuration is invalid) {
                validationResult.addError(new ValidationError(validation error message));
            }
            return validationResult;
        }
                    
    ```

-   **isPackageConfigurationValid:** This is a callback from Go to
    validate the user configured package configuration. If
    ValidationResult contains one or more errors, these would be
    reported by Go. Both package and repository configuration is
    provided to this method so that any validations which should be
    performed across these configurations can be performed here.

    ``` {.code}
        public ValidationResult isPackageConfigurationValid(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ValidationResult validationResult = new ValidationResult();
            if ( the configuration is invalid ) {
                validationResult.addError(new ValidationError(validation error message));
            }
            return validationResult;
        }
                    
    ```

### Repository Poller

Periodically, Go checks all the configured materials for new updates.
For a package material, it would invoke the corresponding repository
poller implemented by the plugin. Repository poller should implement
PackageMaterialPoller interface. Repository poller is responsible for
fetching latest available version of the package based on the package
and repository configuration. Repository poller is also invoked by Go to
check connection to package and repository. PackageMaterialPoller forces
plugin author to implement following methods.

-   **getLatestRevision:** This method is invoked when a new package
    material is introduced in Go. It should return the latest version of
    the package for given package and repository configuration. Package
    version details are returned as an instance of PackageRevision.
    [Package
    Revision](../resources/javadoc/com/thoughtworks/go/plugin/api/material/packagerepository/PackageRevision.html)
    has information like revision, timestamp of the package, user who is
    responsible for generating this package, comment and trackbackUrl
    (this url can point to CI system which generated this package).

    ``` {.code}
        public PackageRevision getLatestRevision(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            latestPackageDetails = fetchLatestPackageDetailsFor(packageConfiguration, repositoryConfiguration);
            return new PackageRevision(latestPackageDetails.revision, latestPackageDetails.timestamp, latestPackageDetails.user, latestPackageDetails.comment, latestPackageDetails.trackbackUrl);
        }
                    
    ```

-   **latestModificationSince:** On subsequent material updates, Go
    would invoke this method with the last known revision for the
    package. This method should return a version of the package which is
    later than the one known by Go.

    ``` {.code}
        public PackageRevision latestModificationSince(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration, PackageRevision previouslyKnownRevision) {
            latestPackageDetails = fetchLatestPackageDetailsFor(packageConfiguration, repositoryConfiguration);
            if (latestPackageDetails is later than previouslyKnownRevision)
                return new PackageRevision(latestPackageDetails.revision, latestPackageDetails.timestamp, latestPackageDetails.user, latestPackageDetails.comment, latestPackageDetails.trackbackUrl);
            else
                return null;
        }
                    
    ```

-   **checkConnectionToRepository:** This method is expected to check if
    connection can be established for given repository configuration.

    ``` {.code}
        public Result checkConnectionToRepository(RepositoryConfiguration repositoryConfiguration) {
            if (connectionCanBeEstablishedFor(repositoryConfiguration)) {
                return new Result().withSuccessMessages("Successfully accessed repository");
            } else {
                return new Result().withErrorMessages("Could not establish connection to repository");
            }
        }
                    
    ```

-   **checkConnectionToPackage:** This method is expected to check if
    connection can be established for given package and repository
    configuration.

    ``` {.code}
        public Result checkConnectionToRepository(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            if (connectionCanBeEstablishedFor(packageConfiguration, repositoryConfiguration)) {
                return new Result().withSuccessMessages(Successfully accessed package);
            } else {
                return new Result().withErrorMessages("Could not establish connection to package");
            }
        }
                    
    ```





© ThoughtWorks Studios, 2010

