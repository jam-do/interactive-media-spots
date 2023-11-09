import { AppCom, html, css } from './AppCom.js';
import { } from './ims-icon.js';

export class HmpButton extends AppCom {}

HmpButton.rootStyles = css`
hmp-button {
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
hmp-button:hover {
  opacity: 1;
}
`;

HmpButton.template = html`<ims-icon ${{'@icon': 'icon'}}></ims-icon>`;

HmpButton.bindAttributes({
  icon: 'icon',
});

HmpButton.reg('hmp-button');

