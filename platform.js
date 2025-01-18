
export function getPlatformString() {
    if (process.platform === 'win32') {
        return 'windows';
    }
    else if (process.platform === 'darwin') {
        return 'macosx';
    }
    else if (process.platform === 'linux') {
        return 'linux';
    }
    else {
        console.Error('unsupported platform');
    }
    return ''
}

export function getPlatformArchiveExt() {
    if (process.platform === 'win32') {
        return 'zip';
    }
    else if (process.platform === 'darwin' || process.platform === 'linux') {
        return 'tar.gz';
    }
    else {
        console.Error('unsupported platform');
    }
    return ''
}
