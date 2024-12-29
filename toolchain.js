const tc = require('@actions/tool-cache')
const { execFile } = require('child_process')

async function extractArchive(zipPath, outputDir) {	
	if (process.platform === 'win32') {
		return await tc.extractZip(zipPath, outputDir);
	}
	else if (process.platform === 'darwin') {
		return await tc.extractXar(zipPath, outputDir);
	}
	else if (process.platform === 'linux') {
		return await tc.extractTar(zipPath, outputDir);
	}
	else {
		console.Error('unsupported platform');
	}
	return ''
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
