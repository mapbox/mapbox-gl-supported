import buble from '@rollup/plugin-buble';
import terser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    output: {
        file: 'mapbox-gl-supported.js',
        format: 'umd',
        name: 'mapboxgl'
    },
    plugins: [buble(), terser({ecma: 5})]
};
