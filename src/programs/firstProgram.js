const gl = getGLContext({ width: 400, height: 400 })

const vertexShaderSource = `#version 300 es
  in vec4 a_position;

  void main() {
    gl_Position = a_position;
  }
`

const fragmentShaderSource = `#version 300 es
  precision highp float;

  out vec4 outColor;

  void main() {
    outColor = vec4(1, 0, 0.5, 1);
  }
`

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

const program = createProgram(gl, vertexShader, fragmentShader)

const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

const positions = [
  0.0, 0.0,
  0.0, 0.5,
  0.7, 0.0,
]

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

const vao = gl.createVertexArray()
gl.bindVertexArray(vao)

gl.enableVertexAttribArray(positionAttributeLocation)
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

gl.clearColor(1, 1, 1, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.useProgram(program)
gl.bindVertexArray(vao)

gl.drawArrays(gl.TRIANGLES, 0, 3)
