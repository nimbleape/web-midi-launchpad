import GenericMIDIController from 'generic-midi-controller'

export default function LaunchPad (opts = {}) {
  const controller = GenericMIDIController(inputs(), outputs())
  controller.reset = reset
  controller.lightAll = lightAll

  return controller

  function reset () {
    controller.send([240, 0, 32, 41, 2, 24, 14, 0, 247])
  }

  function lightAll (colour) {
    controller.send([240, 0, 32, 41, 2, 24, 14, colour, 247])
  }

  function inputs () {
    var buttons = []

    for (var j = 0; j < 9; j++) {//y
      //grid.push([]);
      if( j === 8) {
        for (var i = 0; i < 8; i++) {//x
          buttons.push(map(104 + i))//176 for on, 177 for blink, 178 for pulse
        }
      } else {
        for (var i = 0; i < 9; i++) {//x
          buttons.push(map((10 * (j+1) ) + 1 + i ))//144 for on, 145 for blink, 146 for pulse
        }
      }
    }

    return {
      buttons,
    }

    function map (id) {
      return msg => {
        if (msg[1] !== id) return
        if (msg[0] !== 144 && msg[0] !== 176) return
        return msg[2]
      }
    }
  }

  function outputs () {
    var buttons = []
    var rows = []
    var columns = []

    for (var j = 0; j < 9; j++) {//y
      if( j === 8) {
        for (var i = 0; i < 8; i++) {//x
          buttons.push(btn(176, 104 + i))//176 for on, 177 for blink, 178 for pulse
        }
      } else {
        for (var i = 0; i < 9; i++) {//x
          buttons.push(btn(144, (10 * (j+1) ) + 1 + i ))//144 for on, 145 for blink, 146 for pulse
        }
      }
    }

    for (var i = 0; i < 9; i++) {
      rows.push(row(i))
    }

    for (var i = 0; i < 9; i++) {
      columns.push(column(i))
    }

    return {
      buttons,
      rows,
      columns
    }

    function btn (key, id) {
      return (value, send) => send([key, id, value])
    }

    function row (id) {
      return (value, send) => send([240, 0, 32, 41, 2, 24, 13, id, value, 247])
    }

    function column (id) {
      return (value, send) => send([240, 0, 32, 41, 2, 24, 12, id, value, 247])
    }
  }
}
