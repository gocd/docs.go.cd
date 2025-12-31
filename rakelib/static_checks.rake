# coding: utf-8
require 'nokogiri'
require 'html-proofer'
require 'htmlentities'

namespace :static_checks do
  def should_not_run_external_url_checks?
    if ENV['CI'] || ENV['SNAP_CI']
      false
    else
      ENV['RUN_EXTERNAL_CHECKS'].nil? || ENV['RUN_EXTERNAL_CHECKS'] == 'false'
    end
  end

  options = {
      :disable_external     => should_not_run_external_url_checks?,
      :ignore_urls          => [/(https?:\/\/localhost|([a-z0-9:\/-]*:8153)|([a-zA-z@:\/_]*.git)|docs\.gocd\.org|stackexchange\.com|pkgs\.org|www\.recitalsoftware)/],
      :allow_hash_href      => true,
      :allow_missing_href   => true,
      :check_external_hash  => false,
      :href_ignore          => ['/https:\/\/www\.youtube\.com\/.*/'],
      :validation           => {
          :report_invalid_tags  => false,
          :report_script_embeds => false,
          :report_missing_names => false ,
      },
      :typhoeus => {
          :followlocation => true,
          :connecttimeout => 500,
      },
      :ignore_missing_alt   => true,
      :log_level            => :info
  }

  task :html_proofer do
    STDERR.puts "WARNING: Not checking outbound links. Set environment variable: " +
                    "RUN_EXTERNAL_CHECKS to 'true' to run them" if should_not_run_external_url_checks?

    puts "\nRunning link checks, html format and verifying that it can be hosted in a subdirectory (relative links):"
    Dir.mktmpdir do |tmpdir|
      cp_r 'public/', File.join(tmpdir, 'subdir')

      cd tmpdir do
        HTMLProofer.check_directory('.', options).run
      end
    end
  end

  task :all => [:html_proofer]
end
