const RunnerConfig = {
	version: '',
	action: '',
	options: [],
	installPath: '',
	premakeFilepath: '',

	create: (version, action, options, installPath, premakeFilepath) => {
		const newCfg = Object.create(RunnerConfig);
		newCfg.version = version;
		newCfg.action = action;
		newCfg.options = options;
		newCfg.installPath = installPath;
		newCfg.premakeFilepath = premakeFilepath;
		return newCfg;
	},

	printRunnerConfig() {
		outputStr = `
Configuration:
- version:         ${this.version}
- action:          ${this.action}
- installPath:     ${this.installPath}
- premakeFilepath: ${this.premakeFilepath}
- options:         ${this.options}

`;
		console.log(outputStr);
	}
};



module.exports = RunnerConfig;
