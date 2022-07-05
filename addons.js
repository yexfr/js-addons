/* </> \---> 𝙔𝙚𝙭'𝙨 𝙅𝙖𝙫𝙖𝙎𝙘𝙧𝙞𝙥𝙩 𝘼𝙙𝙙𝙤𝙣𝙨 <---/ </> */

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex; 
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};

String.prototype.toNumber = function() {
  return parseInt(this);
};

Number.prototype.isInteger = function() {
  return (parseFloat(this) | 0) === parseFloat(this);
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

Array.prototype.append = function(...items) {
  this.push(...items);
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
  } else if(letters != 0 && nums != 0) {
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
  return this.map(function(v) {
    if(JSON.stringify(v) == JSON.stringify(rval))
      return rwith;
    else if(typeof v == "string" && v.includes(rval))
      return v.replace(new RegExp(v.match(new RegExp(rval, "g")).join("|"), "g"), rwith);
    else return v;
  });
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); 
}

Array.prototype.randomItem = function() {
  if(this.length > 0) 
    return this[randomNumber(0, this.length - 1)];
};

Array.prototype.randomIndex = function() {
  if(this.length > 0) 
    return randomNumber(0, this.length - 1);
};

Array.prototype.min = function() {
  if(this.length > 0 && this.every(v => !isNaN(v))) 
    return Math.min(...this);
};

Array.prototype.max = function() {
  if(this.length > 0 && this.every(v => !isNaN(v))) 
    return Math.max(...this);
};

Array.prototype.size = Array.prototype.length;

Array.prototype.compact = function() {
  return this.filter(v => !!v || v === 0);
};

Array.prototype.reject = function(cn) {
  return this.filter(v => !cn(v));
};

Object.prototype.defineGetter = function(name, value) {
  Object.defineProperty(this, name, {
    get: value
  });
};

Object.prototype.freeze = function() {
  return Object.freeze(this);
};

Object.prototype.seal = function() {
  return Object.seal(this);
};

Object.prototype.defineGetter('length', function() { return Object.entries(this).length; });
Object.prototype.size = Object.prototype.length;

Object.prototype.includes = function(query) {
  return this.hasOwnProperty(query);
};

Object.prototype.new = function() {
  return Object.create(this);
};

Object.prototype.template = Object.prototype.new;
Object.prototype.instance = Object.prototype.new; 

Object.prototype.getKey = function(key) {
  return this[key];
};

Object.prototype.setKey = function(key, value) {
  this[key] = value;
  return value;
};

Object.prototype.deleteKey = function(key) {
  delete this[key];
  return this;
};

Object.prototype.forEach = function(callback) {
  for (const [key, value] of Object.entries(this)) {
    callback(key, value);
  }
};

Object.prototype.toArray = function() {
  let objArray = [];
  this.forEach((k, v) => {
    objArray.push({}.setKey(k, v));
  });
  return objArray;
};

Object.prototype.keys = function() {
  return Object.keys(this);
};

Object.prototype.values = function() {
  return Object.values(this);
};

JSON.get = function(url, callback) {
  fetch(new Request(url)).then(j => j.json()).then(s => callback(s));
};

Element.prototype.attr = function(name, value) {
  if(value) this.setAttribute(name, value);
  return this.getAttribute(name);
};

Object.defineProperty(Element.prototype, 'selector', {
  get: function() { return (this.parentElement.parentElement ? this.parentElement.parentElement.selector + " > " : '') +  (this.parentElement ? this.parentElement.selector + " > " : '') + this.tagName.toLowerCase() + (this.getAttributeNames().filter(v => v !== "class" && v !== "id").length > 0 ? (this.getAttributeNames().filter(v => v !== "class" && v !== "id").length !== 1 ? this.getAttributeNames().filter(v => v !== "class" && v !== "id").reduce((p, v) => `[${p}='${this.attr(p)}']` + `[${v}='${this.attr(v)}']`) : `[${this.getAttributeNames().filter(v => v !== "class" && v !== "id")[0]}='${this.attr(this.getAttributeNames().filter(v => v !== "class" && v !== "id")[0])}']`) : '') + (this.id ? "#" + this.id : '') + (this.className ? "." + [...this.classList].join(".") : ''); }
});

