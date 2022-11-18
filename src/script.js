const mainEl = document.querySelector('main')
const menuEl = document.querySelector('.menu')
const programEl = document.querySelector('.program')
const closeProgramBtnEl = document.querySelector('.close-program')

function main() {
  const programs = [
    {
      title: 'First Program',
      file: 'firstProgram.js'
    },
    {
      title: 'Gradient Triangle',
      file: 'gradientTriangle.js'
    },
    {
      title: 'Pixels Coordinates',
      file: 'pixelsCoordinates.js'
    },
    {
      title: 'Random Rectangles',
      file: 'randomRectangles.js'
    },
    {
      title: 'Unsigned Bytes Colors',
      file: 'uByteColors.js'
    },
  ]
  
  programs.forEach((program) => {
    const button = Object.assign(document.createElement('button'), {
      innerHTML: program.title,
      onclick: () => selectProgram(program)
    })
  
    menuEl.appendChild(button)
  })
}

function selectProgram(program) {
  const script = Object.assign(document.createElement('script'), {
    src: `./programs/${program.file}`,
    async: true,
    id: 'program'
  })

  mainEl.appendChild(script)

  mainEl.classList.value = 'p'
}

closeProgramBtnEl.addEventListener('click', () => {
  const script = document.querySelector('#program')
  script.remove()  
  
  mainEl.classList.value = 'm'
})

main()
