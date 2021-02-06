import { checkWebGL, createProgram, getShader } from './webgl';

export const main = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  const gl = checkWebGL(canvas);

  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    return;
  }

  const VSHADER_SOURCE =
    'void main() {\n' +
    '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
    '  gl_PointSize = 20.0;\n' + // Set the point size
    '}\n';

  const FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
    '}\n';
  const vertexShader = getShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
  const fragmentShader = getShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

  if (!vertexShader || !fragmentShader) {
    return;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
};

main();
