/* </> \---> 𝙔𝙚𝙭'𝙨 𝙅𝙖𝙫𝙖𝙎𝙘𝙧𝙞𝙥𝙩 𝘼𝙙𝙙𝙤𝙣𝙨 <---/ </> */

String.prototype.toNumber = function() {
  return parseInt(this);
};

Number.prototype.isInteger = function() {
  return Number.isInteger(this);
};

Array.prototype.deleteItem = function(item) {
  this.splice(this.indexOf(item), 1);
};

Array.prototype.deleteIndex = function(index) {
  this.splice(index, 1);
};

Array.prototype.removeItem = function(item) {
  this.splice(this.indexOf(item), 1);
};

Array.prototype.removeIndex = function(index) {
  this.splice(index, 1);
};

Array.prototype.clear = function() {
  while(this[0]) this.deleteIndex(0);
};

Array.prototype.push = function(...items) {
  this.splice(this.length, 0, ...items);
};

Array.prototype.unshift = function(...items) {
  this.splice(0, 0, ...items);
};

Array.prototype.prepend = function(...items) {
  this.unshift(...items);
}

Array.prototype.append = function(item) {
  this.push(item);
};

Array.prototype.reorder = function() {
  let nums = 0;
  let letters = 0;
  this.forEach(value => {
    if(!isNaN(value)) {
        nums++;
    } else {
        letters++;
    }
  });
  if(nums > letters && letters == 0) {
    this.sort(function(a, b) { return a - b; });
    return this;
  } else if(letters > nums && nums == 0) {
    this.sort();
    return this;
  } else if(letters > nums && nums != 0) {
    const numArray = [], letArray = [];
    this.forEach(value => {
      if(!isNaN(value)) {
        numArray.push(value);
      } else {
        letArray.push(value);
      }
    });
    numArray.sort(function(a, b) { return a - b; });
    letArray.sort();
    this.clear();
    this.push(...numArray, ...letArray);
    return this;
  } else if(nums > letters && letters != 0) {
    const numArray = [], letArray = [];
    this.forEach(value => {
      if(!isNaN(value)) {
        numArray.push(value);
      } else {
        letArray.push(value);
      }
    });
    numArray.sort(function(a, b) { return a - b; });
    letArray.sort();
    this.clear();
    this.push(...numArray, ...letArray);
    return this;
  }
};

Array.prototype.toObject = function() {
  let arrayObj = {};
  this.forEach((v, i) => arrayObj[i] = v);
  return arrayObj;
};

Array.prototype.toMap = function() {
  let arrayMap = new Map();
  this.forEach((v, i) => arrayMap.set(i, v));
  return arrayMap;
};

Array.prototype.toSet = function() {
  let arraySet = new Set();
  this.forEach(v => arraySet.add(v));
  return arraySet;
};

Array.prototype.subarray = function(start, end) {
  return this.slice(start, end);
};

Array.prototype.subarr = function(start, length) {
  return this.slice(start, start + length);
};

Array.prototype.replace = function(rval, rwith) {
  let replaceItems = [];
  if(rval instanceof RegExp) {
    this.forEach(value => {
      const matches = value.match(rval) ? value.match(rval) : null;
      replaceItems.push(matches != null ? value.replace(...matches, rwith) : value);
    });
  } else {
    this.forEach(value => {
      const matches = value.match(new RegExp(rval, "gi")) ? value.match(new RegExp(rval, "gi")) : null;
      replaceItems.push(matches != null ? value.replace(...matches, rwith) : value);
    });
  }
  return replaceItems;
};

Element.prototype.setCss = function(name, value) {
  this.style[name] = value;
};

Element.prototype.getCss = function(name) {
  return this.style[name];
};

Element.prototype.setHtml = function(value) {
  this.innerHTML = value;
};

Element.prototype.getHtml = function() {
  return this.innerHTML;
};

Element.prototype.click = function(callback) {
  this.onclick = function(e) { callback(e); };
};

Element.prototype.hover = function(onin, onout) {
  if(onin) this.onmouseenter = function(e) { onin(e); };
  if(onout) this.onmouseleave = function(e) { onout(e); };
};

Element.prototype.keydown = function(key, callback) {
  this.onkeydown = function(e) { if(e.key == key) callback(); };
};

Element.prototype.keypress = function(key, callback) {
  this.onkeypress = function(e) { if(e.key == key) callback(); };
};

Element.prototype.keyup = function(key, callback) {
  this.onkeyup = function(e) { if(e.key == key) callback(); };
};

Element.prototype.focus = function(callback) {
  this.onfocus = function(e) { callback(e); };
};

Element.prototype.unfocus = function(callback) {
  this.onblur = function(e) { callback(e); };
};

Element.prototype.load = function(callback) {
  this.onload = function(e) { callback(e); };
};

Element.prototype.unload = function(callback) {
  this.onunload = function(e) { callback(e); };
};

Element.prototype.input = function(callback) {
  this.oninput = function(e) { callback(e); };
};

Element.prototype.scroll = function(callback) {
  this.onscroll = function(e) { callback(e); };
};

HTMLFormElement.prototype.submit = function(callback) {
  this.onsubmit = function(e) { callback(e); };
};

function elem(...query) {
  const elarr = [];
  for (const el of document.querySelectorAll([...query].reduce((a, b) => a + ", "  + b))) {
    elarr.push(el);
  }
  return elarr.length != 1 ? elarr : document.querySelector(query);
}

Object.prototype.includes = function(query) {
  return this.hasOwnProperty(query);
};

Object.prototype.createInstance = function() {
  return Object.create(this);
};

Object.prototype.setKey = function(key, value) {
  this[key] = value;
};

Object.prototype.deleteKey = function(key) {
  delete this[key];
};

Object.prototype.forEach = function(callback) {
  for (const [key, value] of Object.entries(this)) {
    callback(key, value);
  }
};

Object.prototype.toArray = function() {
  let objArray = [];
  this.forEach((k, v) => {
    const kvObj = {};
    kvObj.setKey(k, v);
    objArray.push(kvObj);
  });
  return objArray;
};

Object.prototype.keys = function() {
  return Object.keys(this);
};

Object.prototype.values = function() {
  return Object.values(this);
};
