const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const toolchain = require('./toolchain');
const path = require('path');
const RunnerConfig = require('./runner-config');
const { getPlatformString, getPlatformArchiveExt } = require('./platform');

async function main() {
    try {
        cfg = RunnerConfig.create(
            core.getInput('version', { required: true }),
            core.getInput('action', { required: true }),
            core.getInput('options', { required: false }),
            core.getInput('installPath', { required: false }),
            core.getInput('premakeFilepath', { required: false })
        );
        cfg.printRunnerConfig();

        const platform = getPlatformString();
        const archiveExt = getPlatformArchiveExt();

        const baseURL = `https://github.com/premake/premake-core/releases/download`;
        const premakeURL = path.join(baseURL, `v${cfg.version}/premake-${cfg.version}-${platform}.${archiveExt}`);

        // Add this path to the environment for this run
        core.addPath(cfg.installPath);

        // Attempt to download binary with the version specified
        console.log("test");
        const premakePath = await tc.downloadTool(premakeURL);
        console.log(`premake path: ${premakePath}`);

        // Extract the executable from the archive
        const extractFolder = await toolchain.extractArchive(premakePath, cfg.installPath, archiveExt);

        // Execute premake and pass in the specified arguments
        var args = [cfg.action];
        if (cfg.premakeFilepath !== '') {
            args.push(`--file=${cfg.premakeFilepath}`);
        }
        if (cfg.options !== '') {
            args.push(cfg.options);
        }

        console.log(`run ${extractFolder}/premake5 ${args}`);
        toolchain.execApp(`${extractFolder}/premake5`, args);

    } catch (error) {
        console.error(`action failed: ${error.message}`);
        process.exit(1);
    }
}

main();

