---
headless: true
---
{{< include file="search/search.html" markdown="false" >}}

<ul>
  <li class="level1">
    <a href="https://www.gocd.org/"><b>Go to GoCD.org</b></a>
  </li>
</ul>

<hr>

<ul>
  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>Welcome</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "/_index.md" >}}">Introduction</a></li>
      <li class="level2"><a href="{{< relref "introduction/concepts_in_go.md" >}}">Concepts in GoCD</a></li>
      <li class="level2"><a href="{{< relref "navigation/value_stream_map.md" >}}">Value Stream Map</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>Installation</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "installation/_index.md" >}}">Installing GoCD</a></li>
      <li class="level2"><a href="{{< relref "installation/system_requirements.md" >}}">System requirements</a></li>
      <li class="level2"><a href="{{< relref "installation/installing_go_server.md" >}}">Installing GoCD Server</a>
        <ul>
          <li class="level3"><a href="{{< relref "installation/install/server/linux.md" >}}">Linux</a></li>
          <li class="level3"><a href="{{< relref "installation/install/server/windows.md" >}}">Windows</a></li>
          <li class="level3"><a href="{{< relref "installation/install/server/osx.md" >}}">Mac OS X</a></li>
          <li class="level3"><a href="{{< relref "installation/install/server/zip.md" >}}">Generic Zip</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "installation/installing_go_agent.md" >}}">Installing GoCD Agent</a>
        <ul>
          <li class="level3"><a href="{{< relref "installation/install/agent/linux.md" >}}">Linux</a></li>
          <li class="level3"><a href="{{< relref "installation/install/agent/windows.md" >}}">Windows</a></li>
          <li class="level3"><a href="{{< relref "installation/install/agent/osx.md" >}}">Mac OS X</a></li>
          <li class="level3"><a href="{{< relref "installation/install/agent/zip.md" >}}">Generic Zip</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "installation/configuring_database.md" >}}">Configuring GoCD Database</a></li>
        <ul>
          <li class="level3"><a href="{{< relref "installation/configuring_database/h2.md" >}}">H2</a></li>
          <li class="level3"><a href="{{< relref "installation/configuring_database/postgres.md" >}}">PostgreSQL</a></li>
          <li class="level3"><a href="{{< relref "installation/configuring_database/mysql.md" >}}">MySQL</a></li>
          <li class="level3"><a href="{{< relref "installation/configuring_database/connection-properties.md" >}}">Database Connection Properties</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "installation/upgrading_go.md" >}}">Upgrading GoCD</a></li>
      <ul>
        <li class="level3"><a href="{{< relref "installation/upgrading_go/upgrade_to_gocd_20.5.0.md" >}}">Upgrading to GoCD 20.5.0 and higher</a></li>
      </ul>
      <li class="level2"><a href="{{< relref "installation/configuring_server_details.md" >}}">Configuring Server Details</a></li>
      <li class="level2"><a href="{{< relref "installation/configure-reverse-proxy.md" >}}">Configure a Reverse Proxy</a></li>
      <li class="level2"><a href="{{< relref "installation/configure-agent-proxy.md" >}}">Configure an agent with proxy</a></li>
      <li class="level2"><a href="{{< relref "installation/ssl_tls_config.md" >}}">Configuring SSL/TLS</a>
        <ul>
          <li class="level3"><a href="{{< relref "installation/ssl_tls/end_to_end_transport_security.md" >}}">End to end transport security</a></li>
          <li class="level3"><a href="{{< relref "installation/ssl_tls/configuring_hsts_header.md" >}}">Configuring HSTS Header</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "installation/performance_tuning.md" >}}">Performance Tuning</a></li>
      <li class="level2"><a href="{{< relref "installation/hardware_specifications.md" >}}">Hardware Specifications</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>Configuration</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "configuration/pipelines.md" >}}">Pipelines</a>
        <ul>
          <li class="level3"><a href="{{< relref "configuration/quick_pipeline_setup.md" >}}">Add a New Pipeline</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_add_material.md" >}}">Add Material to Existing Pipeline</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_add_stage.md" >}}">Add Stage to Existing Pipeline</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_add_job.md" >}}">Add Job to Existing Stage</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_add_task.md" >}}">Add Task to Existing Job</a></li>
          <li class="level3"><a href="{{< relref "configuration/pipeline_templates.md" >}}">Pipeline Templates</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_use_parameters_in_configuration.md" >}}">Using parameters in Pipelines and Templates</a></li>
          <li class="level3"><a href="{{< relref "configuration/pipeline_labeling.md" >}}">Pipeline Labeling</a></li>
          <li class="level3"><a href="{{< relref "configuration/pipeline_scheduling.md" >}}">Pipeline Scheduling</a></li>
          <li class="level3"><a href="{{< relref "configuration/dev_choose_when_stage_runs.md" >}}">Choose When a Stage Runs</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_timer.md" >}}">Timer Trigger</a></li>
          <li class="level3"><a href="{{< relref "configuration/admin_lock_pipelines.md" >}}">Lock a Pipeline</a></li>
          <li class="level3"><a href="{{< relref "configuration/job_timeout.md" >}}">Job Timeout</a></li>
          <li class="level3"><a href="{{< relref "configuration/deleting_pipelines.md" >}}">Deleting Pipelines</a></li>
          <li class="level3"><a href="{{< relref "configuration/managing_dependencies.md" >}}">Managing Dependencies</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "configuration/managing_a_build_cloud.md" >}}">Managing Agents</a>
        <ul>
          <li class="level3"><a href="{{< relref "configuration/elastic_agents.md" >}}">Elastic Agents</a></li>
          <li class="level3"><a href="{{< relref "configuration/clone_existing_agents.md" >}}">Clone/Copy Existing Agents</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "configuration/managing_environments.md" >}}">Managing Environments</a></li>
      <li class="level2"><a href="{{< relref "configuration/managing_users.md" >}}">Managing Users</a>
        <ul>
          <li class="level3"><a href="{{< relref "configuration/dev_authentication.md" >}}">Authentication</a></li>
          <li class="level3"><a href="{{< relref "configuration/access_tokens.md" >}}">Access Tokens</a></li>
          <li class="level3"><a href="{{< relref "configuration/dev_authorization.md" >}}">Authorizing Users</a></li>
          <li class="level3"><a href="{{< relref "configuration/delegating_group_administration.md" >}}">Delegating Group Administration</a></li>
          <li class="level3"><a href="{{< relref "configuration/pipeline_group_admin_config.md" >}}">Pipeline Group Administration</a></li>
          <li class="level3"><a href="{{< relref "configuration/policy_in_gocd.md" >}}">Policy in GoCD</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "configuration/secrets_management.md" >}}">Secrets Management</a>
      </li>
      <li class="level2">Artifacts
        <ul>
          <li class="level3"><a href="{{< relref "configuration/dev_upload_test_report.md" >}}">Publish Reports and Artifacts</a></li>
          <li class="level3"><a href="{{< relref "configuration/managing_artifacts_and_reports.md" >}}">Managing Artifacts and Reports</a></li>
          <li class="level3"><a href="{{< relref "configuration/delete_artifacts.md" >}}">Auto Delete Artifacts</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "configuration/admin_mailhost_info.md" >}}">Email server configuration</a></li>
      <li class="level2"><a href="{{< relref "configuration/dev_notifications.md" >}}">Notifications</a></li>
      <li class="level2"><a href="{{< relref "configuration/configuration_reference.md" >}}">Reference</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>Advanced Usage</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "advanced_usage/pipelines_as_code.md" >}}">Pipelines as code</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/agent_auto_register.md" >}}">Auto Register a Remote Agent</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/admin_spawn_multiple_jobs.md" >}}">Spawn multiple instances of a Job</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/admin_install_multiple_agents.md" >}}">Multiple Agents on One Machine</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/dev_clean_up_when_cancel.md" >}}">Clean on Task Cancel</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/dev_conditional_task_execution.md" >}}">Conditional Task Execution</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/trigger_with_options.md" >}}">Trigger With Options</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/fan_in.md" >}}">Fan In</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/logging.md" >}}">Logging</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/ui_testing.md" >}}">UI Testing</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/compare_pipelines.md" >}}">Compare Builds</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/stage_duration_chart.md" >}}">Graphs</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/one_click_backup.md" >}}">Backup GoCD Server</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/cron_backup.md" >}}">Timer Based GoCD Server Backup</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/config_repo.md" >}}">Config Repository</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/other_config_options.md" >}}">Other Config Options</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/agent-health-check-api.md" >}}">Agent Health Check API</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/maintenance_mode.md" >}}">Maintenance Mode</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/pipeline_activity.md" >}}">Pipeline activity</a></li>
      <li class="level2"><a href="{{< relref "advanced_usage/business_continuity.md" >}}">GoCD Business Continuity</a>
        <ul>
          <li class="level3"><a href="{{< relref "advanced_usage/business_continuity/introduction.html" >}}">Introduction</a></li>
          <li class="level3"><a href="{{< relref "advanced_usage/business_continuity/initial_setup.md" >}}">Initial Setup</a></li>
          <li class="level3"><a href="{{< relref "advanced_usage/business_continuity/configuration.md" >}}">Configure Agents and Shared Drive</a></li>
          <li class="level3"><a href="{{< relref "advanced_usage/business_continuity/monitor_switch_to_sec.md" >}}">Monitoring and Recovery</a></li>
          <li class="level3"><a href="{{< relref "advanced_usage/business_continuity/upgrade.md" >}}">Server Upgrades</a></li>
        </ul>
      </li>
      <li class="level2"><a href="{{< relref "integration/_index.md" >}}">Integrating GoCD With Other Tools</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>GoCD on Kubernetes</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/introduction.md" >}}">Introduction</a></li>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/setup_and_configuration.md" >}}">Setup and configuration</a></li>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/helm_install.md" >}}">Install the GoCD Helm chart</a></li>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/importing_a_sample_workflow.md" >}}">Importing a sample workflow</a></li>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/sample_pipelines_explained.md" >}}">An explanation of the sample pipelines</a></li>
      <li class="level2"><a href="{{< relref "gocd_on_kubernetes/docker_workflows.md" >}}">Docker workflows</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>Plugins in GoCD</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "extension_points/_index.md" >}}">Available extension points</a></li>
      <li class="level2"><a href="{{< relref "extension_points/plugin_user_guide.md" >}}">Plugin User Guide</a></li>
      <li class="level2"><a href="{{< relref "extension_points/package_repository_extension.md" >}}">Package Repository Extension</a></li>
      <li class="level2"><a href="{{< relref "extension_points/yum_repository_poller.md" >}}">Yum Repository Poller</a></li>
      <li class="level2"><a href="{{< relref "extension_points/scm_extension.md" >}}">SCM Extension</a></li>
      <li class="level2"><a href="{{< relref "extension_points/task_extension.md" >}}">Task Extension</a></li>
    </ul>
  </li>

  <li class="level1 has-children">
    {{< figure src="/images/arrow.png" class="menu-arrow" >}}
    <a href="#"><b>FAQ/Troubleshooting</b></a>
    <ul>
      <li class="level2"><a href="{{< relref "faq/fixing_common_issues.md" >}}">Fixing common issues</a></li>
      <li class="level2"><a href="{{< relref "faq/artifact_integrity.md" >}}">Artifact integrity verification</a></li>
      <li class="level2"><a href="{{< relref "faq/rm_what_is_deployed.md" >}}">Check What's Deployed</a></li>
      <li class="level2"><a href="{{< relref "faq/concurrent_config_modifications.md" >}}">Concurrent Modifications to Config</a></li>
      <li class="level2"><a href="{{< relref "faq/docker_container_ssh_keys.md" >}}">Configure SSH Keys for dockerized GoCD</a></li>
      <li class="level2"><a href="{{< relref "faq/deploy_a_specific_build_to_an_environment.md" >}}">Deploy a Specific Build</a></li>
      <li class="level2"><a href="{{< relref "faq/rm_deploy_to_environment.md" >}}">Deploy to an environment</a></li>
      <li class="level2"><a href="{{< relref "faq/material_update_hung.md" >}}">GoCD unable to poll for changes</a></li>
      <li class="level2"><a href="{{< relref "faq/stage_old_config.md" >}}">Historical Configuration</a></li>
      <li class="level2"><a href="{{< relref "faq/job_rerun.md" >}}">How do I re-run jobs?</a></li>
      <li class="level2"><a href="{{< relref "faq/ordering_of_pipelines.md" >}}">Ordering of Pipelines</a></li>
      <li class="level2"><a href="{{< relref "faq/dependency_management.md" >}}">Run Tests against new Builds</a></li>
      <li class="level2"><a href="{{< relref "faq/admin_out_of_disk_space.md" >}}">Running out of Disk Space</a></li>
      <li class="level2"><a href="{{< relref "faq/dev_see_artifact_as_tab.md" >}}">See artifacts as sub-tabs</a></li>
      <li class="level2"><a href="{{< relref "faq/tester_what_has_changed.md" >}}">See changes in new binary</a></li>
      <li class="level2"><a href="{{< relref "faq/dev_use_current_revision_in_build.md" >}}">Using Environment variables</a></li>
      <li class="level2"><a href="{{< relref "faq/dev_understand_why_build_broken.md" >}}">Why the Build is Broken?</a></li>
    </ul>
  </li>
</ul>
