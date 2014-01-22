# Go Design Documentation

#### 1. Introduction

#### 2. Concepts in Go

* [2.1 Domain (<font color='red'>NOT DONE</font>)](2/2.1.md)

    * [2.1.1 Pipeline (<font color='red'>NOT DONE</font>)](2/2.1.1.md)

    * [2.1.2 Stage (<font color='red'>NOT DONE</font>)](2/2.1.2.md)

    * [2.1.3 Job (<font color='red'>NOT DONE</font>)](2/2.1.3.md)

    * [2.1.4 Task (<font color='red'>NOT DONE</font>)](2/2.1.4.md)

    * [2.1.4 Material (<font color='red'>NOT DONE</font>)](2/2.1.4.md)

* [2.2 Implementation (<font color='red'>NOT DONE</font>)](2/2.2.md)

#### 3. Getting Started

* [3.1 Setting up your development Environment (<b><font color='green'>IN PROGRESS</font></b>)](3/3.1.md)

#### 4. Technology Stack

* [4.1 Plugins Architecture - OSGi (<font color='red'>NOT DONE</font>)](4/4.1.md)

* [4.2 Object Relation Mapping (ORM) - Hibernate & IBatis (<b><font color='green'>IN PROGRESS</font></b>)](4/4.2.md)

* [4.3 Caching - EhCache (<font color='red'>NOT DONE</font>)](4/4.3.md)

* [4.4 Dependency Injection (DI) - Spring (<font color='red'>NOT DONE</font>)](4/4.4.md)

* [4.5 Model View Controller (MVC) (<font color='red'>NOT DONE</font>)](4/4.5.md)

    * [4.5.1 Models - Java (<font color='red'>NOT DONE</font>)](4/4.5.1.md)

    * [4.5.2 Controllers - Servlets & Rails (<font color='red'>NOT DONE</font>)](4/4.5.2.md)

    * [4.5.3 Views - Rails & Velocity (<font color='red'>NOT DONE</font>)](4/4.5.3.md)

* [4.6 User Interface (UI) - jQuery & Prototype, SCSS, HTML (<b><font color='green'>IN PROGRESS</font></b>)](4/4.6.md)

* [4.7 Build Tool - Buildr (<font color='red'>NOT DONE</font>)](4/4.7.md)

#### 5. Architecture of Go

* [5.1 Overview (<font color='red'>NOT DONE</font>)](5/5.1.md)

* [5.2 Go Server (<font color='red'>NOT DONE</font>)](5/5.2.md)

    * [5.2.1 Configuration Management (<font color='red'>NOT DONE</font>)](5/5.2.1.md)

        * [5.2.1.1 XSD & XML (<font color='red'>NOT DONE</font>)](5/5.2.1.1.md)

        * [5.2.1.2 SchemaMigration (<font color='red'>NOT DONE</font>)](5/5.2.1.2.md)

        * [5.2.1.3 ConfigRepository (<font color='red'>NOT DONE</font>)](5/5.2.1.3.md)

        * [5.2.1.4 ConfigMerge (<font color='red'>NOT DONE</font>)](5/5.2.1.4.md)

        * [5.2.1.5 ConfigDiff (<font color='red'>NOT DONE</font>)](5/5.2.1.5.md)

    * [5.2.2 Database Management (<b><font color='green'>IN PROGRESS</font></b>)](5/5.2.2.md)

        * [5.2.2.1 Schema (<font color='red'>NOT DONE</font>)](5/5.2.2.1.md)

        * [5.2.2.2 Migration - DBDeploy (<font color='red'>NOT DONE</font>)](5/5.2.2.2.md)

        * [5.2.2.3 Backup (<font color='red'>NOT DONE</font>)](5/5.2.2.3.md)

    * [5.2.3 Material Polling (<font color='red'>NOT DONE</font>)](5/5.2.3.md)

        * [5.2.3.1 Material Fingerprint & Flyweights (<font color='red'>NOT DONE</font>)](5/5.2.3.1.md)

        * [5.2.3.2 Supported Materials (<font color='red'>NOT DONE</font>)](5/5.2.3.2.md)

    * [5.2.4 Build Cause Production (<font color='red'>NOT DONE</font>)](5/5.2.4.md)

    * [5.2.5 Pipeline Scheduling (<font color='red'>NOT DONE</font>)](5/5.2.5.md)

    * [5.2.6 Work Assignment (<font color='red'>NOT DONE</font>)](5/5.2.6.md)

        * [5.2.6.1 Resource & Environment Mapping (<font color='red'>NOT DONE</font>)](5/5.2.6.1.md)

    * [5.2.7 Artifact Management (<font color='red'>NOT DONE</font>)](5/5.2.7.md)

    * [5.2.8 User Management (<font color='red'>NOT DONE</font>)](5/5.2.8.md)

        * [5.2.8.1 Authentication Management (<font color='red'>NOT DONE</font>)](5/5.2.8.1.md)

        * [5.2.8.2 Enable, disable & delete users (<font color='red'>NOT DONE</font>)](5/5.2.8.2.md)

        * [5.2.8.3 User Role Management (<font color='red'>NOT DONE</font>)](5/5.2.8.3.md)

    * [5.2.9 Agent Management (<font color='red'>NOT DONE</font>)](5/5.2.9.md)

    * [5.2.10 UI Architecture (<b><font color='green'>IN PROGRESS</font></b>)](5/5.2.10.md)

    * [5.2.11 APIs, CCTray & Feeds (<font color='red'>NOT DONE</font>)](5/5.2.11.md)