Element.prototype.setRule = function(val) {
  setRule(this.selector, val);
};

Element.prototype.getRule = function(val) {
  return this.style[val];
};

Element.prototype.setCss = Element.prototype.setRule;
Element.prototype.setCSS = Element.prototype.setRule;
Element.prototype.getCss = Element.prototype.getRule;
Element.prototype.getCSS = Element.prototype.getRule;

function cssToObj(cssText) { 
  var regex = /([\w-]*)\s*:\s*([^;]*)/g;
  var match, properties={};
  while(match=regex.exec(cssText)) 
    properties[match[1]] = match[2].trim(); 
  return properties; 
}

Element.prototype.css = function(val) {
  if(typeof val !== "string" || cssToObj(val) !== {}) 
    this.setRule(val);
  else
    return this.getRule(val);
};

Element.prototype.setHtml = function(value) {
  this.innerHTML = value;
};

Element.prototype.getHtml = function() {
  return this.innerHTML.trim();
};

Element.prototype.setHTML = Element.prototype.setHtml;
Element.prototype.getHTML = Element.prototype.getHtml;

Element.prototype.html = function(value) {
  if(typeof value !== 'undefined') this.setHtml(value);
  return this.getHtml();
};

HTMLElement.prototype.click = function(callback) {
  if(callback)
    this.onclick = function(e) { callback.call(this, e); };
  else 
    this.dispatchEvent(new Event("click"))
};

Element.prototype.hover = function(onin, onout) {
  if(onin && onout) {
    this.onmouseenter = function(e) { onin.call(this, e); };
    this.onmouseleave = function(e) { onout.call(this, e); };
  } else if(onin && !onout) {
    this.onmouseenter = function(e) { onin.call(this, e); };
    this.onmouseleave = function(e) { onin.call(this, e); };
  }
};

Element.prototype.keydown = function(key, callback) {
  this.onkeydown = function(e) { if(e.key == key || e.code == key || e.which == key && !!callback) callback.call(this, e); if(!callback) key.call(this, e); };
};

Element.prototype.keypress = function(key, callback) {
  this.onkeypress = function(e) { if(e.key == key || e.code == key || e.which == key && !!callback) callback.call(this, e); if(!callback) key.call(this, e); };
};

Element.prototype.keyup = function(key, callback) {
  this.onkeyup = function(e) { if(e.key == key || e.code == key || e.which == key && !!callback) callback.call(this, e); if(!callback) key.call(this, e); };
};

HTMLElement.prototype.focus = function(callback) {
  if(callback) 
    this.onfocus = function(e) { callback.call(this, e); };
  else 
    this.dispatchEvent(new Event("focus"));
};

HTMLInputElement.prototype.val = function(newVal) {
  if(typeof newVal !== 'undefined') this.value = newVal;
  return this.value;
};

Element.prototype.unfocus = function(callback) {
  this.onblur = function(e) { callback.call(this, e); };
};

Element.prototype.load = function(callback) {
  this.onload = function(e) { callback.call(this, e); };
};

Element.prototype.unload = function(callback) {
  this.onunload = function(e) { callback.call(this, e); };
};

Element.prototype.select = function(callback) {
  this.onselect = function(e) { callback.call(this, e); };
};

Element.prototype.input = function(callback) {
  this.oninput = function(e) { callback.call(this, e); };
};

Element.prototype.scroll = function(callback) {
  this.onscroll = function(e) { callback.call(this, e); };
};

HTMLFormElement.prototype.submit = function(callback) {
  this.onsubmit = function(e) { callback.call(this, e); };
};

Element.prototype.on = function(ev, callback) {
  this['on' + ev] = callback;
};

