export default function catchFocus(form) {
  const inputs = form.elements
  const firstInput = inputs[0]
  const lastInput = inputs[inputs.length - 1]

  lastInput.addEventListener('keydown', e => {
    if (!e.shiftKey && e.key === 'Tab') {
      firstInput.focus()
      e.preventDefault()
    }
  })

  firstInput.addEventListener('keydown', e => {
    if (e.shiftKey && e.key === 'Tab') {
      lastInput.focus()
      e.preventDefault()
    }
  })
}