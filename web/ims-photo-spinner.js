/** * @license * MIT License * * Copyright (c) 2022 Jam-Do.com (alex.sova@pm.me). All rights reserved. * * Permission is hereby granted, free of charge, to any person obtaining a copy * of this software and associated documentation files (the "Software"), to deal * in the Software without restriction, including without limitation the rights * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell * copies of the Software, and to permit persons to whom the Software is * furnished to do so, subject to the following conditions: * * The above copyright notice and this permission notice shall be included in all * copies or substantial portions of the Software. * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE * SOFTWARE. */ var M=Object.defineProperty;var V=(s,t,e)=>t in s?M(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var p=(s,t,e)=>(V(s,typeof t!="symbol"?t+"":t,e),e);import{BaseComponent as E,html as h,css as r,UID as L}from"https://cdn.jsdelivr.net/npm/@symbiotejs/symbiote@2.0.0-alpha.16/core/index.js/+esm";var o=class extends E{};var C=class{constructor(){this.cach=[]}read(t,e,n=[],i){let l=e.length,d=n.length;t.length=l,t.fill(null,0,l);let z=d?20/l:0,A=d?80/l:100/l,m=0,H=0;n.forEach((w,g)=>{let c=new Image;c.src=w,this.cach.push(c),c.onload=()=>{t[g]||t.splice(g,1,c),m<100?m+=z:m=100,i&&i(m)}}),e.forEach((w,g)=>{let c=new Image;c.src=w,this.cach.push(c),c.onload=()=>{t.splice(g,1,c),H++,m<100&&(m+=A),H===l&&(m=100),i&&i(Math.floor(m))}})}kill(){this.cach.length&&this.cach.forEach(t=>{t.src="",t=null}),this.cach=[]}};var F=r` :host { position: relative; display: flex; justify-content: center; align-items: center; height: 100%; max-height: 100vh; width: 100%; max-width: 100vw; background-repeat: no-repeat; background-position: center center; background-size: contain; user-select: none; overflow: hidden; } .start-btn { position: absolute; height: 60px; width: 60px; box-sizing: border-box; top: 50%; left: 50%; margin-left: -30px; margin-top: -30px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.2s; box-shadow: 0 0 var(--gap-mid) rgba(0, 0, 0, 0.2); } .start-btn:hover { transform: scale(1.2); } :host([active]) .start-btn { opacity: 0; visibility: hidden; pointer-events: none; } :host(:not([active])) .active { opacity: 0; pointer-events: none; } canvas { box-sizing: border-box; transition: 0.1s; height: 100%; width: 100%; object-fit: contain; } .sensor { position: absolute; top: 0; left: 0; right: 0; bottom: 44px; box-sizing: border-box; } `,I=h`<canvas ref="canvas-el"></canvas><div class="sensor" ref="sensor-el"></div><div class="start-btn" ref="play-btn"><logo-com compact></logo-com></div><hmp-toolbar><hmp-button icon="play" ref="play-status-btn"></hmp-button><hmp-button class="active" icon="plus" ref="zoom-in-btn"></hmp-button><hmp-button class="active" icon="minus" ref="zoom-out-btn"></hmp-button><hmp-button class="active" icon="stop" ref="unload-btn"></hmp-button></hmp-toolbar><hmp-progress-bar ref="progress-bar"></hmp-progress-bar><hmp-info-bar ref="info-bar" ${{"@active":"infoActive"}}></hmp-info-bar>`;var u=class{static _getSupported(t){return t.find(e=>!!document[e]||!!document.createElement("div")[e])}static get _fsRequestName(){let t=["requestFullscreen","webkitRequestFullscreen","mozRequestFullScreen","msRequestFullscreen"];return this._getSupported(t)}static get _fsExitName(){let t=["exitFullscreen","webkitExitFullscreen","msExitFullscreen","mozCancelFullScreen"];return this._getSupported(t)}static enable(t){t[this._fsRequestName]()}static disable(){document[this._fsExitName]()}static get current(){return document[this._fsIsName]}static init(){this._initialized||(this._fsRequestName.includes("webkit")?(this._fsCallbackName="onwebkitfullscreenchange",this._fsIsName="webkitIsFullScreen"):this._fsRequestName.includes("moz")?(this._fsCallbackName="onmozfullscreenchange",this._fsIsName="mozFullScreen"):this._fsRequestName.includes("ms")?(this._fsCallbackName="MSFullscreenChange",this._fsIsName="webkitIsFullScreen"):(this._fsCallbackName="onfullscreenchange",this._fsIsName="fullscreen"),this._initialized=!0)}};var k="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",a=class extends o{constructor(){super(...arguments);p(this,"init$",{icon:"","+path":()=>a.iconSet[this.$.icon]||k})}static addIcons(t){Object.assign(a.iconSet,t)}};a.iconSet=Object.create(null);a.rootStyles=r` ims-icon { --size: 1.2em; display: inline-flex; height: var(--size); width: var(--size); min-width: var(--size); } svg { height: 100%; width: 100%; } ims-icon[morph] path { transition: var(--transition, 0.2s); } `;a.template=h`<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path ${{"@d":"+path"}} style="fill: currentColor"></path></svg>`;a.bindAttributes({icon:"icon"});a.reg("ims-icon");var S={play:"M8,5.14V19.14L19,12.14L8,5.14Z",pause:"M14,19H18V5H14M6,19H10V5H6V19Z",stop:"M18,18H6V6H18V18Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",minus:"M19,13H5V11H19V13Z",info:"M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z",share:"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z",fullscreen:"M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z","fullscreen-exit":"M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z","chevron-up":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",facebook:"M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z",twitter:"M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z",telegram:"M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"};var _=class extends o{};_.rootStyles=r` hmp-button { -webkit-tap-highlight-color: transparent; display: inline-flex; justify-content: center; align-items: center; height: 38px; width: 38px; border-radius: 19px; box-sizing: border-box; border: 2px solid currentColor; cursor: pointer; opacity: 0.6; transition: 0.2s; font-size: 20px; } hmp-button:hover { opacity: 1; } `;_.template=h`<ims-icon ${{"@icon":"icon"}}></ims-icon>`;_.bindAttributes({icon:"icon"});_.reg("hmp-button");var v=class extends o{constructor(){super(...arguments);p(this,"init$",{onClose:()=>{this.$["^infoActive"]=!1}})}};v.shadowStyles=r` :host { display: block; padding: 10px; position: absolute; top: 0; left: 0; right: 0; min-height: 50px; transform: translateY(-100%); transition: 0.2s; opacity: 0.2; text-align: left; box-sizing: border-box; max-height: 100%; overflow-y: auto; } :host([active]) { transform: translateY(0); opacity: 0.8; } :host(:hover) { opacity: 1 !important; } .pp-info-bar_close-btn { position: absolute; top: 4px; right: 4px; } .pp-info-bar_name { font-size: 1.2em; padding-right: 46px; } .pp-info-bar_description { padding-top: 4px; padding-bottom: 4px; padding-right: 46px; } `;v.template=h`<div class="pp-info-bar_name"><slot name="name"></slot></div><div class="pp-info-bar_description"><slot name="description"></slot></div><hmp-button ${{onclick:"onClose"}} class="pp-info-bar_close-btn" icon="chevron-up"></hmp-button>`;v.reg("hmp-info-bar");var y=class extends o{set progress(t){this.style.width=t+"%",t>=98?(this.setAttribute("finished",""),this.addEventListener("transitionend",()=>{this.style.display="none"})):t<=3&&(this.removeAttribute("finished"),this.style.display="block")}};y.rootStyles=r` hmp-progress-bar { position: absolute; border-top: 2px solid currentColor; bottom: 48px; left: 0; transition: 0.4s; pointer-events: none; } hmp-progress-bar[finished] { opacity: 0; } `;y.reg("hmp-progress-bar");var x={ENABLED:"fullscreen-exit",DISABLED:"fullscreen"},b=class extends o{constructor(){super(...arguments);p(this,"init$",{fsIcon:x.DISABLED,onInfo:()=>{this.$["^infoActive"]=!this.$["^infoActive"]},onFullscreen:()=>{this.$["^fullscreen"]=!this.$["^fullscreen"]}})}initCallback(){this.sub("^fullscreen",t=>{this.$.fsIcon=t?x.ENABLED:x.DISABLED})}};b.shadowStyles=r` :host { --gap: 4px; position: absolute; display: flex; justify-content: space-between; min-height: 40px; width: 100%; bottom: 0; left: 0; padding: var(--gap); box-sizing: border-box; } .pp-toolbar_block { position: relative; display: grid; grid-gap: var(--gap); grid-auto-flow: column; } `;b.template=h`<div class="pp-toolbar_block"><slot></slot></div><div class="pp-toolbar_block"><hmp-button icon="info" ${{onclick:"onInfo"}}></hmp-button><hmp-button ${{onclick:"onFullscreen","@icon":"fsIcon"}}></hmp-button></div>`;b.reg("hmp-toolbar");a.addIcons(S);var f=class extends o{constructor(){super();p(this,"init$",{data:"",infoActive:!1,fullscreen:!1});this._imgArray=[],this._imageReader=new C,this._isEdge=navigator.appVersion.indexOf("Edge")!==-1}get cfg(){return this.config}_setConfig(t){!t||(this.config||(this.config=t),this._imgHeight=t.imgHeight||480,this._imgWidth=t.imgWidth||640,this._imageProportion=this._imgWidth/this._imgHeight,this.style.backgroundColor=t.theme.bgColor,this.ref["info-bar"].style.backgroundColor=t.theme.bgColor,this.style.setProperty("--color",t.theme.color),this.style.setProperty("--bg-color",t.theme.bgColor),this.ref["info-bar"].style.color=t.theme.color,this.ref["info-bar"].innerHTML=`<span slot="name">${t.title||"Unnamed"}</span><span slot="description">${t.description||"No description..."}</span>`.trim(),this.ref["canvas-el"].height=this._imgHeight,this.ref["canvas-el"].width=this._imgWidth,this.ref["canvas-el"].style.maxHeight=this._imgHeight+"px",this.ref["canvas-el"].style.maxWidth=this._imgWidth+"px",this._ctx2d=this.ref["canvas-el"].getContext("2d"),this.currentFrame=t.startFrame&&t.startFrame-1||0,this._directionStep=t.invertDirection?-1:1,t.showPlaceholder?this._showPreview():(this._loadContents(t,!0),this.setAttribute("active","")))}set _loadProgress(t){this._progressBar.progress=t}_loadContents(t,e=!1){if(this._imgLoadingInitialized&&!this.preview&&!e)return;window.localStorage.setItem("HMP_CURRENT_PLAY",this._localUid),window.dispatchEvent(new CustomEvent("hmp-current-play",{detail:{uid:this._localUid}})),this._imgLoadingInitialized=!0,this._drawPreviewImage();let n=i=>{this._loadProgress=i,i===100&&(t.autoplay?this._play():this.currentFrame=this._currentFrame+1)};this._imageReader.kill(),this._imageReader.read(this._imgArray,t.src,t.srcPreviews,n),this.preview=!1}set currentFrame(t){if(t===this._currentFrame)return;this._currentFrame=t;let e=this._imgArray[t];e?(this._ctx2d.filter="none",this.removeAttribute("loading"),this._ctx2d.drawImage(e,0,0,this._imgWidth,this._imgHeight),this._lastLoadedFrame=e):(this.setAttribute("loading",""),this._lastLoadedFrame&&(this._ctx2d.filter="blur(10px)",this._ctx2d.drawImage(this._lastLoadedFrame,0,0,this._imgWidth,this._imgHeight)))}get currentFrame(){return this._currentFrame}_drawPreviewImage(){var n,i,l,d;let t=((n=this.cfg)==null?void 0:n.placeholderUrl)||((l=this.cfg)==null?void 0:l.src[(i=this.cfg)==null?void 0:i.startFrame])||((d=this.cfg)==null?void 0:d.src[0]);if(!t)return;let e=document.createElement("img");e.src=t,e.onload=()=>{this._ctx2d.drawImage(e,0,0,this._imgWidth,this._imgHeight)}}_showPreview(){this.preview=!0,this._zoomOut(),this.kill(),this._progressBar&&(this._loadProgress=0),this.removeAttribute("active"),this._drawPreviewImage()}set _playStatusFlag(t){this._psFlagLoc!==t&&(this._psFlagLoc=t,t?(this._playStatusBtn.$.icon="pause",this.setAttribute("active","")):this._playStatusBtn.$.icon="play")}get _playStatusFlag(){return this._psFlagLoc}_play(){this._playStatusFlag=!0,this.preview&&this._loadContents(this.cfg),this._playInterval&&window.clearInterval(this._playInterval),this._playInterval=window.setInterval(()=>{this.currentFrame<this._imgArray.length-1&&this.currentFrame>0?this.currentFrame=this.currentFrame+this._directionStep:this.currentFrame===0?this.currentFrame=this._directionStep<0?this._imgArray.length-1:this.currentFrame+1:this.currentFrame===this._imgArray.length-1&&(this.currentFrame=this._directionStep<0?this.currentFrame-1:0)},this.cfg.speed)}_togglePlay(t){t&&t.preventDefault(),this._playStatusFlag?this._pause():this._play()}_pause(){this._playStatusFlag=!1,clearInterval(this._playInterval)}_setCanvasTransforms(){window.requestAnimationFrame(()=>{this.ref["canvas-el"].style.transform=`scale(${this._zoomLevel}) translate(${this._panX}px, ${this._panY}px)`})}_zoomStepIn(){this._zoomLevel||(this._zoomLevel=1),this._zoomLevel+=.2,this._panX=0,this._panY=0,this._rect||(this._rect=this.getBoundingClientRect()),this._setCanvasTransforms(),this._zoomPanHandler||(this._zoomPanHandler=t=>{this._panX=Math.round((this._rect.left+this._rect.width/2-t.clientX)/(10/this._zoomLevel)),this._panY=Math.round((this._rect.top+this._rect.height/2-t.clientY)/(10/this._zoomLevel)),this._setCanvasTransforms()}),this.addEventListener("mousemove",this._zoomPanHandler)}_zoomOut(){this._zoomLevel=1,this._panX=0,this._panY=0,this.ref["canvas-el"].style.transform="none",this.removeEventListener("mousemove",this._zoomPanHandler)}initCallback(){u.init(),this.sub("fullscreen",t=>{t?u.enable(this):u.disable()},!1),this.sub("data",t=>{!t||window.fetch(t).then(e=>{e.text().then(n=>{this._setConfig(JSON.parse(n))})})}),this._onResize=()=>{!this._isEdge||(this._rect=this.getBoundingClientRect(),this._rect.width&&this._rect.height?(this._rectProportion=this._rect.width/this._rect.height,this._rectProportion>this._imageProportion?(this.ref["canvas-el"].style.height=this._rect.height+"px",this.ref["canvas-el"].style.width="auto"):(this.ref["canvas-el"].style.width=this._rect.width+"px",this.ref["canvas-el"].style.height="auto")):(this.ref["canvas-el"].style.height="100%",this.ref["canvas-el"].style.width="auto"))},this._localUid=L.generate(),this.defineAccessor("config",t=>{this._setConfig(t)}),this.ref["play-btn"].onclick=()=>{this._loadContents(this.cfg),this.setAttribute("active","")},this._progressBar=this.ref["progress-bar"],this._playStatusBtn=this.ref["play-status-btn"],this._playStatusBtn.onclick=()=>{this._togglePlay()},this._zoomInBtn=this.ref["zoom-in-btn"],this._zoomOutBtn=this.ref["zoom-out-btn"],this._zoomInBtn.onclick=()=>{this._zoomStepIn()},this._zoomOutBtn.onclick=()=>{this._zoomOut()},this._unloadBtn=this.ref["unload-btn"],this._unloadBtn.onclick=()=>{this._showPreview(),this._playStatusFlag=!1},this.infoBar=this.ref["info-bar"],this._moveHandler=t=>{t.touches&&(t.preventDefault(),t.movementX=t.touches[0].clientX-(this._touchStartX||t.touches[0].clientX),t.movementY=t.touches[0].clientY-(this._touchStartY||t.touches[0].clientY),this._touchStartX=t.touches[0].clientX,this._touchStartY=t.touches[0].clientY),this._collectedMovement+=t.movementX},this._moveEndHandler=t=>{window.onmousemove=null,window.onmouseup=null,window.removeEventListener("touchmove",this._moveHandler),window.removeEventListener("touchend",this._moveEndHandler),window.removeEventListener("touchcancel",this._moveEndHandler),this._moveInProgress=!1,this._collectedMovement=(this._collectedMovement+this._lastCollectedMovement)/2,this._innertionK=.92},this._moveStartHandler=t=>{if(this.preview)return;this._pause(),this._moveInProgress=!0,t.touches&&(this._touchStartX=t.touches[0].clientX,this._touchStartY=t.touches[0].clientY),this._moveFrame=this.currentFrame;let e=this.getBoundingClientRect();this._componentWidth=e.width,window.onmousemove=this._moveHandler,window.onmouseup=this._moveEndHandler,window.addEventListener("touchmove",this._moveHandler,{passive:!1}),window.addEventListener("touchend",this._moveEndHandler),window.addEventListener("touchcancel",this._moveEndHandler),this._collectedMovement=0,this._intervalInit()},this._intervalInit=()=>{this._moveInterval=setInterval(()=>{let t=this._componentWidth/(this._componentWidth/500),e=this._collectedMovement/t,n=Math.round((this._imgArray.length-1)*e),i=this._directionStep>0?this.currentFrame+n:this.currentFrame-n;i>this._imgArray.length-1&&(i=Math.abs(i-(this._imgArray.length-1))),i<0&&(i=this._imgArray.length-1-Math.abs(i)),this.currentFrame=i>-1&&i<this._imgArray.length?i:0,this._moveInProgress?(this._lastCollectedMovement=this._collectedMovement,this._collectedMovement=0):Math.abs(this._collectedMovement)<.6?clearInterval(this._moveInterval):this._collectedMovement=this._collectedMovement*this._innertionK},this.cfg.speed/2)},this.ref["sensor-el"].onmousedown=this._moveStartHandler,this.ref["sensor-el"].addEventListener("touchstart",this._moveStartHandler),window.onkeyup=t=>{t.keyCode===32&&(this._togglePlay(t),this.setAttribute("active",""))},window.addEventListener("storage",t=>{t.key==="HMP_CURRENT_PLAY"&&window.localStorage.getItem("HMP_CURRENT_PLAY")!==this._localUid&&(this._showPreview(),this._playStatusFlag=!1)}),window.addEventListener("hmp-current-play",t=>{t.detail.uid!==this._localUid&&(this._showPreview(),this._playStatusFlag=!1)}),window.addEventListener("resize",this._onResize),window.addEventListener("fullscreen-changed",()=>{window.setTimeout(()=>{this._onResize()},220)}),this._onResize()}kill(){this._imgLoadingInitialized=!1,this._imageReader.kill(),this._playInterval&&window.clearInterval(this._playInterval),this._imgArray.forEach(t=>{t&&(t.src=""),t=null}),this._imgArray=[]}destroyCallback(){this.kill()}};f.bindAttributes({data:"data"});f.shadowStyles=F;f.template=I;f.reg("ims-photo-spinner");export{_ as HmpButton,v as HmpInfoBar,y as HmpProgressBar,b as HmpToolbar,a as ImsIcon,f as PhotoSpinner};