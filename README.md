# PremakeCI

This action performs the setup and calling of [Premake](https://github.com/premake/premake-core/) on the host-runner. It downloads and installs Premake based on the configured version and sets up the environment prior to executing a premake configuration file.

## Usage

```yaml
- uses: davemccann/PremakeCI@v0.3.1
  with:
    version: '5.0.0-beta3'
    action: vs2022
    options: --gfxapi=opengl
    installPath: './myInstallDirectory'
    premakeFilepath: './test'
```
## Configuration

### Options

- `version`: **Required** Premake version to use, must be a version from the tagged release [page](https://github.com/premake/premake-core/tags)
- `action`: **Required** Premake action to use, either custom or one of the out of the box solution - See [Using Premake](https://premake.github.io/docs/Using-Premake)
- `options`: *Optional* Any optional arguments to be used for modifying behavior of the action - See [Command Line Arguments](https://premake.github.io/docs/Command-Line-Arguments)
- `installPath`: *Optional* The destination path to install premake (default `'.'`)
- `premakeFilepath`: *Optional* The filepath to the premake configuration file for the project, otherwise will use the `premake5.lua` located in ${{ github.workspace }}

## Troubleshooting

### Windows

> Expand-Archive :  is not a supported archive file format. .zip is the only supported archive file format.

Windows platforms make use of PowerShell for extracting archives, this error can occur if the version of PowerShell is too low. If this occurs, try updating to the latest version.


