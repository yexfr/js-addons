/* </> \---> 𝙔𝙚𝙭'𝙨 𝙅𝙖𝙫𝙖𝙎𝙘𝙧𝙞𝙥𝙩 𝘼𝙙𝙙𝙤𝙣𝙨 <---/ </> */

function init() {
  String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex; 
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

  String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };

  String.prototype.insert = function(index, value) {
    return this.slice(0, index) + value + this.slice(index);
  }

  String.prototype.contains = String.prototype.includes;

  String.prototype.toNumber = function() {
    return parseFloat(this);
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
      Object.assign(this, [...numArray.sort(function(a, b) { return a - b; }), ...letArray.sort()]);
      return this;
   }
  };

  Array.prototype.toObject = function() {
    return { ...this };
  };

  Array.prototype.toMap = function() {
    return new Map(this.map((v, i) => [i, v]));
  };

  Array.prototype.toSet = function() {
    return new Set(this);
  };

  Array.prototype.subarray = function(start, end) {
    return this.slice(start, end);
  };

  Array.prototype.subarr = function(start, length) {
    return this.slice(start, start + length);
  };

  Array.prototype.replace = function(rval, rwith) {
    const newArr = this.map(function(v) {
      if(JSON.stringify(v) == JSON.stringify(rval))
        return rwith;
      else if(typeof v == "string" && !(rval instanceof RegExp) && v.includes(rval))
        return v.replaceAll(rval, rwith);
      else if(typeof v == "string" && rval instanceof RegExp && v.search(rval) > -1)
        return v.replace(rval, rwith);
      else return v;
    });
    Object.assign(this, newArr);
    return newArr;
  };

  Array.prototype.allType = function(type) {
    return this.every(v => typeof v === type.toLowerCase());
  };

  Array.prototype.everyType = Array.prototype.allType;

  Array.prototype.anyType = function(type) {
    return this.some(v => typeof v === type.toLowerCase());
  };

  Array.prototype.someType = Array.prototype.anyType;

  Array.prototype.allInstancesOf = function(clazz) {
    return this.every(v => v instanceof clazz);
  };

  Array.prototype.anyInstancesOf = function(clazz) {
    return this.some(v => v instanceof clazz);
  };

  Array.prototype.all = Array.prototype.every;
  Array.prototype.any = Array.prototype.some;
  Array.prototype.contains = Array.prototype.includes;
  Array.prototype.has = Array.prototype.includes;

  Array.prototype.first = function() {
    return this[0];
  };

  Array.prototype.last = function() {
    return this[this.length - 1];
  };

  Array.prototype.randomItem = function() {
   if(this.length > 0) 
      return this[randomNumber(0, this.length - 1)];
  };

  Array.prototype.randomIndex = function() {
    if(this.length > 0) 
      return randomNumber(0, this.length - 1);
  };

  Array.prototype.min = function() {
    if(this.allType("number")) 
      return Math.min(...this);
  };

  Array.prototype.max = function() {
    if(this.allType("number")) 
      return Math.max(...this);
  };

  Array.prototype.sum = function() {
    if(this.allType("number")) 
      return this.reduce((acc, cur) => acc + cur, 0);
  };

  Array.prototype.size = Array.prototype.length;

  Array.prototype.compact = function() {
    return this.filter(v => !!v || v === 0);
  };

  Array.prototype.reject = function(predicate) {
    return this.filter(v => !predicate(v));
  };

  Array.prototype.pop = function(index) {
    if(this.length !== 0) {
      if(typeof index !== 'undefined') {
        return this.splice(index, 1)[0];
      } else if(index >= 0) {
        return this.splice(this.length - 1, 1)[0];
      }
    }
  };

  Array.prototype.collapse = function(sep) {
    if(this.allType('number'))
      return this.sum();
    else if(this.all(v => JSON.stringify(v).search(/^\{.{0,}\}$/) !== -1) && this.allType('object')) 
      return this.reduce((acc, cur) => { return {...acc, ...cur}; });
    else if(this.all(v => Array.isArray(v))) 
      return this.flat(1);
    else return this.join(typeof sep !== 'undefined' ? sep : '');
  };

  Array.prototype.pluck = function(key) {
    return this.map(v => v[key]);
  };

  Object.forEach = function(obj, callback) {
    for (const key of Object.keys(obj)) {
      callback(key, obj[key]);
    }
  };

  Object.prototype.defineGetter = function(name, value) {
    Object.defineProperty(this, name, {
      get: value
    });
  };

  Object.prototype.defineSetter = function(name, value) {
    Object.defineProperty(this, name, {
      set: value
    });
  };

  Object.prototype.defineGetter('length', function() { return Object.entries(this).length; });
  Object.prototype.size = Object.prototype.length;

  Object.includes = function(obj, key) {
    return Object.keys(obj).some(k => k === key);
  };

  Object.keyOf = function(obj, val) {
    return Object.keys(obj)[Object.values(obj).findIndex(v => v === val)];
  };

  Object.toArray = function(obj) {
    return Object.entries(obj).map(([key, value]) => JSON.parse(`{"${key}":"${value}"}`));
  };

  JSON.get = function(url, callback) {
    fetch(new Request(url)).then(j => j.json()).then(s => callback(s));
  };

  Element.prototype.attr = function(name, value) {
    if(!!value) this.setAttribute(name, value);
    return this.getAttribute(name);
  };

  Element.prototype.defineGetter("selector",
    function() { 
      return (this.parentElement ? this.parentElement.selector + " > " : '') + 
             this.tagName.toLowerCase() + 
             this.getAttributeNames().filter(v => v !== "class" && v !== "id" && v !== "style").map(v => `[${v}='${this.attr(v)}']`).join('') + 
             (this.id ? "#" + this.id : '') + 
             (this.className ? "." + [...this.classList].join(".") : ''); }
  );

  Element.prototype.setRule = function(val) {
    setRule(this.selector, val);
  };

  Element.prototype.getRule = function(val) {
    return window.getComputedStyle(this, null).getPropertyValue(val);
  };

  Element.prototype.setCss = Element.prototype.setRule;
  Element.prototype.setCSS = Element.prototype.setRule;
  Element.prototype.getCss = Element.prototype.getRule;
  Element.prototype.getCSS = Element.prototype.getRule;

  Element.prototype.css = function(val) {
    if(typeof val !== "string" || JSON.stringify(cssStrToObj(val)) !== "{}") 
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

  Element.prototype.getCont = function() {
    return this.textContent;  
  };

  Element.prototype.setCont = function(val) {
    this.textContent = val;
  };

  Element.prototype.getContent = Element.prototype.getCont;
  Element.prototype.setContent = Element.prototype.setCont;

  Element.prototype.cont = function(val) {
    if(typeof val !== 'undefined') this.setCont(val);
    return this.getCont();
  };

  Element.prototype.content = Element.prototype.cont;

  Element.prototype.eventListeners = [];

  Element.prototype.on = function(event, id, callback, options={}) {
    this.eventListeners.push({event, id, callback, options});
    this.addEventListener(event, callback, options);
  };

  Element.prototype.off = function(event, id) {
    const eventListener = this.eventListeners.find(predicate);
    if(typeof eventListener !== "undefined") {
      const predicate = v => v.event === event && v.id === id;
      this.eventListeners.splice(this.eventListeners.findIndex(predicate), 1);
      this.removeEventListener(eventListener.event, eventListener.callback, eventListener.options);
    }
  };

  HTMLElement.prototype.triggerClick = HTMLElement.prototype.click;

  HTMLElement.prototype.click = function(callback) { 
    if(callback)
      this.on("click", "proto-click", callback);
    else 
      this.triggerClick();
  };

  Element.prototype.hover = function(onin, onout) {
    if(!!onin && !!onout) {
      this.on("mouseenter", "proto-hover-onin", onin);
      this.on("mouseleave", "proto-hover-onout", onout);
    } else if(!!onin && !onout) {
      this.on("mouseenter", "proto-hover-onin", onin);
      this.on("mouseleave", "proto-hover-onout", onin);
    }
  };

  Element.prototype.keydown = function(callback) {
    this.on("keydown", "proto-keydown", callback);
  };

  Element.prototype.keypress = function(callback) {
    this.on("keypress", "proto-keypress", callback);
  };

  Element.prototype.keyup = function(callback) {
    this.on("keyup", "proto-keyup", callback);
  };

  HTMLElement.prototype.triggerFocus = HTMLElement.prototype.focus;

  HTMLElement.prototype.focus = function(callback) {
    if(!!callback) 
      this.on("focus", "proto-focus", callback);
    else 
      this.triggerFocus();
  };

  HTMLInputElement.prototype.val = function(newVal) {
    if(typeof newVal !== 'undefined') this.value = newVal;
    return this.value;
  };

  HTMLTextAreaElement.prototype.val = function(newVal) {
    if(typeof newVal !== 'undefined') this.value = newVal;
    return this.value;
  };

  Element.prototype.blur = function(callback) {
    this.on("blur", "proto-blur", callback);
  };

  Element.prototype.load = function(callback) {
    this.on("load", "proto-load", callback);
  };

  Element.prototype.unload = function(callback) {
    this.on("unload", "proto-unload", callback);
  };

  Element.prototype.select = function(callback) {
    this.on("select", "proto-select", callback);
  };

  Element.prototype.input = function(callback) {
    this.on("input", "proto-input", callback);
  };

  Element.prototype.scroll = function(callback) {
    this.on("scroll", "proto-scroll", callback);
  };

  HTMLFormElement.prototype.submit = function(callback) {
    if(callback) 
      this.on("submit", "proto-submit", callback);
    else 
      this.dispatchEvent(new Event("submit"));
  };

  Element.prototype.before = function(val) {
    if(typeof val == "string") {
      this.insertAdjacentHTML("beforebegin", val);
    } else {
      this.insertAdjacentElement("beforebegin", val);
    }
  };

  Element.prototype.after = function(val) {
    if(typeof val == "string") {
      this.insertAdjacentHTML("afterend", val);
    } else {
      this.insertAdjacentElement("afterend", val);
    }
  };

  Element.prototype.prepend = function(val) { 
    if(typeof val == "string") {
      this.insertAdjacentHTML("afterbegin", val);
    } else {
      this.insertAdjacentElement("afterbegin", val);
    }
  };

  Element.prototype.append = function(val) {
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
    if(this.classList.length === 0) this.removeAttribute('class');
  };

  Element.prototype.toggleClass = function(...classNames) {
    [...classNames].forEach(v => {
      if(this.classList.contains(v)) {
        this.classList.remove(v); 
        if(this.classList.length === 0) this.removeAttribute('class');
      } else 
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

  Function.prototype.fire = function(times, thisArg, ...args) {
    while(times--) { this.call(thisArg, ...args); }
  };
}

init();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); 
}

function cssStrToObj(cssText) { 
  var regex = /([\w-]*)\s*:\s*([^;]*)/g;
  var match, properties={};
  while(match=regex.exec(cssText)) 
    properties[match[1]] = match[2].trim(); 
  return properties; 
}

function elem(...query) {
  const elemArray = [...document.querySelectorAll([...query].join(", "))];
  return elemArray.length !== 1 ? elemArray : document.querySelector(query);
}

function createElem(tagName, { textContent, innerHTML, value, children, ...attrs }, opts={}) {
  const el = document.createElement(tagName.toLowerCase(), opts);
  if(!!textContent)
    el.textContent = textContent;
  if(!!innerHTML)
    el.innerHTML = innerHTML;
  if(!!value)
    el.value = value;
  if(!!children)
    el.append(...children);
  for(const [name, value] of Object.entries(attrs))
    el.setAttribute(name, value);
  return el;
}

function print(...messages) {
  console.log(...messages);
}

async function copyToClipboard(text) {
  if((await navigator.permissions.query({ name: "clipboard-write" })).state === "granted" && document.hasFocus())
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

function arrCompare(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
};

function setRule(selector, rules) {
  if(document.styleSheets.length > 0) {
    for(const ss of document.styleSheets) {
      const r = ss.cssRules ? [...ss.cssRules] : [...ss.rules];
      if(r.some(v => arrCompare([...document.querySelectorAll(v.selectorText)], [...document.querySelectorAll(selector)]))) {
        for(const rule of r) {
          if(arrCompare([...document.querySelectorAll(rule.selectorText)], [...document.querySelectorAll(selector)])) {
            if(typeof rules !== "string") 
              Object.forEach(rules, (k, v) => { rule.style[k] = v; });
            else 
              Object.forEach(cssStrToObj(rules), (k, v) => { rule.style[k] = v; });
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
