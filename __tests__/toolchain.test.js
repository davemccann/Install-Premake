const tc = require('@actions/tool-cache');
const { execFile } = require('child_process');
const { extractArchive, execApp } = require('../toolchain.js');

jest.mock('@actions/tool-cache', () => ({
    extractZip: jest.fn(),
    extract7z: jest.fn(),
    extractXar: jest.fn(),
    extractTar: jest.fn(),
}));

describe('extractArchive', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const archiveTypes = [
        { type: 'zip', mockResolvedValue: tc.extractZip.mockResolvedValue, expectedCall: tc.extractZip },
        { type: '7z', mockResolvedValue: tc.extract7z.mockResolvedValue, expectedCall: tc.extract7z },
        { type: 'pkg', mockResolvedValue: tc.extractXar.mockResolvedValue, expectedCall: tc.extractXar },
        { type: 'tar', mockResolvedValue: tc.extractTar.mockResolvedValue, expectedCall: tc.extractTar },
        { type: 'gz', mockResolvedValue: tc.extractTar.mockResolvedValue, expectedCall: tc.extractTar },
        { type: 'tgz', mockResolvedValue: tc.extractTar.mockResolvedValue, expectedCall: tc.extractTar },
    ];

    test.each(archiveTypes)('extractArchive ($type)', async ({ type, mockResolvedValue, expectedCall }) => {
        const archivePath = 'path/to/archive' + `.${type}`;
        const outputDir = 'output/directory';

        mockResolvedValue('extracted-path');

        const result = await extractArchive(archivePath, outputDir, type);

        expect(expectedCall).toHaveBeenCalledWith(archivePath, outputDir);
        expect(result).toBe('extracted-path');
    });

    test('extractArchive Invalid type', async () => {
        const archivePath = 'path/to/archive.png';
        const outputDir = 'output/directory';

        await expect(extractArchive(archivePath, outputDir, 'png'))
            .rejects
            .toThrowError(/unsupported file format/);
    });
});

jest.mock('child_process', () => ({
    execFile: jest.fn(),
}));

describe('execApp', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('execApp - Success', () => {
        const mockStdout = 'Success!';
        const mockStderr = '';
        execFile.mockImplementation((_filepath, _args, callback) => {
            callback(null, mockStdout, mockStderr);
        });

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrSpy = jest.spyOn(console, 'error').mockImplementation();

        execApp('test-file', ['arg']);

        expect(consoleLogSpy).toHaveBeenCalledWith(mockStdout);
        expect(consoleErrSpy).not.toHaveBeenCalled();

        consoleLogSpy.mockRestore();
        consoleErrSpy.mockRestore();
    });

    test('execApp - Failure', () => {
        const mockErr = Error('Command failed');
        const mockStdout = '';
        const mockStderr = 'Error occurred!';
        execFile.mockImplementation((_filepath, _args, callback) => {
            callback(mockErr, mockStdout, mockStderr);
        });

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrSpy = jest.spyOn(console, 'error').mockImplementation();

        expect(() => execApp('test-file', ['arg1', 'arg2']))
            .toThrowError(/failed to exec/);

        expect(consoleErrSpy).toHaveBeenCalledWith(mockStderr);
        expect(consoleLogSpy).not.toHaveBeenCalled();

        consoleLogSpy.mockRestore();
        consoleErrSpy.mockRestore();
    });
});
