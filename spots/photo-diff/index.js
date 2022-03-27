import { BaseComponent } from '../../submodules/symbiote/core/BaseComponent.js';

export class PhotoDiff extends BaseComponent {

  renderShadow = true;

  constructor() {
    super();
    this._ctx2d = this['canvas-el'].getContext('2d');
    this._images = [];
  }

  /**
   *
   * @param {Array<string>} srcArr
   */
  _loadImages(srcArr) {
    srcArr.forEach((imgUrl) => {
      let img = new Image();
      img.src = imgUrl;
      this._images.push(img);
      img.onload = () => {
        if (srcArr.length === this._images.length) {
          window.setTimeout(() => {
            this._start();
          });
          this._imgWidth = this._images[0].width;
        }
      };
    });
  }

  /**
   * @param {*} cfg
   */
  set config(cfg) {
    this._loadImages(cfg.src);
    this.style.setProperty('--color', cfg.theme.color);
    this.style.setProperty('--bg-color', cfg.theme.bgColor);
  }

  _mMoveHandler(e) {
    let rect = this.getBoundingClientRect();
    let imgLeft = rect.left + (rect.width - this._imgWidth) / 2;
    let mLeft = e.clientX - imgLeft;
    let k = 1 - mLeft / this._imgWidth;
    this._draw(0, k);
  }

  _mUpHandler(e) {
    this.removeEventListener('mousemove', this._mMoveHandler);
  }

  _mDownHandler(e) {
    this.addEventListener('mousemove', this._mMoveHandler);
    this.addEventListener('mouseup', this._mUpHandler);
  }

  _start() {
    this._rect = this.getBoundingClientRect();
    this._draw(0, 0);
    this.addEventListener('mousedown', this._mDownHandler);
  }

  _draw(idx, lk) {
    let img1 = this._images[idx];
    let img2 = this._images[idx + 1];
    let w = img1.width;
    let h = img1.height;
    this['canvas-el'].width = w;
    this['canvas-el'].height = h;
    this._ctx2d.drawImage(img1, 0, 0, w, h);

    let gap = w * lk;

    let sx = w - gap;
    let sy = 0;
    let sWidth = img2.width - sx;
    let sHeight = h;
    let dx = sx;
    let dy = 0;
    let dWidth = img2.width - sx;
    let dHeight = h;

    this._ctx2d.drawImage(img2, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // this.style.backgroundImage = `url(${this['canvas-el'].toDataURL()})`;
  }

}

PhotoDiff.template = /*html*/ `
<style>
  :host {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color, #000);
    background-color: var(--bg-color, #fff);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: hidden;
    box-sizing: border-box;
  }
  #canvas-el {
    object-fit: contain;
    pointer-events: none;
  }
</style>
<canvas id="canvas-el"></canvas>
`;
PhotoDiff.reg('ims-photo-diff');

