import {UID} from '../submodules/symbiote/utils/UID.js';
import {HmPlayer} from '../hm-player.js';

export class HmpStateSchema {
  constructor() {
    this.fullscreen = false;
    this.infoActive = false;
    this.shareActive = false;
  }
}

/**
 * @typedef StateProp
 * @type {'fullscreen' | 'infoActive' | 'shareActive'}
 */

export class HmpStateDescriptor {
  /**
   * @param {Object} src
   * @param {unknown} src.hmpElement
   */
  constructor(src) {
    this.uid = UID.generate();
    this.hmpElement = src.hmpElement;
    this.schema = new HmpStateSchema();
    /** @type {Object.<String, Array<Function>>} */
    this.callbackMap = Object.create(null);
  }

  /**
   *
   * @param {StateProp} prop
   */
  read(prop) {
    return this.schema[prop];
  }

  /**
   *
   * @param {StateProp} prop
   * @param {*} val
   */
  pub(prop, val) {
    this.schema[prop] = val;
    this.callbackMap[prop].forEach((callback) => {
      callback(this.schema[prop]);
    });
  }

  /**
   *
   * @param {StateProp} prop
   * @param {Function} callback
   */
  sub(prop, callback) {
    if (!this.callbackMap[prop]) {
      this.callbackMap[prop] = [];
    }
    this.callbackMap[prop].push(callback);
  }

  remove() {
    delete HmpState[this.uid];
  }

}

export class HmpState {

  static get key() {
    return '__HMP_STATE__';
  }

  /**
   * @template {import('../submodules/symbiote/core/BaseComponent.js').BaseComponent} T
   * @param {T} hmpInstance
   */
  static register(hmpInstance) {
    let state = new HmpStateDescriptor({
      hmpElement: hmpInstance,
    });
    HmpState.store[state.uid] = state;
    return state;
  }

  /**
   *
   * @param {import('../submodules/symbiote/core/BaseComponent.js').BaseComponent} com
   * @returns {HmpStateDescriptor}
   */
  static findStateFor(com) {
    let el = com;
    while (el && !el[this.key]) {
      // @ts-ignore
      el = el.parentNode || el.parentElement || el.host;
    }
    return el[this.key];
  }

}

HmpState.store = Object.create(null);
