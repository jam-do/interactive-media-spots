import { BaseComponent } from '../submodules/symbiote/core/BaseComponent.js';
import { HmpState } from './ims-state.js';
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
    fullscreen: () => {
      this.gState.pub('fullscreen', !this.gState.read('fullscreen'));
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
</style>
<div class="pp-toolbar_block"><slot></slot></div>
<div class="pp-toolbar_block">
  <hmp-button-el icon="info" set="onclick: info"></hmp-button-el>
  <hmp-button-el set="onclick: fullscreen; @icon: fsIcon"></hmp-button-el>
</div>
`;
HmpToolbarEl.reg('hmp-toolbar-el');
