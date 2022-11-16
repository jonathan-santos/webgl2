const gl = getGLContext({ width: 400, height: 400 })

const vertexShaderSource = `#version 300 es
  in vec4 a_position;
  in vec3 a_color;

  out vec3 v_color;

  void main() {
    gl_Position = a_position;
    v_color = a_color;
  }
`

const fragmentShaderSource = `#version 300 es
  precision highp float;

  in vec3 v_color;

  out vec4 outColor;

  void main() {
    outColor = vec4(v_color, 1);
  }
`

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

const program = createProgram(gl, vertexShader, fragmentShader)

const vao = gl.createVertexArray()
gl.bindVertexArray(vao)

const positions = [
  -0.5, -0.5, 1.0, 0.0, 0.0,
   0.5, -0.5, 0.0, 1.0, 0.0,
   0.0,  0.5, 0.0, 0.0, 1.0
]

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

const stride = 5 * Float32Array.BYTES_PER_ELEMENT

const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
const positionAttributeOffset = 0
gl.enableVertexAttribArray(positionAttributeLocation)
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, stride, positionAttributeOffset)

const colorAttributeLocation = gl.getAttribLocation(program, "a_color")
const colorAttributeOffset = 2 * Float32Array.BYTES_PER_ELEMENT
gl.enableVertexAttribArray(colorAttributeLocation)
gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, stride, colorAttributeOffset)

gl.clearColor(1, 1, 1, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.useProgram(program)
gl.bindVertexArray(vao)

gl.drawArrays(gl.TRIANGLES, 0, 3)
