import { BaseComponent } from '../../submodules/symbiote/core/BaseComponent.js';
import { UID } from '../../submodules/symbiote/utils/UID.js';
import { ImageReader } from '../../lib/image-reader.js';
import { } from '../../lib/hmp-toolbar-el.js';
import { } from '../../lib/hmp-progress-bar-el.js';
import { } from '../../lib/hmp-info-bar-el.js';

export class PpSpinner extends BaseComponent {

  renderShadow = true;

  constructor() {
    super();
    this.parent = null;
    this._imgArray = [];
    this._imageReader = new ImageReader();
    this._isEdge = navigator.appVersion.indexOf('Edge') !== -1;
  }

  get cfg() {
    return this['config'];
  }

  _setConfig(cfg) {
    if (!cfg) {
      console.log(cfg);
      return;
    }
    this._imgHeight = cfg.imgHeight || 480;
    this._imgWidth = cfg.imgWidth || 640;

    this._imageProportion = this._imgWidth / this._imgHeight;

    this.style.backgroundColor = cfg.theme.bgColor;
    this.ref['info-bar'].style.backgroundColor = cfg.theme.bgColor;
    this.style.setProperty('--color', cfg.theme.color);
    this.style.setProperty('--bg-color', cfg.theme.bgColor);
    this.ref['info-bar'].style.color = cfg.theme.color;
    this.ref['info-bar'].innerHTML = /*html*/`
      <span slot="name">${cfg.title || 'Unnamed'}</span>
      <span slot="description">${cfg.description || 'No description...'}</span>
    `.trim();

    this.ref['canvas-el'].height = this._imgHeight;
    this.ref['canvas-el'].width = this._imgWidth;
    this.ref['canvas-el'].style.maxHeight = this._imgHeight + 'px';
    this.ref['canvas-el'].style.maxWidth = this._imgWidth + 'px';

    this._ctx2d = this.ref['canvas-el'].getContext('2d');

    this.currentFrame = (cfg.startFrame && cfg.startFrame - 1) || 0;
    this._directionStep = cfg.invertDirection ? -1 : 1;

    if (!cfg.showPlaceholder) {
      this._loadContents(cfg);
      this.setAttribute('active', '');
    } else {
      this._showPreview();
    }
  }

  set _loadProgress(val) {
    this._progressBar.progress = val;
  }

  _loadContents(cfg) {
    if (this._imgLoadingInitialized && !this.preview) {
      return;
    }
    // TODO: switch to firestore id
    window.localStorage.setItem('HMP_CURRENT_PLAY', this._localUid);
    window.dispatchEvent(new CustomEvent('hmp-current-play', {
      detail: {
        uid: this._localUid,
      },
    }));
    this._imgLoadingInitialized = true;
    this._drawPreviewImage();
    let progressHandler = (val) => {
      this._loadProgress = val;
      if (val === 100) {
        if (cfg.autoplay) {
          this._play();
        } else {
          this.currentFrame = this._currentFrame + 1;
        }
      }
    };
    this._imageReader.kill();
    this._imageReader.read(this._imgArray, cfg.src, cfg.srcPreviews, progressHandler);
    this.preview = false;
  }

  set currentFrame(num) {
    if (num === this._currentFrame) {
      return;
    }
    this._currentFrame = num;
    let img = this._imgArray[ num ];
    if (img) {
      this._ctx2d.filter = 'none';
      this.removeAttribute('loading');
      this._ctx2d.drawImage(img, 0, 0, this._imgWidth, this._imgHeight);
      this._lastLoadedFrame = img;
    } else {
      this.setAttribute('loading', '');
      if (this._lastLoadedFrame) {
        this._ctx2d.filter = 'blur(10px)';
        this._ctx2d.drawImage(this._lastLoadedFrame, 0, 0, this._imgWidth, this._imgHeight);
      }
    }
  }

  get currentFrame() {
    return this._currentFrame;
  }

  _drawPreviewImage() {
    let src = this.cfg.placeholderUrl || this.cfg.src[ this.cfg.startFrame ] || this.cfg.src[ 0 ];
    if (!src) {
      return;
    }
    let previewImage = document.createElement('img');
    previewImage.src = src;
    previewImage.onload = () => {
      this._ctx2d.drawImage(previewImage, 0, 0, this._imgWidth, this._imgHeight);
    };
  }

  _showPreview() {
    this.preview = true;
    this._zoomOut();
    this.kill();
    this._progressBar && (this._loadProgress = 0);
    this.removeAttribute('active');
    this._drawPreviewImage();
  }

  set _playStatusFlag(val) {
    if (this._psFlagLoc === val) {
      return;
    }
    this._psFlagLoc = val;
    if (val) {
      this._playStatusBtn.setAttribute('icon', 'pause');
      this.setAttribute('active', '');
    } else {
      this._playStatusBtn.setAttribute('icon', 'play');
    }
  }

