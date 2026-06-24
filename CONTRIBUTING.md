# Deploying a new release

 - `npm test`
 - `npm version {patch|minor|major}`
 - `npm publish`
 - `git push --follow-tags`
 - `aws s3 cp --acl public-read mapbox-gl-supported.js s3://mapbox-gl-js/plugins/mapbox-gl-supported/v$(node --print --eval "require('./package.json').version")/mapbox-gl-supported.js`

## Releasing a new version

Releases are published to npm via GitHub Actions.

### Steps

1. **Bump the version** in `package.json` (follow [semver](https://semver.org))
2. **Update `CHANGELOG.md`** with a summary of what changed
3. **Open a PR**, get it reviewed and merged to `gh-pages`
4. **Trigger the release** from the [Actions tab](../../actions/workflows/npm-release.yml):
   - Select **NPM release** → **Run workflow** → run from `gh-pages`

The workflow will publish to npm and create a GitHub release with auto-generated notes.

> **Note:** Only Mapbox maintainers with write access to this repository can trigger the release workflow. External contributors can open and contribute to PRs, but releases are always cut by the owning team.
