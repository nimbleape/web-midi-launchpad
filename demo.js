import LaunchPad from './'

navigator.requestMIDIAccess({
  sysex: true
}).then(midi => {
  const controller = new LaunchPad()
  window.con = controller;
  for (var input of midi.inputs.values()) {
    controller.setInput(input)
  }
  for (var output of midi.outputs.values()) {
    controller.setOutput(output)
  }

  controller.on('input', function (...data) {
    console.log('input', data)
  })

  controller.on('output', function (...data) {
    console.log('output', data)
  })
})
