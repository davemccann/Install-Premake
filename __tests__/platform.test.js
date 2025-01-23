const path = require('path');
const { generatePremakeURL, getPlatformString, getPlatformArchiveExt } = require('../src/platform')

describe('generatePremakeURL', () => {
    test('return URL for win32 platforms', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });

        const basePath = 'https://github.com/premake/premake-core/releases/download';
        const platformPath = 'v5.0.0-beta4/premake-5.0.0-beta4-windows.zip';
        const expectedCombinedPath = path.join(basePath, platformPath);

        premakeURL = generatePremakeURL('5.0.0-beta4');
        expect(premakeURL).toBe(expectedCombinedPath);
    });

    test('return URL for darwin platforms', () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });

        const basePath = 'https://github.com/premake/premake-core/releases/download';
        const platformPath = 'v5.0.0-beta4/premake-5.0.0-beta4-macosx.tar.gz';
        const expectedCombinedPath = path.join(basePath, platformPath);

        premakeURL = generatePremakeURL('5.0.0-beta4');
        expect(premakeURL).toBe(expectedCombinedPath);
    });

    test('return URL for linux platforms', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });

        const basePath = 'https://github.com/premake/premake-core/releases/download';
        const platformPath = 'v5.0.0-beta4/premake-5.0.0-beta4-linux.tar.gz';
        const expectedCombinedPath = path.join(basePath, platformPath);

        premakeURL = generatePremakeURL('5.0.0-beta4');
        expect(premakeURL).toBe(expectedCombinedPath);
    });

    test('return URL for win32 platforms', () => {
        Object.defineProperty(process, 'platform', {
            value: 'invalid'
        });

        expect(() => generatePremakeURL('5.0.0-beta4')).toThrowError(/unsupported platform/);
    });
});

describe('getPlatformString', () => {
    test('return "windows" for win32 platforms', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32',
        });
        expect(getPlatformString()).toBe('windows');
    });

    test('return "macosx" for darwin platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin',
        });
        expect(getPlatformString()).toBe('macosx');
    });

    test('return "linux" for linux platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux',
        });
        expect(getPlatformString()).toBe('linux');
    });

    test('throw error for unsupported platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'invalid',
        });
        expect(() => getPlatformString()).toThrowError(/unsupported platform/);
    });
});

describe('getPlatformArchiveExt', () => {
    test('return "zip" for win32 platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32',
        });
        expect(getPlatformArchiveExt()).toBe('zip');
    });

    test('return "tar.gz" for darwin platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin',
        });
        expect(getPlatformArchiveExt()).toBe('tar.gz');
    });


    test('return "tar.gz" for linux platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux',
        });
        expect(getPlatformArchiveExt()).toBe('tar.gz');
    });

    test('throw error for unsupported platform', () => {
        Object.defineProperty(process, 'platform', {
            value: 'invalid',
        });
        expect(() => getPlatformArchiveExt()).toThrowError(/unsupported platform/);
    });
});
