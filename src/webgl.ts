type RenderingContext =
  | CanvasRenderingContext2D
  | ImageBitmapRenderingContext
  | WebGLRenderingContext
  | WebGL2RenderingContext;

/**
 * Check if WebGL is available.
 */
export const checkWebGL = (
  canvas: HTMLCanvasElement | null,
): RenderingContext | null => {
  if (!canvas) {
    return null
  }
  const contexts = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  const gl = contexts.reduce((acc: RenderingContext | null, context) => {
    const result = canvas.getContext(context);
    if (result) {
      acc = result;
    }
    return acc;
  }, null);

  if (!gl) {
    console.log(
      'WebGL not available, sorry! Please use a new version of Chrome or Firefox.',
    );
  }
  return gl;
};

export const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) => {
  /**
   * Create and return a shader program
   **/
  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Check that shader program was able to link to WebGL
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }

  return program;
};

/**
 * Get, compile, and return an embedded shader object
 */
export const getShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check if compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      'An error occurred compiling the shaders:' + gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};
