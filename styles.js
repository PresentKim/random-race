!function(e){var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,n){if(!x[e]||!w[e])return;for(var t in w[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(h[t]=n[t]);0==--b&&0===y&&j()}(e,t),n&&n(e,t)};var t,r=!0,o="f08329e18cb35a229aeb",i={},a=[],c=[];function d(e){var n=S[e];if(!n)return z;var r=function(r){return n.hot.active?(S[r]?-1===S[r].parents.indexOf(e)&&S[r].parents.push(e):(a=[e],t=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),a=[]),z(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return z[e]},set:function(n){z[e]=n}}};for(var i in z)Object.prototype.hasOwnProperty.call(z,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,o(i));return r.e=function(e){return"ready"===u&&f("prepare"),y++,z.e(e).then(n,(function(e){throw n(),e}));function n(){y--,"prepare"===u&&(g[e]||I(e),0===y&&0===b&&j())}},r.t=function(e,n){return 1&n&&(e=r(e)),z.t(e,-2&n)},r}function s(n){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:t!==n,active:!0,accept:function(e,n){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._acceptedDependencies[e[t]]=n||function(){};else r._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._declinedDependencies[e[n]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=r._disposeHandlers.indexOf(e);n>=0&&r._disposeHandlers.splice(n,1)},invalidate:function(){switch(this._selfInvalidated=!0,u){case"idle":(h={})[n]=e[n],f("ready");break;case"ready":_(n);break;case"prepare":case"check":case"dispose":case"apply":(v=v||[]).push(n)}},check:O,apply:k,status:function(e){if(!e)return u;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var n=l.indexOf(e);n>=0&&l.splice(n,1)},data:i[n]};return t=void 0,r}var l=[],u="idle";function f(e){u=e;for(var n=0;n<l.length;n++)l[n].call(null,e)}var p,h,m,v,b=0,y=0,g={},w={},x={};function E(e){return+e+""===e?+e:e}function O(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return r=e,f("check"),(n=1e4,n=n||1e4,new Promise((function(e,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,i=z.p+""+o+".hot-update.json";r.open("GET",i,!0),r.timeout=n,r.send(null)}catch(e){return t(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+i+" failed."));else{try{var n=JSON.parse(r.responseText)}catch(e){return void t(e)}e(n)}}}))).then((function(e){if(!e)return f(C()?"ready":"idle"),null;w={},g={},x=e.c,m=e.h,f("prepare");var n=new Promise((function(e,n){p={resolve:e,reject:n}}));h={};return I(2),"prepare"===u&&0===y&&0===b&&j(),n}));var n}function I(e){x[e]?(w[e]=!0,b++,function(e){var n=document.createElement("script");n.charset="utf-8",n.src=z.p+""+e+"."+o+".hot-update.js",document.head.appendChild(n)}(e)):g[e]=!0}function j(){f("ready");var e=p;if(p=null,e)if(r)Promise.resolve().then((function(){return k(r)})).then((function(n){e.resolve(n)}),(function(n){e.reject(n)}));else{var n=[];for(var t in h)Object.prototype.hasOwnProperty.call(h,t)&&n.push(E(t));e.resolve(n)}}function k(n){if("ready"!==u)throw new Error("apply() is only allowed in ready status");return function n(r){var c,d,s,l,u;function p(e){for(var n=[e],t={},r=n.map((function(e){return{chain:[e],id:e}}));r.length>0;){var o=r.pop(),i=o.id,a=o.chain;if((l=S[i])&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var c=0;c<l.parents.length;c++){var d=l.parents[c],s=S[d];if(s){if(s.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([d]),moduleId:i,parentId:d};-1===n.indexOf(d)&&(s.hot._acceptedDependencies[i]?(t[d]||(t[d]=[]),b(t[d],[i])):(delete t[d],n.push(d),r.push({chain:a.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function b(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}C();var y={},g=[],w={},O=function(){console.warn("[HMR] unexpected require("+j.moduleId+") to disposed module")};for(var I in h)if(Object.prototype.hasOwnProperty.call(h,I)){var j;u=E(I),j=h[I]?p(u):{type:"disposed",moduleId:I};var k=!1,_=!1,D=!1,A="";switch(j.chain&&(A="\nUpdate propagation: "+j.chain.join(" -> ")),j.type){case"self-declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(k=new Error("Aborted because of self decline: "+j.moduleId+A));break;case"declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(k=new Error("Aborted because of declined dependency: "+j.moduleId+" in "+j.parentId+A));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(j),r.ignoreUnaccepted||(k=new Error("Aborted because "+u+" is not accepted"+A));break;case"accepted":r.onAccepted&&r.onAccepted(j),_=!0;break;case"disposed":r.onDisposed&&r.onDisposed(j),D=!0;break;default:throw new Error("Unexception type "+j.type)}if(k)return f("abort"),Promise.reject(k);if(_)for(u in w[u]=h[u],b(g,j.outdatedModules),j.outdatedDependencies)Object.prototype.hasOwnProperty.call(j.outdatedDependencies,u)&&(y[u]||(y[u]=[]),b(y[u],j.outdatedDependencies[u]));D&&(b(g,[j.moduleId]),w[u]=O)}var P,H=[];for(d=0;d<g.length;d++)u=g[d],S[u]&&S[u].hot._selfAccepted&&w[u]!==O&&!S[u].hot._selfInvalidated&&H.push({module:u,parents:S[u].parents.slice(),errorHandler:S[u].hot._selfAccepted});f("dispose"),Object.keys(x).forEach((function(e){!1===x[e]&&function(e){delete installedChunks[e]}(e)}));var M,R,T=g.slice();for(;T.length>0;)if(u=T.pop(),l=S[u]){var F={},U=l.hot._disposeHandlers;for(s=0;s<U.length;s++)(c=U[s])(F);for(i[u]=F,l.hot.active=!1,delete S[u],delete y[u],s=0;s<l.children.length;s++){var N=S[l.children[s]];N&&((P=N.parents.indexOf(u))>=0&&N.parents.splice(P,1))}}for(u in y)if(Object.prototype.hasOwnProperty.call(y,u)&&(l=S[u]))for(R=y[u],s=0;s<R.length;s++)M=R[s],(P=l.children.indexOf(M))>=0&&l.children.splice(P,1);f("apply"),void 0!==m&&(o=m,m=void 0);for(u in h=void 0,w)Object.prototype.hasOwnProperty.call(w,u)&&(e[u]=w[u]);var q=null;for(u in y)if(Object.prototype.hasOwnProperty.call(y,u)&&(l=S[u])){R=y[u];var L=[];for(d=0;d<R.length;d++)if(M=R[d],c=l.hot._acceptedDependencies[M]){if(-1!==L.indexOf(c))continue;L.push(c)}for(d=0;d<L.length;d++){c=L[d];try{c(R)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:u,dependencyId:R[d],error:e}),r.ignoreErrored||q||(q=e)}}}for(d=0;d<H.length;d++){var B=H[d];u=B.module,a=B.parents,t=u;try{z(u)}catch(e){if("function"==typeof B.errorHandler)try{B.errorHandler(e)}catch(n){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:n,originalError:e}),r.ignoreErrored||q||(q=n),q||(q=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:u,error:e}),r.ignoreErrored||q||(q=e)}}if(q)return f("fail"),Promise.reject(q);if(v)return n(r).then((function(e){return g.forEach((function(n){e.indexOf(n)<0&&e.push(n)})),e}));return f("idle"),new Promise((function(e){e(g)}))}(n=n||{})}function C(){if(v)return h||(h={}),v.forEach(_),v=void 0,!0}function _(n){Object.prototype.hasOwnProperty.call(h,n)||(h[n]=e[n])}var S={};function z(n){if(S[n])return S[n].exports;var t=S[n]={i:n,l:!1,exports:{},hot:s(n),parents:(c=a,a=[],c),children:[]};return e[n].call(t.exports,t,t.exports,d(n)),t.l=!0,t.exports}z.m=e,z.c=S,z.d=function(e,n,t){z.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},z.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},z.t=function(e,n){if(1&n&&(e=z(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(z.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)z.d(t,r,function(n){return e[n]}.bind(null,r));return t},z.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return z.d(n,"a",n),n},z.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},z.p="",z.h=function(){return o},d(316)(z.s=316)}({23:function(e,n,t){"use strict";t.r(n);var r=t(64),o=t.n(r)()((function(e){return e[1]}));o.push([e.i,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to styles clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor styles of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline styles in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to styles clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n',""]),n.default=o},24:function(e,n,t){"use strict";t.r(n);var r=t(64),o=t.n(r)()((function(e){return e[1]}));o.push([e.i,"canvas#game {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    margin: auto auto;\n}\n\n@media screen and (orientation: portrait) {\n    canvas#game {\n        width: 100vmin;\n    }\n}\n\n@media screen and (orientation: landscape) {\n    canvas#game {\n        height: 100vmin;\n    }\n}",""]),n.default=o},316:function(e,n,t){"use strict";t.r(n);t(317),t(318)},317:function(e,n,t){"use strict";var r=t(63),o=t.n(r),i=t(23),a={insert:"head",singleton:!1},c=o()(i.default,a);if(!i.default.locals||e.hot.invalidate){var d=i.default.locals;e.hot.accept(23,function(n){i=t(23),function(e,n,t){if(!e&&n||e&&!n)return!1;var r;for(r in e)if((!t||"default"!==r)&&e[r]!==n[r])return!1;for(r in n)if(!(t&&"default"===r||e[r]))return!1;return!0}(d,i.default.locals,void 0)?(d=i.default.locals,c(i.default)):e.hot.invalidate()}.bind(this))}e.hot.dispose((function(){c()}));i.default.locals},318:function(e,n,t){"use strict";var r=t(63),o=t.n(r),i=t(24),a={insert:"head",singleton:!1},c=o()(i.default,a);if(!i.default.locals||e.hot.invalidate){var d=i.default.locals;e.hot.accept(24,function(n){i=t(24),function(e,n,t){if(!e&&n||e&&!n)return!1;var r;for(r in e)if((!t||"default"!==r)&&e[r]!==n[r])return!1;for(r in n)if(!(t&&"default"===r||e[r]))return!1;return!0}(d,i.default.locals,void 0)?(d=i.default.locals,c(i.default)):e.hot.invalidate()}.bind(this))}e.hot.dispose((function(){c()}));i.default.locals},63:function(e,n,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),a=[];function c(e){for(var n=-1,t=0;t<a.length;t++)if(a[t].identifier===e){n=t;break}return n}function d(e,n){for(var t={},r=[],o=0;o<e.length;o++){var i=e[o],d=n.base?i[0]+n.base:i[0],s=t[d]||0,l="".concat(d," ").concat(s);t[d]=s+1;var u=c(l),f={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(f)):a.push({identifier:l,updater:v(f,n),references:1}),r.push(l)}return r}function s(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var l,u=(l=[],function(e,n){return l[e]=n,l.filter(Boolean).join("\n")});function f(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function p(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var h=null,m=0;function v(e,n){var t,r,o;if(n.singleton){var i=m++;t=h||(h=s(n)),r=f.bind(null,t,i,!1),o=f.bind(null,t,i,!0)}else t=s(n),r=p.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=o());var t=d(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=c(t[r]);a[o].references--}for(var i=d(e,n),s=0;s<t.length;s++){var l=c(t[s]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}t=i}}}},64:function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);r&&o[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),n.push(d))}},n}}});