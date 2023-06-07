/* </> \---> 𝙔𝙚𝙭'𝙨 𝙅𝙖𝙫𝙖𝙎𝙘𝙧𝙞𝙥𝙩 𝘼𝙙𝙙𝙤𝙣𝙨 <---/ </> */

function init() {
  function cssStrToObj(cssText) { 
    return Object.fromEntries([...cssText.matchAll(/([\w-]*)\s*:\s*([^;]*)/g)].map(v => v.slice(1))); 
  }

  Object.forEach = function(obj, callback) {
    for (const key of Object.keys(obj))
      callback(key, obj[key]);
  }

  Object.prototype.defineGetter = function(name, value) {
    Object.defineProperty(this, name, {
      get: value
    });
  }

  Object.prototype.defineSetter = function(name, value) {
    Object.defineProperty(this, name, {
      set: value
    });
  }

  Object.keyOf = function(obj, val) {
    return Object.keys(obj)[Object.values(obj).indexOf(val)];
  }

  Object.chain = function(...objects) {
    return objects.reduce((acc, cur) => { return { ...acc, ...cur }; });
  }

  String.prototype.replaceArray = function(find, replace) {
    let replaceString = this;
    for (var i = 0; i < find.length; i++) {
      replaceString = replaceString.replace(new RegExp(find[i], "g"), replace[i]);
    }
    return replaceString;
  }

  String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  }

  String.prototype.insert = function(index, value) {
    return this.slice(0, index) + value + this.slice(index);
  }

  String.prototype.toNumber = function() {
    return parseFloat(this);
  }
  
  String.prototype.reverse = function() {
    return this.split('').reverse().join('');
  }
  
  String.prototype.is = function(...strings) {
    return strings.includes(this.valueOf());
  }

  Number.prototype.isInteger = function() {
    return (parseFloat(this) | 0) === parseFloat(this);
  }

  Array.prototype.clear = function() {
    while(this[0]) this.splice(0, 1);
  }

  Array.prototype.prepend = Array.prototype.unshift;
  Array.prototype.append = Array.prototype.push;

  Array.prototype.subarray = function(start, end) {
    return this.slice(start, end);
  }

  Array.prototype.subarr = function(start, length) {
    return this.slice(start, start + length);
  }

  Array.prototype.replace = function(rval, rwith) {
    return this.map(v => {
      if(v === rval)
        return rwith;
      else if(typeof v === "string" && !(rval instanceof RegExp) && v.includes(rval))
        return v.replaceAll(rval, rwith);
      else if(typeof v === "string" && rval instanceof RegExp && v.search(rval) > -1)
        return v.replace(rval, rwith);
      else return v;
    });
  }

  Array.prototype.all = Array.prototype.every;
  Array.prototype.any = Array.prototype.some;

  Array.prototype.allType = function(...types) {
    return this.all(v => types.map(e => e.toLowerCase()).includes(typeOf(v)));
  }

  Array.prototype.everyType = Array.prototype.allType;

  Array.prototype.anyType = function(...types) {
    return this.any(v => types.map(e => e.toLowerCase()).includes(typeOf(v)));
  }

  Array.prototype.someType = Array.prototype.anyType;

  Array.prototype.reorder = function(key=v => v) {
    const defaultCompare = k => ( x, y ) => {
      x = k(x), y = k(y);
      if( x < y )
        return -1;
      else if( x > y ) return 1;
      return 0;
    };
    return this.map(key).allType("string") ? this.toSorted(defaultCompare(key)) : ( this.map(key).allType("number") ? this.toSorted((a, b) => key(a) - key(b)) : this );
  }

  Array.prototype.first = function() {
    return this.at(0);
  }

  Array.prototype.last = function() {
    return this.at(-1);
  }

  Array.prototype.randomItem = function() {
   if(this.length > 0) 
      return this[randomNumber(0, this.length - 1)];
  }

  Array.prototype.randomIndex = function() {
    if(this.length > 0) 
      return randomNumber(0, this.length - 1);
  }

  Array.prototype.min = function() {
    if(this.allType("number")) 
      return Math.min(...this);
  }

  Array.prototype.max = function() {
    if(this.allType("number")) 
      return Math.max(...this);
  }

  Array.prototype.sum = function() {
    if(this.allType("number") || this.allType("bigint")) 
      return this.reduce((acc, cur) => acc + cur);
  }

  Array.prototype.size = Array.prototype.length;

  Array.prototype.reject = function(predicate) {
    return this.filter(v => !predicate(v));
  }

  Array.prototype.cleanse = function() {
    return this.reject(v => typeOf(v).is("undefined", "null"));
  }

  Array.prototype.pop = function(index) {
    if(this.length !== 0) {
      if(typeof index !== 'undefined') {
        return this.splice(index, 1)[0];
      } else return this.splice(-1, 1)[0];
    }
  }

  Array.prototype.collapse = function(sep='') {
    if(this.allType("number") || this.allType("bigint"))
      return this.sum();
    else if(this.all(v => Array.isArray(v))) 
      return this.flat(1);
    else if(this.allType('object')) 
      return Object.chain(...this);
    else return this.join(sep);
  }

  Array.prototype.pluck = function(key) {
    return this.map(v => v[key]);
  }

  Array.prototype.one = function(predicate) {
    return this.filter(typeof predicate !== "function" ? (v => v === predicate) : predicate).length === 1;
  }

  Array.prototype.without = function(...items) {
    return this.reject(v => items.includes(v));
  }

  Array.prototype.swapIndices = function(i, j) {
    [this[i], this[j]] = [this[j], this[i]];
  }

  Array.prototype.shuffle = function() {
    for(let i = this.length; i > 0; --i)
      this.swapIndices(i, Math.floor(Math.random() * (i + 1)));
  }

  Array.prototype.uniques = function() {
    return this.filter(v => this.one(v));
  }

  Array.prototype.fillEach = function(value, start, end) {
    for(let i = start; i <= end; i++) {
      this[i] = structuredClone(value);
    }
    return this;
  }

  Array.zip = function(...arrays) {
    return Array(arrays[0].length).fill().map((_, i) => arrays.map(v => v[i]));
  }

  Array.zipWithKeys = function(keys, ...arrays) {
    return Array(arrays[0].length).fill().map((_, i) => Object.fromEntries(arrays.map((p, j) => [keys[j], p[i]])));
  }

  JSON.get = function(url, callback) {
    fetch(new Request(url)).then(j => j.json()).then(s => callback(s));
  }

  Element.prototype.attr = function(name, value) {
    if(typeof value !== "undefined") this.setAttribute(name, value);
    return this.getAttribute(name);
  }

  Element.prototype.appendTo = function(sel) {
    return document.querySelector(sel).appendChild(this);
  }
 
  Element.prototype.setRule = function(val) {
    if(typeof val !== "string") 
        Object.forEach(val, (k, v) => this.style[k] = v);
    else Object.forEach(cssStrToObj(val), (k, v) => this.style[k] = v);
  }

  Element.prototype.getRule = function(val) {
    return window.getComputedStyle(this, null).getPropertyValue(val);
  }

  Element.prototype.setCss = Element.prototype.setRule;
  Element.prototype.setCSS = Element.prototype.setRule;
  Element.prototype.getCss = Element.prototype.getRule;
  Element.prototype.getCSS = Element.prototype.getRule;

  Element.prototype.css = function(val) {
    if(typeof val !== "string" || JSON.stringify(cssStrToObj(val)) !== "{}") 
      this.setRule(val);
    else return this.getRule(val);
  }

  Element.prototype.setHtml = function(value) {
    this.innerHTML = value;
  }

  Element.prototype.getHtml = function() {
    return this.innerHTML;
  }

  Element.prototype.setHTML = Element.prototype.setHtml;
  Element.prototype.getHTML = Element.prototype.getHtml;

  Element.prototype.html = function(value) {
    if(typeof value !== 'undefined') this.setHtml(value);
    return this.getHtml();
  }

  Element.prototype.getCont = function() {
    return this.textContent;  
  }

  Element.prototype.setCont = function(val) {
    this.textContent = val;
  }

  Element.prototype.getContent = Element.prototype.getCont;
  Element.prototype.setContent = Element.prototype.setCont;

  Element.prototype.cont = function(val) {
    if(typeof val !== 'undefined') this.setCont(val);
    return this.getCont();
  }

  Element.prototype.content = Element.prototype.cont;

  Element.prototype.eventListeners = [];

  Element.prototype.on = function(event, callback, options={}) {
    this.addEventListener(event, callback, options);
  }

  Element.prototype.off = function(event, callback, options) {
    this.removeEventListener(event, callback, options);
  }

  HTMLElement.prototype.triggerClick = HTMLElement.prototype.click;

  HTMLElement.prototype.click = function(callback) { 
    if(callback)
      this.on("click", callback);
    else this.triggerClick();
  }

  Element.prototype.hover = function(onin, onout) {
    if(!!onin && !!onout) {
      this.on("mouseenter", onin);
      this.on("mouseleave", onout);
    } else if(!!onin && !onout) {
      this.on("mouseenter", onin);
      this.on("mouseleave", onin);
    }
  }

  Element.prototype.keydown = function(callback) {
    this.on("keydown", callback);
  }

  Element.prototype.keyup = function(callback) {
    this.on("keyup", callback);
  }

  HTMLElement.prototype.triggerFocus = HTMLElement.prototype.focus;

  HTMLElement.prototype.focus = function(callback) {
    if(!!callback) 
      this.on("focus", callback);
    else this.triggerFocus();
  }

  HTMLInputElement.prototype.val = function(newVal) {
    if(typeof newVal !== 'undefined') this.value = newVal;
    return this.value;
  }

  HTMLTextAreaElement.prototype.val = function(newVal) {
    if(typeof newVal !== 'undefined') this.value = newVal;
    return this.value;
  }

  HTMLElement.prototype.triggerBlur = HTMLElement.prototype.blur;

  HTMLElement.prototype.blur = function(callback) {
    if(!!callback) 
      this.on("blur", callback);
    else this.triggerBlur();
  }

  Element.prototype.load = function(callback) {
    this.on("load", callback);
  }

  Element.prototype.unload = function(callback) {
    this.on("unload", callback);
  }

  Element.prototype.selectionchange = function(callback) {
    this.on("input", e.inputType.startsWith("delete") ? this.dispatchEvent(new Event("selectionchange", { bubbles: false, cancelable: false })) : e);
    document.addEventListener("selectionchange", e => this === document.activeElement ? this.dispatchEvent(new Event("selectionchange", { bubbles: false, cancelable: false })) : e);
    this.on("selectionchange", callback);
  }

  Element.prototype.input = function(callback) {
    this.on("input", callback);
  }

  Element.prototype.scroll = function(callback) {
    this.on("scroll", callback);
  }

  HTMLFormElement.prototype.triggerSubmit = HTMLFormElement.prototype.submit;

  HTMLFormElement.prototype.submit = function(callback) {
    if(callback) 
      this.on("submit", callback);
    else this.triggerSubmit();
  }

  Element.prototype.before = function(val) {
    if(typeof val === "string")
      this.insertAdjacentHTML("beforebegin", val);
    else this.insertAdjacentElement("beforebegin", val);
  }

  Element.prototype.after = function(val) {
    if(typeof val === "string") 
      this.insertAdjacentHTML("afterend", val);
    else this.insertAdjacentElement("afterend", val);
  }

  Element.prototype.prepend = function(val) { 
    if(typeof val === "string")
      this.insertAdjacentHTML("afterbegin", val);
    else this.insertAdjacentElement("afterbegin", val);
  }

  Element.prototype.append = function(val) {
    if(typeof val === "string")
      this.insertAdjacentHTML("beforeend", val);
    else this.insertAdjacentElement("beforeend", val);
  }

  Element.prototype.trigger = function(event, opts={}) {
    this.dispatchEvent(new Event(event, opts));
  }

  Element.prototype.addClass = function(...classNames) {
    this.classList.add(...classNames);
  }

  Element.prototype.removeClass = function(...classNames) {
    this.classList.remove(...classNames);
    if(this.classList.length === 0) this.removeAttribute('class');
  }

  Element.prototype.toggleClass = function(...classNames) {
    this.removeClass(...classNames.filter(v => this.classList.contains(v)));
    this.addClass(...classNames.reject(v => this.classList.contains(v)));
  }

  Element.prototype.hasClass = function(...classNames) {
    return classNames.every(v => this.classList.contains(v));
  }

  Element.prototype.defineGetter('empty', function() { return this.html().trim() === ''; });

  Function.prototype.fire = function(times, thisArg, ...args) {
    while(times--) this.apply(thisArg, args);
  }
}

