const tc = require('@actions/tool-cache');
const { execFile } = require('child_process');

const archiveExtractorMappings = {
    'zip': tc.extractZip,
    '7z': tc.extract7z,
    'pkg': tc.extractXar,
    'tar': tc.extractTar,
    'tar.gz': tc.extractTar,
    'gz': tc.extractTar,
    'tgz': tc.extractTar,
};

async function extractArchive(filepath, outputPath, archiveType) {
    const extractor = archiveExtractorMappings[archiveType];
    if (!extractor) {
        throw new Error(`failed to extract archive, unsupported file format: ${archiveType}`);
    }

    return await extractor(filepath, outputPath);
}

function execApp(filePath, args) {
    execFile(filePath, args, (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
            throw Error(`failed to exec file - path: ${filePath} args: ${args}`);
        }
        console.log(stdout);
    });
}


module.exports = { extractArchive, execApp };
