(()=>{"use strict";var e={170:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ContentType=void 0;class r{constructor(e){this.value=e}equals(e){return e.value===this.value}static File(){return new r("File")}isFile(){return this.equals(r.File())}static Directory(){return new r("Directory")}isDirectory(){return this.equals(r.Directory())}static fromString(e){return console.assert([r.File().value,r.Directory().value].includes(e)),new r(e)}}t.ContentType=r}},t={};function r(i){var n=t[i];if(void 0!==n)return n.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,r),o.exports}(()=>{const e=r(170);document.querySelectorAll(".js-navigation-item").forEach((t=>{let r=t.children[0];if(r instanceof HTMLDivElement){let t=r.children[0],i=e.ContentType.fromString(t.getAttribute("aria-label"));r.onclick=function(e){i.isDirectory()&&console.log(i)}}}))})()})();