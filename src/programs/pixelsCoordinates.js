{
  const gl = getGLContext({ width: 400, height: 400 })

  const vs = `#version 300 es
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

  const fs = `#version 300 es
    precision highp float;

    out vec4 outColor;

    void main() {
      outColor = vec4(1, 0, 0, 1);
    }
  `

  const program = createShaderProgram(gl, vs, fs)

  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

  const positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
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
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  gl.bindVertexArray(vao)

  gl.drawArrays(gl.TRIANGLES, 0, 6)
}