  get _playStatusFlag() {
    return this._psFlagLoc;
  }

  _play() {
    this._playStatusFlag = true;
    if (this.preview) {
      this._loadContents(this.cfg);
    }
    if (this._playInterval) {
      window.clearInterval(this._playInterval);
    }
    this._playInterval = window.setInterval(() => {
      if (this.currentFrame < this._imgArray.length - 1 && this.currentFrame > 0) {
        this.currentFrame = this.currentFrame + this._directionStep;
      } else if (this.currentFrame === 0) {
        this.currentFrame = this._directionStep < 0 ? this._imgArray.length - 1 : this.currentFrame + 1;
      } else if (this.currentFrame === this._imgArray.length - 1) {
        this.currentFrame = this._directionStep < 0 ? this.currentFrame - 1 : 0;
      }
    }, this.cfg.speed);
  }

  _togglePlay(e) {
    if (e) {
      e.preventDefault();
    }
    if (this._playStatusFlag) {
      this._pause();
    } else {
      this._play();
    }
  }

  _pause() {
    this._playStatusFlag = false;
    clearInterval(this._playInterval);
  }

  _setCanvasTransforms() {
    window.requestAnimationFrame(() => {
      this.ref['canvas-el'].style.transform = `scale(${this._zoomLevel}) translate(${this._panX}px, ${this._panY}px)`;
    });
  }

  _zoomStepIn() {
    if (!this._zoomLevel) {
      this._zoomLevel = 1;
    }
    this._zoomLevel += 0.2;
    this._panX = 0;
    this._panY = 0;
    if (!this._rect) {
      this._rect = this.getBoundingClientRect();
    }
    this._setCanvasTransforms();
    if (!this._zoomPanHandler) {
      this._zoomPanHandler = (e) => {
        this._panX = Math.round((this._rect.left + (this._rect.width / 2) - e.clientX) / (10 / this._zoomLevel));
        this._panY = Math.round((this._rect.top + (this._rect.height / 2) - e.clientY) / (10 / this._zoomLevel));
        this._setCanvasTransforms();
      };
    }
    this.addEventListener('mousemove', this._zoomPanHandler);
  }

  _zoomOut() {
    this._zoomLevel = 1;
    this._panX = 0;
    this._panY = 0;
    this.ref['canvas-el'].style.transform = 'none';
    this.removeEventListener('mousemove', this._zoomPanHandler);
  }

