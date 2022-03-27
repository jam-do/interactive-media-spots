export const TPL = /*html*/ `
<style>
  :host {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: 100vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    user-select: none;
    overflow: hidden;
  }
  .start-btn {
    position: absolute;
    height: 60px;
    width: 60px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    box-shadow: 0 0 var(--gap-mid) rgba(0, 0, 0, 0.2);
  }
  .start-btn:hover {
    transform: scale(1.2);
  }
  :host([active]) .start-btn {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  :host(:not([active])) .active {
    opacity: 0;
    pointer-events: none;
  }
  #canvas-el {
    box-sizing: border-box;
    transition: 0.1s;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .sensor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 44px;
    box-sizing: border-box;
  }
</style>
<canvas ref="canvas-el"></canvas>
<div class="sensor" ref="sensor-el"></div>
<div class="start-btn" ref="play-btn">
  <logo-com compact></logo-com>
</div>
<hmp-toolbar-el>
  <hmp-button-el icon="play" ref="play-status-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="plus" ref="zoom-in-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="minus" ref="zoom-out-btn"></hmp-button-el>
  <hmp-button-el class="active" icon="stop" ref="unload-btn"></hmp-button-el>
</hmp-toolbar-el>
<hmp-progress-bar-el ref="progress-bar"></hmp-progress-bar-el>
<hmp-info-bar-el ref="info-bar"></hmp-info-bar-el>
`;