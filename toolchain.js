const tc = require('@actions/tool-cache');
const path = require('node:path');
const { execFile } = require('child_process');

const archiveExtractorMappings = {
	'.zip': tc.extractZip,
	'.7z': tc.extract7z,
	'.pkg': tc.extractXar,
	'.tar': tc.extractTar,
	'.gz': tc.extractTar,
	'.tgz': tc.extractTar,
};

async function extractArchive(filepath, outputPath) {
	const extension = path.extname(filepath);
	
	const extractor = archiveExtractorMappings[extension];
	if (!extractor) {
		throw new Error(`failed to extract archive, unsupported file format: ${extension}`);
	}

	return await extractor(filepath, outputPath);
}

async function execApp(filePath, args) {
	await execFile(filePath, args, (error, stdout, stderr) => {
		if (error) {
			console.error(stderr);
		}
		console.log(stdout);
	});
}


module.exports = { extractArchive, execApp };
