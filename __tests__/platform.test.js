//import { getPlatformString } from '../platform.js';
const { getPlatformString, getPlatformArchiveExt } = require('../platform.js')

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
