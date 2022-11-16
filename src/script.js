const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl2')

if (!gl) {
  alert('Your browser does not support WebGL2')
}

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

const createShader = (type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  
  if (!success) {
    const error = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)

    throw new Error(error)
  }

  return shader
}

const createProgram = (vertexShader, fragmentShader) => {
  const program = gl.createProgram()

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)

  if (!success) {
    const error = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(error)
  }

  return program
}

const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

const program = createProgram(vertexShader, fragmentShader)

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

