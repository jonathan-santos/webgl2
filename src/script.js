const mainEl = document.querySelector('main')
const menuEl = document.querySelector('.menu')
const programEl = document.querySelector('.program')
const closeProgramBtnEl = document.querySelector('.close-program')

const programs = [
  'firstProgram',
  'gradientTriangle',
  'pixelsCoordinates',
  'randomRectangles',
  'unsignedByteColors',
]

const queryParams = new URLSearchParams(window.location.search)

const initialProgram = queryParams.get('p')

if (initialProgram) {
  selectProgram(programs[initialProgram])
}

programs.forEach((program) => {
  const title = `${program[0].toUpperCase()}${program.slice(1).split(/(?=[A-Z])/).join(' ')}`
  
  const button = Object.assign(document.createElement('button'), {
    innerHTML: title,
    onclick: () => selectProgram(program)
  })

  menuEl.appendChild(button)
})

closeProgramBtnEl.addEventListener('click', () => {
  const script = document.querySelector('#program')
  script.remove()  
  
  mainEl.classList.value = 'm'
})

function selectProgram(program) {
  const script = Object.assign(document.createElement('script'), {
    src: `./programs/${program}.js`,
    async: true,
    id: 'program'
  })

  mainEl.appendChild(script)

  mainEl.classList.value = 'p'
}
