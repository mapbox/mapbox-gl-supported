# Deploying a new release

Publishing to npm happens via [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) through the `.github/workflows/npm-release.yml` GitHub Actions workflow, triggered by pushing a `v*` tag.

**One-time setup** (already done for this repo, kept here for reference):

- GitHub repo settings → Environments → New environment → `npm-release`
- Selected branches and tags → Add rule → Ref type: Tag → `v*`
- On npmjs.com, configure this repo + workflow + `npm-release` environment as a Trusted Publisher for `@mapbox/mapbox-gl-supported`

**Releasing**:

- `npm version {patch|minor|major}`
- Push the version bump commit as a PR. Get it green, approved and merged.
- Once everything looks good, `git push --tags` to release. This triggers the `npm-release` workflow, which publishes to npm.
- Upload the built browser bundle to the CDN:
  - `npm run build`
  - `aws s3 cp --acl public-read mapbox-gl-supported.js s3://mapbox-gl-js/plugins/mapbox-gl-supported/v$(node --print --eval "require('./package.json').version")/mapbox-gl-supported.js`
