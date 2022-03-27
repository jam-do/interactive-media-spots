import {BaseComponent} from '../submodules/symbiote/core/BaseComponent.js';
import { } from './ims-icon.js';

export class HmpButtonEl extends BaseComponent {

  renderShadow = true;

  init$ = {
    icon: '',
  }

}

HmpButtonEl.template = /*html*/ `
<style>
  :host {
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    width: 38px;
    border-radius: 19px;
    box-sizing: border-box;
    border: 2px solid currentColor;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s;
    font-size: 20px;
  }
  :host(:hover) {
    opacity: 1;
  }
</style>
<ims-icon set="@icon: icon"></ims-icon>`;
HmpButtonEl.bindAttributes({
  icon: 'icon',
});
HmpButtonEl.reg('hmp-button-el');
