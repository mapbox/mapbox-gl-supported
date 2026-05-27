/**
 * Test whether the current browser supports Mapbox GL JS.
 * @param {boolean} [failIfMajorPerformanceCaveat=false] Return `false`
 *   if the performance of Mapbox GL JS would be dramatically worse than
 *   expected (i.e. a software renderer would be used).
 * @returns {boolean}
 */
export function isSupported(failIfMajorPerformanceCaveat) {
    return !notSupportedReason(failIfMajorPerformanceCaveat);
}

/**
 * Return the reason the current browser does not support Mapbox GL JS,
 * or an empty string if it is supported.
 * @param {boolean} [failIfMajorPerformanceCaveat=false]
 * @returns {string}
 */
export function notSupportedReason(failIfMajorPerformanceCaveat) {
    if (!isBrowser()) return 'not a browser';
    if (!Object.hasOwn) return 'Object.hasOwn not supported';
    if (!isCanvasGetImageDataSupported()) return 'insufficient Canvas/getImageData support';
    if (!isWebGL2Supported(failIfMajorPerformanceCaveat)) return 'insufficient WebGL2 support';
    return '';
}

/** @type {WebGLContextAttributes} */
export const webGLContextAttributes = {
    antialias: false,
    alpha: true,
    stencil: true,
    depth: true
};

function isBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// Some browsers or browser extensions block access to canvas data to prevent fingerprinting.
// Mapbox GL uses this API to load sprites and images in general.
function isCanvasGetImageDataSupported() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) {
        return false;
    }
    return context.getImageData(0, 0, 1, 1).width === canvas.width;
}

/** @type {boolean | undefined} */
let webGL2Cached;
/** @type {boolean | undefined} */
let webGL2CachedStrict;

/** @param {boolean} [failIfMajorPerformanceCaveat] */
function isWebGL2Supported(failIfMajorPerformanceCaveat) {
    if (failIfMajorPerformanceCaveat) {
        if (webGL2CachedStrict === undefined) webGL2CachedStrict = checkWebGL2(true);
        return webGL2CachedStrict;
    }
    if (webGL2Cached === undefined) webGL2Cached = checkWebGL2(false);
    return webGL2Cached;
}

/** @param {boolean} failIfMajorPerformanceCaveat */
function checkWebGL2(failIfMajorPerformanceCaveat) {
    const canvas = document.createElement('canvas');
    const attributes = Object.create(webGLContextAttributes);
    attributes.failIfMajorPerformanceCaveat = failIfMajorPerformanceCaveat;
    const gl = /** @type {WebGL2RenderingContext | null} */ (canvas.getContext('webgl2', attributes));
    if (!gl) return false;

    // Try compiling a shader and get its compile status. Some browsers like Brave block this API
    // to prevent fingerprinting. Unfortunately, this also means that Mapbox GL won't work.
    let shader;
    try {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } catch (e) {
        return false;
    }

    if (!shader || gl.isContextLost()) return false;

    gl.shaderSource(shader, 'void main() {}');
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true;
}
