(()=>{"use strict";var t={216:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:true});const r=s(i(361));function arrayMove(t,e,i,s,r){for(let n=0;n<r;++n){i[n+s]=t[n+e];t[n+e]=void 0}}function pow2AtLeast(t){t=t>>>0;t=t-1;t=t|t>>1;t=t|t>>2;t=t|t>>4;t=t|t>>8;t=t|t>>16;return t+1}function getCapacity(t){return pow2AtLeast(Math.min(Math.max(16,t),1073741824))}class Deque{constructor(t){this._capacity=getCapacity(t);this._length=0;this._front=0;this.arr=[]}push(t){const e=this._length;this.checkCapacity(e+1);const i=this._front+e&this._capacity-1;this.arr[i]=t;this._length=e+1;return e+1}pop(){const t=this._length;if(t===0){return void 0}const e=this._front+t-1&this._capacity-1;const i=this.arr[e];this.arr[e]=void 0;this._length=t-1;return i}shift(){const t=this._length;if(t===0){return void 0}const e=this._front;const i=this.arr[e];this.arr[e]=void 0;this._front=e+1&this._capacity-1;this._length=t-1;return i}get length(){return this._length}checkCapacity(t){if(this._capacity<t){this.resizeTo(getCapacity(this._capacity*1.5+16))}}resizeTo(t){const e=this._capacity;this._capacity=t;const i=this._front;const s=this._length;if(i+s>e){const t=i+s&e-1;arrayMove(this.arr,0,this.arr,e,t)}}}class ReleaseEmitter extends r.default{}function isFn(t){return typeof t==="function"}function defaultInit(){return"1"}class Sema{constructor(t,{initFn:e=defaultInit,pauseFn:i,resumeFn:s,capacity:r=10}={}){if(isFn(i)!==isFn(s)){throw new Error("pauseFn and resumeFn must be both set for pausing")}this.nrTokens=t;this.free=new Deque(t);this.waiting=new Deque(r);this.releaseEmitter=new ReleaseEmitter;this.noTokens=e===defaultInit;this.pauseFn=i;this.resumeFn=s;this.paused=false;this.releaseEmitter.on("release",(t=>{const e=this.waiting.shift();if(e){e.resolve(t)}else{if(this.resumeFn&&this.paused){this.paused=false;this.resumeFn()}this.free.push(t)}}));for(let i=0;i<t;i++){this.free.push(e())}}async acquire(){let t=this.free.pop();if(t!==void 0){return t}return new Promise(((t,e)=>{if(this.pauseFn&&!this.paused){this.paused=true;this.pauseFn()}this.waiting.push({resolve:t,reject:e})}))}release(t){this.releaseEmitter.emit("release",this.noTokens?"1":t)}drain(){const t=new Array(this.nrTokens);for(let e=0;e<this.nrTokens;e++){t[e]=this.acquire()}return Promise.all(t)}nrWaiting(){return this.waiting.length}}e.Sema=Sema;function RateLimit(t,{timeUnit:e=1e3,uniformDistribution:i=false}={}){const s=new Sema(i?1:t);const r=i?e/t:e;return async function rl(){await s.acquire();setTimeout((()=>s.release()),r)}}e.RateLimit=RateLimit},361:t=>{t.exports=require("events")}};var e={};function __nccwpck_require__(i){var s=e[i];if(s!==undefined){return s.exports}var r=e[i]={exports:{}};var n=true;try{t[i].call(r.exports,r,r.exports,__nccwpck_require__);n=false}finally{if(n)delete e[i]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var i=__nccwpck_require__(216);module.exports=i})();