Element.prototype.off = function(ev) {
  this['on' + ev] = undefined;
};

Element.prototype.prepend = function(val) {
  if(typeof val == "string") {
    this.insertAdjacentHTML("beforebegin", val);
  } else {
    this.insertAdjacentElement("beforebegin", val);
  }
};

Element.prototype.append = function(val) {
  if(typeof val == "string") {
    this.insertAdjacentHTML("afterend", val);
  } else {
    this.insertAdjacentElement("afterend", val);
  }
};

Element.prototype.before = function(val) {
  if(typeof val == "string") {
    this.insertAdjacentHTML("afterbegin", val);
  } else {
    this.insertAdjacentElement("afterbegin", val);
  }
};

Element.prototype.after = function(val) {
  if(typeof val == "string") {
    this.insertAdjacentHTML("beforeend", val);
  } else {
    this.insertAdjacentElement("beforeend", val);
  }
};

Element.prototype.trigger = function(event) {
  this.dispatchEvent(new Event(event));
};

Element.prototype.addClass = function(...classNames) {
  this.classList.add(...classNames);
};

Element.prototype.removeClass = function(...classNames) {
  this.classList.remove(...classNames);
};

Element.prototype.toggleClass = function(...classNames) {
  [...classNames].forEach(v => {
    if(this.classList.contains(v)) 
      this.classList.remove(v);
    else 
      this.classList.add(v);
  });
};

Element.prototype.hasClass = function(...classNames) {
  return [...classNames].every(v => this.classList.contains(v));
};

Element.prototype.defineGetter('hasContent', function() { return this.html() !== ''; });

NodeList.prototype.toArray = function() {
  return [...this];
};

function elem(...query) {
  const elemArray = document.querySelectorAll([...query].join(", ")).toArray();
  return elemArray.length != 1 ? elemArray : document.querySelector(query);
}

Function.prototype.fire = function(times, ...args) {
  while(times--) { this(...args); }
};

function print(...messages) {
  console.log(...messages);
}

function copyToClipboard(text) {
  if(!document.hasFocus()) document.body.focus();
  navigator.clipboard.writeText(text);
}

const colorModify = (c0,p,c1,l) => {
  let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
  if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
  if(!this.pSBCr)this.pSBCr=(d)=>{
      let n=d.length,x={};
      if(n>9){
          [r,g,b,a]=d=d.split(","),n=d.length;
          if(n<3||n>4)return null;
          x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
      }else{
          if(n==8||n==6||n<4)return null;
          if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
          d=i(d.slice(1),16);
          if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
          else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
      }return x};
  h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
  if(!f||!t)return null;
  if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
  else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
  a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
  if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
  else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
};

function setRule(selector, rules) {
  if(document.styleSheets.length > 0) {
    for(const ss of document.styleSheets) {
      const r = ss.cssRules ? [...ss.cssRules] : [...ss.rules];
      if(r.some(v => v.selectorText === selector)) {
        for(const rule of r) {
          if(rule.selectorText === selector) {
            if(typeof rules !== "string") 
              rules.forEach((k, v) => { rule.style[k] = v; });
            else 
              cssToObj(rules).forEach((k, v) => { rule.style[k] = v; });
          }
        }
      } else if(ss === document.styleSheets[document.styleSheets.length - 1]) {
        const propText = typeof rules === "string" ? rules : Object.keys(rules).map(function (p) {
          return p + ":" + (p === "content" ? "'" + rules[p] + "'" : rules[p]);
        }).join(";");
        ss.insertRule(`${selector} { ${propText} }`, r.length);
      }
    }
  } else {
    const style = document.head.appendChild(document.createElement("style")).sheet;
    const propText = typeof rules === "string" ? rules : Object.keys(rules).map(function (p) {
      return p + ":" + (p === "content" ? "'" + rules[p] + "'" : rules[p]);
    }).join(";");
    style.insertRule(`${selector} { ${propText} }`);
  }
}