  initCallback() {
    this._onResize = () => {
      if (!this._isEdge) {
        return;
      }
      this._rect = this.getBoundingClientRect();
      if (this._rect.width && this._rect.height) {
        this._rectProportion = this._rect.width / this._rect.height;
        if (this._rectProportion > this._imageProportion) {
          this.ref['canvas-el'].style.height = this._rect.height + 'px';
          this.ref['canvas-el'].style.width = 'auto';
        } else {
          this.ref['canvas-el'].style.width = this._rect.width + 'px';
          this.ref['canvas-el'].style.height = 'auto';
        }
      } else {
        this.ref['canvas-el'].style.height = '100%';
        this.ref['canvas-el'].style.width = 'auto';
      }
    }

    this._localUid = UID.generate();

    this.defineAccessor('config', (cfg) => {
      this._setConfig(cfg);
    });

    this.ref['play-btn'].onclick = () => {
      this._loadContents(this.cfg);
      this.setAttribute('active', '');
    };

    this._progressBar = this.ref['progress-bar' ];
    this._playStatusBtn = this.ref['play-status-btn' ];
    this._playStatusBtn.onclick = () => {
      this._togglePlay();
    };

    this._zoomInBtn = this.ref['zoom-in-btn' ];
    this._zoomOutBtn = this.ref['zoom-out-btn' ];

    this._zoomInBtn.onclick = () => {
      this._zoomStepIn();
    };

    this._zoomOutBtn.onclick = () => {
      this._zoomOut();
    };

    this._unloadBtn = this.ref['unload-btn' ];
    this._unloadBtn.onclick = () => {
      this._showPreview();
      this._playStatusFlag = false;
    };

    this.infoBar = this.ref['info-bar' ];

    this._moveHandler = (e) => {
      if (e.touches) {
        e.preventDefault();
        e.movementX = e.touches[ 0 ].clientX - (this._touchStartX || e.touches[ 0 ].clientX);
        e.movementY = e.touches[ 0 ].clientY - (this._touchStartY || e.touches[ 0 ].clientY);
        this._touchStartX = e.touches[ 0 ].clientX;
        this._touchStartY = e.touches[ 0 ].clientY;
      }
      this._collectedMovement += e.movementX;
    };

    this._moveEndHandler = (e) => {
      window.onmousemove = null;
      window.onmouseup = null;
      window.removeEventListener('touchmove', this._moveHandler);
      window.removeEventListener('touchend', this._moveEndHandler);
      window.removeEventListener('touchcancel', this._moveEndHandler);
      this._moveInProgress = false;
      this._collectedMovement = (this._collectedMovement + this._lastCollectedMovement) / 2;
      this._innertionK = 0.92;
    };

    this._moveStartHandler = (e) => {
      if (this.preview) {
        return;
      }
      this._pause();
      this._moveInProgress = true;
      if (e.touches) {
        this._touchStartX = e.touches[ 0 ].clientX;
        this._touchStartY = e.touches[ 0 ].clientY;
      }
      this._moveFrame = this.currentFrame;
      let rect = this.getBoundingClientRect();
      this._componentWidth = rect.width;
      window.onmousemove = this._moveHandler;
      window.onmouseup = this._moveEndHandler;

      window.addEventListener('touchmove', this._moveHandler, { passive: false });
      window.addEventListener('touchend', this._moveEndHandler);
      window.addEventListener('touchcancel', this._moveEndHandler);

      this._collectedMovement = 0;

      this._intervalInit();
    };

    this._intervalInit = () => {
      this._moveInterval = setInterval(() => {
        let sizeFactor = this._componentWidth / (this._componentWidth / 500);
        let movementProportion = this._collectedMovement / sizeFactor;
        let frameShift = Math.round((this._imgArray.length - 1) * movementProportion);
        let frame = this._directionStep > 0 ? this.currentFrame + frameShift : this.currentFrame - frameShift;
        if (frame > this._imgArray.length - 1) {
          frame = Math.abs(frame - (this._imgArray.length - 1));
        } if (frame < 0) {
          frame = this._imgArray.length - 1 - Math.abs(frame);
        }
        this.currentFrame = frame > -1 && frame < this._imgArray.length ? frame : 0;
        if (this._moveInProgress) {
          this._lastCollectedMovement = this._collectedMovement;
          this._collectedMovement = 0;
        } else {
          if (Math.abs(this._collectedMovement) < 0.6) {
            clearInterval(this._moveInterval);
          } else {
            this._collectedMovement = this._collectedMovement * this._innertionK;
          }
        }
      }, this.cfg.speed / 2);
    };

    this.ref['sensor-el'].onmousedown = this._moveStartHandler;
    this.ref['sensor-el'].addEventListener('touchstart', this._moveStartHandler);

    window.onkeyup = (e) => {
      if (e.keyCode === 32) {
        this._togglePlay(e);
        this.setAttribute('active', '');
      }
    };

    window.addEventListener('storage', (e) => {
      if (e.key === 'HMP_CURRENT_PLAY' && window.localStorage.getItem('HMP_CURRENT_PLAY') !== this._localUid) {
        this._showPreview();
        this._playStatusFlag = false;
      }
    });

    window.addEventListener('hmp-current-play', (e) => {
      if (e['detail'].uid !== this._localUid) {
        this._showPreview();
        this._playStatusFlag = false;
      }
    });

    window.addEventListener('resize', this._onResize);
    window.addEventListener('fullscreen-changed', () => {
      window.setTimeout(() => {
        this._onResize();
      }, 220);
    });

    this._onResize();
  }

  kill() {
    this._imgLoadingInitialized = false;
    this._imageReader.kill();
    this._playInterval && window.clearInterval(this._playInterval);
    this._imgArray.forEach((img) => {
      img && (img.src = '');
      img = null;
    });
    this._imgArray = [];
  }

  disconnectedCallback() {
    this.kill();
  }
}

PpSpinner.template = /*html*/ `
<style>
  :host {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: 100vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    user-select: none;
    overflow: hidden;
  }
  .start-btn {
    position: absolute;
    height: 60px;
    width: 60px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    box-shadow: 0 0 var(--gap-mid) rgba(0, 0, 0, 0.2);
  }
  .start-btn:hover {
    transform: scale(1.2);
  }
  :host([active]) .start-btn {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  :host(:not([active])) .active {
    opacity: 0;
    pointer-events: none;
  }
  #canvas-el {
    box-sizing: border-box;
    transition: 0.1s;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .sensor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 44px;
    box-sizing: border-box;
  }
</style>
<canvas ref="canvas-el"></canvas>
<div class="sensor" ref="sensor-el"></div>
<div class="start-btn" ref="play-btn">
  <logo-com compact></logo-com>
</div>
<hmp-toolbar-el>
  <hmp-button-el icon="play" ref="play-status-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="plus" ref="zoom-in-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="minus" ref="zoom-out-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="stop" ref="unload-btn"></hmp-button-el>
</hmp-toolbar-el>
<hmp-progress-bar-el ref="progress-bar"></hmp-progress-bar-el>
<hmp-info-bar-el ref="info-bar"></hmp-info-bar-el>
`;
PpSpinner.reg('hmp-spinner');