* [5.3 Go Agent (<font color='red'>NOT DONE</font>)](5/5.3.md)

    * [5.3.1 Bootstrapper (<font color='red'>NOT DONE</font>)](5/5.3.1.md)

    * [5.3.2 Launcher (<font color='red'>NOT DONE</font>)](5/5.3.2.md)

    * [5.3.3 Agent (<font color='red'>NOT DONE</font>)](5/5.3.3.md)

* [5.4 Common (<font color='red'>NOT DONE</font>)](5/5.4.md)

    * [5.4.1 Plugin Architecture (<font color='red'>NOT DONE</font>)](5/5.4.1.md)

    * [5.4.2 Agent - Server Communication (<font color='red'>NOT DONE</font>)](5/5.4.2.md)

* [5.5 Build Infrastructure (<b><font color='green'>IN PROGRESS</font></b>)](5/5.5.md)

    * [5.5.1 Packaging (<font color='red'>NOT DONE</font>)](5/5.5.1.md)

    * [5.5.2 Documentation Creation (<font color='red'>NOT DONE</font>)](5/5.5.2.md)

    * [5.5.3 Installer Creation (<font color='red'>NOT DONE</font>)](5/5.5.3.md)

        * [5.5.3.1 zip (<font color='red'>NOT DONE</font>)](5/5.5.3.1.md)

        * [5.5.3.2 rpm (<font color='red'>NOT DONE</font>)](5/5.5.3.2.md)

        * [5.5.3.3 deb (<font color='red'>NOT DONE</font>)](5/5.5.3.3.md)

        * [5.5.3.4 exe (<font color='red'>NOT DONE</font>)](5/5.5.3.4.md)

        * [5.5.3.5 mac (<font color='red'>NOT DONE</font>)](5/5.5.3.5.md)

        * [5.5.3.6 sol (<font color='red'>NOT DONE</font>)](5/5.5.3.6.md)

#### 6. Features

* [6.1 Dashboard (<font color='red'>NOT DONE</font>)](6/6.1.md)

    * [6.1.1 Overview (<font color='red'>NOT DONE</font>)](6/6.1.1.md)

    * [6.1.2 All Active Pipelines (<font color='red'>NOT DONE</font>)](6/6.1.2.md)

* [6.2 Fan-in (<font color='red'>NOT DONE</font>)](6/6.2.md)

    * [6.2.1 Overview (<font color='red'>NOT DONE</font>)](6/6.2.1.md)

    * [6.2.2 Pipeline Timeline (<font color='red'>NOT DONE</font>)](6/6.2.2.md)

    * [6.2.3 Corner Cases (<font color='red'>NOT DONE</font>)](6/6.2.3.md)

* [6.3 Value Stream Map (<font color='red'>NOT DONE</font>)](6/6.3.md)

    * [6.3.1 Overview (<font color='red'>NOT DONE</font>)](6/6.3.1.md)

    * [6.3.2 Layer Assignment  (<font color='red'>NOT DONE</font>)](6/6.3.2.md)

    * [6.3.3 Dummy Node Creation    (<font color='red'>NOT DONE</font>)](6/6.3.3.md)

    * [6.3.4 Edge Cross Minimisation    (<font color='red'>NOT DONE</font>)](6/6.3.4.md)

    * [6.3.5 Optimisation (<font color='red'>NOT DONE</font>)](6/6.3.5.md)

* [6.4 Compare Pipeline (<b><font color='green'>IN PROGRESS</font></b>)](6/6.4.md)

    * [6.4.1 Overview (<font color='red'>NOT DONE</font>)](6/6.4.1.md)

    * [6.4.2 Corner Cases (<font color='red'>NOT DONE</font>)](6/6.4.2.md)

* [6.5 PackageRepository (<font color='red'>NOT DONE</font>)](6/6.5.md)

    * [6.5.1 Overview (<font color='red'>NOT DONE</font>)](6/6.5.1.md)

    * [6.5.2 Plugins (<font color='red'>NOT DONE</font>)](6/6.5.2.md)

* [6.6 Command Repository (<font color='red'>NOT DONE</font>)](6/6.6.md)

* [6.7 Environments (<font color='red'>NOT DONE</font>)](6/6.7.md)

* [6.8 Templates (<font color='red'>NOT DONE</font>)](6/6.8.md)

* [6.9 Shine (<font color='red'>NOT DONE</font>)](6/6.9.md)

    * [6.9.1 Test Artifact Parser (<font color='red'>NOT DONE</font>)](6/6.9.1.md)

    * [6.9.2 Reporting (<font color='red'>NOT DONE</font>)](6/6.9.2.md)

    * [6.9.3 Stage Graph (<font color='red'>NOT DONE</font>)](6/6.9.3.md)

* [6.10 OAuth Gadgets (<font color='red'>NOT DONE</font>)](6/6.10.md)

* [6.11 Backup (<font color='red'>NOT DONE</font>)](6/6.11.md)

#### 7. CD in practice

* [7.1 Build Go Using Go (<font color='red'>NOT DONE</font>)](7/7.1.md)

* [7.2 Test Infrastructure (<font color='red'>NOT DONE</font>)](7/7.2.md)

    * [7.2.1 Unit & Integration Tests (<font color='red'>NOT DONE</font>)](7/7.2.1.md)

    * [7.2.2 jsunit tests (<font color='red'>NOT DONE</font>)](7/7.2.2.md)

    * [7.2.3 Acceptance Tests (<font color='red'>NOT DONE</font>)](7/7.2.3.md)

    * [7.2.4 Test Parallelization (<font color='red'>NOT DONE</font>)](7/7.2.4.md)

* [7.3 Continuous Deployment (<font color='red'>NOT DONE</font>)](7/7.3.md)

#### 8. Conclusion

