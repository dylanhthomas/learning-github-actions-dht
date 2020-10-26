const core = require('@actions/core');
const github = require('@actions/github');
const globby = require("globby");
const replace = require('replace');

async function run() {
  try {
        const files = {};
        const glob = `${GITHUB_WORKSPACE}/**/*.{html,md}`;
        const paths = await globby(glob);


        // --------- Add archival link in html format to markdown file----
        var today = (new Date()).toISOString().slice(0, 10).replace(/[^0-9]/g, ""); // date string for today in YYYYMMDD format to pass to approximate archive link of target on day of processing

        replace({
            // find all links that have not already been processed and appended with <a class="archival">
            regex: /(\[(.+)\]\(([^\s]+)(?: "(.+)")?\))(?!\s-\s\<a\sclass=\"archival\")/gm,
            replacement: '$1 - <a class="archival" aria-label="Internet Archive copy of previous link" href="http://web.archive.org/web/' + today + '/$3">(archive)</a>',
            paths: paths,
            recursive: false,
            silent: false,
        });

    } catch (error) {
        core.setFailed(error.message)
    }
}

run()