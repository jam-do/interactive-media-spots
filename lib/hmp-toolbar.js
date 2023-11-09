import { AppCom, html, css } from './AppCom.js';

import { } from './hmp-button.js';

const FS_ICONS = {
  ENABLED: 'fullscreen-exit',
  DISABLED: 'fullscreen',
}

export class HmpToolbar extends AppCom {

  init$ = {
    fsIcon: FS_ICONS.DISABLED,
    onInfo: () => {
      this.$['^infoActive'] = !this.$['^infoActive'];
    },
    onFullscreen: () => {
      this.$['^fullscreen'] = !this.$['^fullscreen'];
    },
  }

  initCallback() {

    this.sub('^fullscreen', (val) => {
      this.$.fsIcon = val ? FS_ICONS.ENABLED : FS_ICONS.DISABLED;
    });

  }

}

HmpToolbar.shadowStyles = css`
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
`;

HmpToolbar.template = html`
<div class="pp-toolbar_block"><slot></slot></div>
<div class="pp-toolbar_block">
  <hmp-button icon="info" ${{onclick: 'onInfo'}}></hmp-button>
  <hmp-button ${{onclick: 'onFullscreen', '@icon': 'fsIcon'}}></hmp-button>
</div>
`;

HmpToolbar.reg('hmp-toolbar');

