module.exports = {
  // ---- color ----
  'primary-color': '$primary',
  'normal-color': '#848484',
  'link-color': '$primary',
  'link-hover-color': 'mix($link-color, #000, 80%)',
  'title-color': '#2d2d2d',
  'text-color': '#848484',
  'light-color': '#f6f6f6',
  'dark-color': '#dadada',

  // ---- base ----
  'body-background': '#f6f6f6',
  'mask-bg': 'rgba(0, 0, 0, 0.5)',
  'font-family': 'PingHei',
  'font-size-base': '14px',
  'font-size-small': '12px',
  'font-size-large': '16px',
  'line-height-base': 1.5,
  'border-radius-base': '8px',
  'border-radius-small': '3px',
  'border-radius-large': '50px',

  // ---- Animation ----
  'animation-duration': '0.25s',
  'transition-duration': '0.2s',
  'transition-duration-fast': '0.2s',
  'transition-duration-slow': '0.4s',
  'animation-timing-fun': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  'ease-in-out': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  'ease-out': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',

  // ---- Border color ----
  'border-color-base': '$dark-color',
  'border-color-dark': '#ababab',
  'border-width-base': '1px',
  'border-style-base': 'solid',
  'border-color-active': '$primary',

  // ---- Disabled ----
  'disabled-color': '#f6f6f6',
  'disabled-bg': '#dadada',
  'disabled-primary-bg': '#eb8a7e',

  // ---- Shadow ----
  'shadow-color': 'rgba(0, 0, 0, 0.15)',
  'shadow-up': '0 -2px 8px $shadow-color',
  'shadow-down': '0 2px 8px $shadow-color',
  'shadow-left': '-2px 0 8px $shadow-color',
  'shadow-right': '2px 0 8px $shadow-color',
  'shadow-base': '$shadow-down',

  // ---- Buttons ----
  'btn-font-weight': 'normal',
  'btn-border-radius-base': '8px',
  'btn-border-radius-small': '3px',
  'btn-border-radius-large': '50px',
  'btn-height-small': '30px',
  'btn-height-big': '40px',
  'btn-icon-height-small': '12px',
  'btn-icon-height-big': '16px',
  'btn-menu-icon-height': '20px',
  'btn-menu-height': '50px',
  'btn-primary-color': '#fff',
  'btn-primary-bg': '$primary',
  'btn-gradient-color': '#fff',
  'btn-gradient-start-color': '$primary',
  'btn-gradient-end-color': '$primary',
  'btn-gradient-bg': 'linear-gradient(315deg, $btn-gradient-start-color 0%, $btn-gradient-end-color 100%)',
  'btn-gradient-active-bg': 'linear-gradient(315deg, darken($btn-gradient-start-color, 10%) 0%, darken($btn-gradient-end-color, 10%) 100%)',
  'btn-default-color': '$normal-color',
  'btn-default-bg': '#fff',
  'btn-default-border': '$border-color-dark',
  'btn-active-color': '#fff',
  'btn-active-bg': '$primary',
  'btn-active-border': '$primary',
  'btn-disable-color': '$disabled-color',
  'btn-disable-bg': '$disabled-bg',
  'btn-disable-border': '$disabled-color',
  'btn-icon-margin': '5px',
  'btn-label-light-bg': 'rgba(240, 37, 15, 0.05)',

  // ---- z-index ----
  'zindex-mask': 9998,
  'zindex-actionsheet': 10001,
  'zindex-dialog': 10000,
  'zindex-picker': 10050,

  // ---- Assets path ----
  // 'assetsPath': '../../assets'

  // ---- Stepper ----
  'stepper-color': '#333',
  'stepperbar-width': '11px',
  'stepperbar-color': '#333',

  // Notify
  'notify-text-color': '#fff',
  'notify-padding': '8px 16px',
  'notify-font-size': '$font-size-base',
  'notify-line-height': '20px',
  'notify-primary-background-color': '#1989fa',
  'notify-success-background-color': '#07c160',
  'notify-danger-background-color': '#ee0a24',
  'notify-warning-background-color': '#ff976a',

  // Fixed

  'fixed-bg-color': '#fff',
  'fixed-font-color': '#333'
}
