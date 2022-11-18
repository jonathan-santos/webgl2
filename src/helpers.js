const getGLContext = ({ canvasSelector = 'canvas', width, height }) => {
  const canvas = document.querySelector(canvasSelector)
  canvas.width = width
  canvas.height = height
  
  gl = canvas.getContext('webgl2')
  
  if (!gl) {
    alert('Your browser does not support WebGL2')
    throw new Error('Unsupported browser')
  }

  return gl
}


const createShader = (gl, type, source) => {
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

const createProgram = (gl, vertexShader, fragmentShader) => {
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

const resizeCanvasToDisplaySize = (canvas) => {
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight

  if  (needResize) {
    canvas.width = displayWidth
    canvas.height = displayHeight
  }
}
