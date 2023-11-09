import { AppCom, html, css } from './AppCom.js';

const DEFAULT_PATH = 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z';

export class ImsIcon extends AppCom {

  init$ = {
    icon: '',
    '+path': () => ImsIcon.iconSet[this.$.icon] || DEFAULT_PATH,
  };

  /**
   *
   * @param {Object.<String, String>} set
   */
  static addIcons(set) {
    Object.assign(ImsIcon.iconSet, set);
  }

}

ImsIcon.iconSet = Object.create(null);

ImsIcon.rootStyles = css`
ims-icon {
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
ims-icon[morph] path {
  transition: var(--transition, 0.2s);
}
`;

ImsIcon.template = html`
<svg
  height="24"
  width="24"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg">
  <path ${{'@d': '+path'}} style="fill: currentColor"></path>
</svg>`;

ImsIcon.bindAttributes({
  icon: 'icon',
});

ImsIcon.reg('ims-icon');
