
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

module.exports = { getPlatformString, getPlatformArchiveExt };
