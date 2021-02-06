import { checkWebGL } from '../src/webgl';

const createMockWebGLContext = (mockname: string) => {
  const mockCanvas = document.createElement('canvas');
  mockCanvas.getContext = jest.fn().mockImplementation((name: string) => {
    if (name === mockname) {
      return 'WebGL context';
    }
  });
  return mockCanvas;
};

test('checkWebGL find `webgl`', () => {
  const canvas = createMockWebGLContext('webgl');
  expect(checkWebGL(canvas)).toBe('WebGL context');
});

test('checkWebGL returns `undefined` if no context is found', () => {
  const canvas = createMockWebGLContext('no webgl');
  expect(checkWebGL(canvas)).toBe(null);
});
