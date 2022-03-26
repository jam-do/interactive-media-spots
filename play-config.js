export const INTERACTION_TYPE = Object.freeze({
  SPINNER: 'spinner',
  COMPARE: 'compare',
  PANORAMA: 'panorama',
  SLIDESHOW: 'slideshow',
  _3D: '3d',
});

export class PlayConfig {
  /**
   * 
   * @param {Object} src 
   */
  constructor(src = {}) {
    this.type = INTERACTION_TYPE.SPINNER;
    this.title = 'Unnamed';
    this.description = 'No description...';
    this.showPlaceholder = true;
    this.placeholderUrl = '';
    this.autoplay = false;
    this.owner = null;
    this.invertDirection = false;
    this.imgHeight = null;
    this.imgWidth = null;
    this.startFrame = 1;
    this.isCycled = true;
    this.logoUrl = '';
    this.motionBlur = false;
    this.speed = 50;
    this.src = [];
    this.srcFullsize = [];
    this.srcPreviews = [];

    this.theme = {
      color: '#000',
      bgColor: '#fff',
    };

    this.details = {};

    this.viewIn = {
      showcase: false,
      portfolio: false,
      feed: false,
    }

    this.approved = false;

    this.customBtn = {
      show: false,
      link: '',
      text: 'Buy',
      icon: 'shopping-cart',
    };
    
    this.created = Date.now();

    for (let fldName in this) {
      if (src.hasOwnProperty(fldName)) {
        this[fldName] = src[fldName];
      }
    }
    
  }
}