init();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); 
}

function elem(...query) {
  const elemArray = [...document.querySelectorAll([...query].join(", "))];
  return elemArray.length !== 1 ? elemArray : document.querySelector(query);
}

function createElem(tagName, { textContent, innerHTML, value, children, ...attrs }, callback=(el) => null) {
  const el = document.createElement(tagName.toUpperCase());
  for(const [name, value] of Object.entries(attrs))
    el.setAttribute(name, value);
  if(textContent) el.textContent = textContent;
  if(innerHTML) el.innerHTML = innerHTML;
  if(value) el.value = value;
  if(children) el.append(...children);
  callback(el);
  return el;
}

function typeOf(value) {
  if(value === null) 
    return "null";
  else if(Array.isArray(value)) 
    return "array";
  else if(value instanceof Set)
    return "set";
  else if(value instanceof WeakSet)
    return "weakset";
  else if(value instanceof Map) 
    return "map";
  else if(value instanceof WeakMap)
    return "weakmap";
  else if(value instanceof Date)
    return "date";
  else if(value instanceof Error)
    return "error";
  else if(value instanceof RegExp)
    return "regexp";
  else if(value instanceof Promise)
    return "promise";
  else return typeof value;
}

function print(...messages) {
  console.log(...messages);
}

async function copyToClipboard(text) {
  navigator.permissions.query({ name: "clipboard-write" }).then(perm => {
    const state = perm.state || perm.status;
    if(state === "granted" || state === "prompt" && confirm("Do you allow text to be copied to your clipboard?"))
      navigator.clipboard?.writeText(text);
    else throw Error('');
  }).catch(() => createElem("input", { type: "text", value: text }, el => {
    document.body.appendChild(el).focus();
    el.select();
    document.execCommand?.("copy");
    el.remove();
  }));
}

const colorModify = (c0,c1,p,l) => {
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
}

function arrCompare(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
}