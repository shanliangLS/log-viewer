import ansiParse from './ansi-parse'

const ENCODED_NEWLINE = /\r{0,1}\n(?!\u0008)/

// RegExp reference:
// http://jafrog.com/2013/11/23/colors-in-terminal.html
// https://en.wikipedia.org/wiki/ANSI_escape_code

export const split2Lines = str => str.split(ENCODED_NEWLINE)

export default log => {
  const stringLines = split2Lines(log)
  const stringLinesText = []
  const section = {
    started: false,
    name: '',
    startTime: 0,
    startLine: 0,
    endLine: 0
  }
  const sectionReg = /section_(start|end):([0-9]+):(\S+)/

  let execResult = null

  stringLines.forEach(line => {
    if (!line) {
      return
    }
    execResult = sectionReg.exec(line)
    if (execResult) {
      if (execResult[1] === 'start' && !section.started) {
        section.started = true
        section.name = execResult[3] + stringLinesText.length
        section.startTime = parseInt(execResult[2])
        section.startLine = stringLinesText.length
      } else if (execResult[1] === 'end' && section.started) {
        section.started = false
        section.endLine = stringLinesText.length
        stringLinesText[section.startLine].sectionStart = true
        stringLinesText[section.startLine].sectionTime =
          parseInt(execResult[2]) - section.startTime
      }
      return
    }
    if (section.started) {
      stringLinesText.push({
        sectionName: section.name,
        sectionStartLine: section.startLine,
        content: ansiParse(line)
      })
      return
    }
    stringLinesText.push({content: ansiParse(line)})
  })
  return stringLinesText
}
