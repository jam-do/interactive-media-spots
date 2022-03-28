import { BaseComponent } from '../submodules/symbiote/core/BaseComponent.js';

const DEFAULT_PATH = 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z';

export class IconMkp extends BaseComponent {

  renderShadow = true;

  init$ = {
    path: DEFAULT_PATH,
  };

  initCallback() {
    this.sub('icon', (iconName) => {
      this.$.path = IconMkp.iconSet[iconName] || DEFAULT_PATH;
    });
  }

  /**
   *
   * @param {Object.<String, String>} set
   */
  static addIcons(set) {
    Object.assign(IconMkp.iconSet, set);
  }

}

IconMkp.iconSet = Object.create(null);
IconMkp.template = /*html*/ `
<style>
  :host {
    --size: 1.2em;
    display: inline-flex;
    height: var(--size);
    width: var(--size);
    min-width: var(--size);
  }
  svg {
    height: 100%;
    width: 100%;
  }
  :host[morph] path {
    transition: var(--transition, 0.2s);
  }
</style>
<svg
  height="24"
  width="24"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg">
  <path set="@d: path" style="fill: currentColor"></path>
</svg>`;

IconMkp.bindAttributes({
  icon: 'icon',
});
