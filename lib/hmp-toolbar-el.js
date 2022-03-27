import { BaseComponent } from '../submodules/symbiote/core/BaseComponent.js';
import { HmpState } from '../hmp-state/hmp-state.js';
import { } from './hmp-button-el.js';

const FS_ICONS = {
  ENABLED: 'fullscreen-exit',
  DISABLED: 'fullscreen',
}

export class HmpToolbarEl extends BaseComponent {

  renderShadow = true;

  init$ = {
    fsIcon: FS_ICONS.DISABLED,
    info: () => {
      this.gState.pub('infoActive', !this.gState.read('infoActive'));
    },
    share: () => {
      this.gState.pub('shareActive', !this.gState.read('shareActive'));
    },
    fullscreen: () => {
      this.gState.pub('fullscreen', !this.gState.read('fullscreen'));
    },
    shareTg: () => {
      this.shareTo('https://telegram.me/share/url?url=');
    },
    shareTw: () => {
      this.shareTo('https://twitter.com/share?url=');
    },
    shareFb: () => {
      this.shareTo('https://www.facebook.com/sharer/sharer.php?u=');
    },
  }

  constructor() {
    super();
    this.gState = HmpState.findStateFor(this);

    this.gState.sub('shareActive', (val) => {
      if (val) {
        this.setAttribute('sharing', '');
      } else {
        this.removeAttribute('sharing');
      }
    });

    this.gState.sub('fullscreen', (val) => {
      this.$.fsIcon = val ? FS_ICONS.ENABLED : FS_ICONS.DISABLED;
    });

  }

  shareTo(url) {
    window.open(url + 'https://playpic.me/direct/?id=' + this.parentNode['host'].config.guid, '_blank');
    this.removeAttribute('sharing');
  };

}

HmpToolbarEl.template = /*html*/ `
<style>
  :host {
    --gap: 4px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: var(--gap);
    box-sizing: border-box;
  }
  .pp-toolbar_block {
    position: relative;
    display: grid;
    grid-gap: var(--gap);
    grid-auto-flow: column;
  }
  .pp-toolbar_block .social {
    position: absolute;
    right: 42px;
  }
  :host(:not([sharing])) .social {
    pointer-events: none;
    opacity: 0;
    transform: translateY(40px);
  }
  .social.scl1 {
    bottom: calc((var(--gap) + 40px) * 1);
  }
  .social.scl2 {
    bottom: calc((var(--gap) + 40px) * 2);
    transition-delay: 0.1s;
  }
  .social.scl3 {
    bottom: calc((var(--gap) + 40px) * 3);
    transition-delay: 0.2s;
  }
</style>
<div class="pp-toolbar_block"><slot></slot></div>
<div class="pp-toolbar_block">
  <hmp-button-el icon="info" set="onclick: info"></hmp-button-el>
  <hmp-button-el icon="share" set="onclick: share"></hmp-button-el>
  <hmp-button-el class="social scl1" icon="facebook" set="onclick: shareFb"></hmp-button-el>
  <hmp-button-el class="social scl2" icon="twitter" set="onclick: shareTw"></hmp-button-el>
  <hmp-button-el class="social scl3" icon="telegram" set="onclick: shareTg"></hmp-button-el>
  <hmp-button-el set="onclick: fullscreen; @icon: fsIcon"></hmp-button-el>
</div>
`;
HmpToolbarEl.reg('hmp-toolbar-el');
