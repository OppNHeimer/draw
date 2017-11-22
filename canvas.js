const canvas = document.querySelector('#draw')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.lineJoin = 'round'
context.lineCap = 'round'
context.lineWidth = 10

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0

function draw (event) {
  if (!isDrawing) return
  context.strokeStyle = `hsl(${hue}, 50%, 50%)`
  let totalMovement = (Math.abs(event.movementX) + Math.abs(event.movementY)) / 2
  if (totalMovement > 49) totalMovement = 49
  context.lineWidth = 50 - totalMovement
  context.beginPath()
  context.moveTo(lastX, lastY)
  context.lineTo(event.offsetX, event.offsetY)
  context.stroke()

  lastX = event.offsetX
  lastY = event.offsetY
  hue++
  if (hue >= 360) hue = 0
}

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true
  lastX = event.offsetX
  lastY = event.offsetY
})
canvas.addEventListener('mouseup', () => {
  isDrawing = false
})
canvas.addEventListener('mouseout', () => {
  isDrawing = false
})
