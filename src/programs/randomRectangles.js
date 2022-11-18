{
  const gl = getGLContext({ width: 400, height: 400 })

  const vertexShaderSource = `#version 300 es
    in vec2 a_position;

    uniform vec2 u_resolution;

    void main() {
      // convert the position from pixels to 0.0 to 1.0
      vec2 zeroToOne = a_position / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clip space)
      vec2 clipSpace = zeroToTwo - 1.0;
      
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `

  const fragmentShaderSource = `#version 300 es
    precision highp float;

    uniform vec4 u_color; 

    out vec4 outColor;

    void main() {
      outColor = u_color;
    }
  `

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  const program = createProgram(gl, vertexShader, fragmentShader)

  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
  const colorUniformLocation = gl.getUniformLocation(program, "u_color")

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

  resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  gl.bindVertexArray(vao)

  for (let i = 0; i < 50; i++) {
    setRectangle(randomInt(300), randomInt(300), randomInt(300), randomInt(300))

    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  function randomInt(range) {
    return Math.floor(Math.random() * range)
  }

  function setRectangle(x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;

    const data = new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ])

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  }
}
