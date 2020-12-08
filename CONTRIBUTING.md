# Deploying a new release

 - `npm test`
 - `npm version {patch|minor|major}`
 - `npm publish`
 - `git push --follow-tags`
 - `aws s3 cp --acl public-read mapbox-gl-supported.js s3://mapbox-gl-js/plugins/mapbox-gl-supported/v$(node --print --eval "require('./package.json').version")/mapbox-gl-supported.js`
