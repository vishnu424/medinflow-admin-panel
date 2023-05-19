const katex = require('katex')
export const compareByAlph = (a, b) => {
  if (a > b) {
    return -1
  }
  if (a < b) {
    return 1
  }
  return 0
}

export const removeTags = str => {
  if (str === null || str === '') return ''
  else str = str.toString()
  return str.replace(/(<([^>]+)>)/gi, '')
}

export const processString = str => {
  const regex = '<span class="math-tex">(.*?)</span>'
  str = str.replace(/&nbsp;/g, '')
  return removeTags(str.replace(new RegExp(regex), '[formula]'))
}

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const removeSpaces = str => {
  str = str.replace(/&nbsp;/g, '')
  return str
}

export const convertEquationToHtml = async stringData => {
  const data = await katex.renderToString(stringData, {
    leqno: false,
    fleqn: false,
    errorColor: '#CC0000',
    trust: false,
    macros: { '\\f': 'f(#1)' }
  })
  return data
}

export const htmlToKatex = async domData => {
  const dom = document.createElement('div')
  dom.innerHTML = domData

  const x = dom.getElementsByClassName('math-tex')
  for (let i = 0; i < x.length; i++) {
    let text = x[i].textContent
    text = text.replace('\\(', '')
    text = text.replace('\\)', '')
    x[i].innerHTML = await convertEquationToHtml(text)
  }
  return dom.innerHTML
}
export const convertDate = date => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  return (
    date.getDate() +
    ' ' +
    monthNames[date.getMonth()] +
    ' ' +
    date.getFullYear()
  )
}
