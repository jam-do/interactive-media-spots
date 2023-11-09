import { AppCom, css } from './AppCom.js';

export class HmpProgressBar extends AppCom {

  set progress(val) {
    this.style.width = val + '%';
    if (val >= 98) {
      this.setAttribute('finished', '');
      this.addEventListener('transitionend', () => {
        this.style.display = 'none';
      });
    } else if (val <= 3) {
      this.removeAttribute('finished');
      this.style.display = 'block';
    }
  }

}

HmpProgressBar.rootStyles = css`
hmp-progress-bar {
  position: absolute;
  border-top: 2px solid currentColor;
  bottom: 48px;
  left: 0;
  transition: 0.4s;
  pointer-events: none;
}
hmp-progress-bar[finished] {
  opacity: 0;
}
`;

HmpProgressBar.reg('hmp-progress-bar');

