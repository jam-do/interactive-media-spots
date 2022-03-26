import { BaseComponent } from '../submodules/symbiote/core/BaseComponent.js';

export class HmpProgressBarEl extends BaseComponent {

  renderShadow = true;

  set progress(val) {
    this.style.width = val + '%';
    if (val >= 98) {
      this.setAttribute('finished', '');
      this.addEventListener('transitionend', () => {
        this.style.display = 'none';
      });
    } else if (val <=3) {
      this.removeAttribute('finished');
      this.style.display = 'block';
    }
  }

}

HmpProgressBarEl.template = /*html*/ `
<style>
  :host {
    position: absolute;
    border-top: 2px solid currentColor;
    bottom: 48px;
    left: 0;
    transition: 0.4s;
    pointer-events: none;
  }
  :host([finished]) {
    opacity: 0;
  }
</style>
`;
HmpProgressBarEl.reg('hmp-progress-bar-el');
