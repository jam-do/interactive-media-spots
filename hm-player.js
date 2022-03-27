import { BaseComponent } from './submodules/symbiote/core/BaseComponent.js';

import { HmpState } from './hmp-state/hmp-state.js';
import { HmpFullscreen } from './lib/fullscreen.js';
HmpFullscreen.init();

import { } from './types/spinner/hmp-spinner.js';
import { } from './types/compare/hmp-compare.js';

import {IconMkp} from './icon-bkp.js';
import {HM_ICONS} from './hm-icons.js';

IconMkp.addIcons(HM_ICONS);

export class HmPlayer extends BaseComponent {

  renderShadow = true;

  constructor() {
    super();

    this[HmpState.key] = HmpState.register(this);

    this._typeMap = {
      'spinner': {
        path: 'types/spinner/pp-spinner.js',
        name: 'hmp-spinner',
      },
      'compare': {
        path: 'types/compare/pp-compare.js',
        name: 'hmp-compare',
      },
    };

    this.defineAccessor('config', (cfg) => {
      if (!cfg) {
        return;
      }
      if (!this._typeMap[ cfg.type ]) {
        console.warn('Unsupported content type: ' + cfg.type);
        return;
      }
      this.style.color = cfg.theme.color;
      let typeName = this._typeMap[ cfg.type ].name;
      let createModule = () => {
        if (this._typeModule) {
          this._typeModule.config = cfg;
        } else {
          this._typeModule = document.createElement(typeName);
          this._typeModule.parent = this;
          this._typeModule.config = cfg;
          this.innerHTML = '';
          this.appendChild(this._typeModule);
        }
      };
      createModule();
    });

    this[HmpState.key].sub('fullscreen', (val) => {
      val ? HmpFullscreen.enable(this) : HmpFullscreen.disable();
    });

  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this[HmpState.key].remove();
  }

}

HmPlayer.template = /*html*/ `
<style>
  :host {
    display: block;
    position: relative;
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
<slot></slot>
`;
HmPlayer.reg('hm-player');
