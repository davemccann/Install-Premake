const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const toolchain = require('./toolchain');
const { generatePremakeURL, getPlatformArchiveExt } = require('./platform');

async function main() {
    try {
        cfg = {
            version: core.getInput('version', { required: true }),
            toolname: 'premake',
        };

        // Search the cache for the version and use that if exists
        cachedPath = tc.find(cfg.toolname, cfg.version);
        if (cachedPath) {
            core.addPath(cachedPath);
            process.exit(0);
        }

        const premakeTempPath = path.join(process.env.RUNNER_TEMP, cfg.toolname);

        // Attempt to download binary with the version specified 
        const premakeURL = generatePremakeURL(cfg.version);
        const downloadPath = path.join(premakeTempPath, uuidv4());
        const premakePath = await tc.downloadTool(premakeURL, downloadPath);

        // Extract the executable from the archive to temp storage
        const archiveExt = getPlatformArchiveExt();
        const extractFolder = await toolchain.extractArchive(premakePath, premakeTempPath, archiveExt);

        // Cache the executable by version for next run
        const targetFilename = process.platform === 'win32' ? 'premake5.exe' : 'premake5';
        cachedPath = await tc.cacheFile(
            path.join(extractFolder, targetFilename),
            targetFilename,
            cfg.toolname,
            cfg.version
        );
        core.addPath(cachedPath);

    } catch (error) {
        console.error(`action failed: ${error.message}`);
        process.exit(1);
    }
}

main();

