const path = require('path');

function generatePremakeURL(premakeVersion) {
    try {
        platform = getPlatformString();
        archiveExt = getPlatformArchiveExt();

        const baseURL = `https://github.com/premake/premake-core/releases/download`;
        const versionTag = `v${premakeVersion}`;
        const filename = `premake-${premakeVersion}-${platform}.${archiveExt}`;

        return path.join(baseURL, versionTag, filename);
    } catch (err) {
        throw err;
    }
}

function getPlatformString() {
    switch (process.platform) {
        case 'win32':
            return 'windows'
        case 'darwin':
            return 'macosx';
        case 'linux':
            return 'linux';
    }

    throw Error(`unsupported platform: ${process.platform}`);
}

function getPlatformArchiveExt() {
    switch (process.platform) {
        case 'win32':
            return 'zip';
        case 'darwin':
        case 'linux':
            return 'tar.gz';
    }

    throw Error('unsupported platform: ${process.platform}');
}

module.exports = { generatePremakeURL, getPlatformString, getPlatformArchiveExt };
