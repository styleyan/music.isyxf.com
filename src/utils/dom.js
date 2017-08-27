/**
 * 判断dom是否包含该className
 * @param {Object} el - dom元素
 * @param {String} className - class名称
 */
export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 给dom元素添加className
 * @param {Object} el - dom元素
 * @param {String} className - dome添加的class名称
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  const newClassArr = el.className.split(' ')
  newClassArr.push(className)
  el.className = newClassArr.join(' ')
}

/**
 * 获取元素中data-*属性上的值
 */
export function editElementData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

/**
 * cssq3前缀封装
 */
const elementStyle = document.createElement('div').style

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
