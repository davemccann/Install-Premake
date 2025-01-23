[![CI](https://github.com/davemccann/Install-Premake/actions/workflows/ci.yml/badge.svg)](https://github.com/davemccann/Install-Premake/actions/workflows/ci.yml)

# PremakeCI

This action performs the installation of [Premake](https://github.com/premake/premake-core/) on the host-runner. The artifact is downloaded to the runners temp directory and extracted to the tool-cache directory ready for use. For self-hosted runners, the script will attempt to find a cached version before attempting to download. The tool install location will be added to the PATH.

## Usage

```yaml
steps:
  - name: Install Premake
    uses: davemccann/Install-Premake@v1.0.0
    with:
      version: '5.0.0-beta4'

  - name: Check Premake
    run: premake5 --version
```
## Configuration

### Options

- `version`: Premake version to use, must be a version from the tagged release [page](https://github.com/premake/premake-core/tags) `default: 5.0.0-beta4`

### Environment Variables

- `RUNNER_TEMP`: The temporary download location for the newly downloaded artifact.
- `RUNNER_TOOL_CACHE`: The final install directory for the extracted tool.

## Troubleshooting

### Windows

> Expand-Archive :  is not a supported archive file format. .zip is the only supported archive file format.

Windows platforms make use of PowerShell for extracting archives, this error can occur if the version of PowerShell is too low. If this occurs, try updating to the latest version.


