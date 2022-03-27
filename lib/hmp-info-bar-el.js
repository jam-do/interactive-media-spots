import {BaseComponent} from '../submodules/symbiote/core/BaseComponent.js';
import {HmpState} from './ims-state.js';
import { } from './hmp-button-el.js';

export class HmpInfoBarEl extends BaseComponent {

  renderShadow = true;

  init$ = {
    onClose: () => {
      this.gState.pub('infoActive', false);
    }
  }

  constructor() {
    super();
    this.gState = HmpState.findStateFor(this);

    this.gState.sub('infoActive', (val) => {
      if (val) {
        this.setAttribute('active', '');
      } else {
        this.removeAttribute('active');
      }
    });
  }

}

HmpInfoBarEl.template = /*html*/ `
<style>
  :host {
    display: block;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 50px;
    transform: translateY(-100%);
    transition: 0.2s;
    opacity: 0.2;
    text-align: left;
    box-sizing: border-box;
    max-height: 100%;
    overflow-y: auto;
  }
  :host([active]) {
    transform: translateY(0);
    opacity: 0.8;
  }
  :host(:hover) {
    opacity: 1 !important;
  }
  .pp-info-bar_close-btn {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .pp-info-bar_name {
    font-size: 1.2em;
    padding-right: 46px;
  }
  .pp-info-bar_description {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-right: 46px;
  }
</style>
<div class="pp-info-bar_name"><slot name="name"></slot></div>
<div class="pp-info-bar_description"><slot name="description"></slot></div>
<hmp-button-el 
  class="pp-info-bar_close-btn" 
  icon="chevron-up" 
  set="onclick: onClose">
</hmp-button-el>
`;
HmpInfoBarEl.reg('hmp-info-bar-el');

