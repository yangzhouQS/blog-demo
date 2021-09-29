let dpr = 1;
if (typeof window !== 'undefined') {
    dpr = Math.max(window.devicePixelRatio ||

        // ie下兼容处理方式
        (window.screen as any).deviceXDPI / (window.screen as any).logicalXDPI ||
        1, 1);
}

/**
 * Debug log mode:
 * 0: Do nothing, for release.
 * 1: console.error, for debug.
 */
export const debugMode = 0;

// retina屏幕优化
export const devicePixelRatio = dpr;

/**
 * Determine when to turn on dark mode based on the luminance of backgroundColor
 * 根据背景色的亮度确定何时打开暗模式
 */
export const DARK_MODE_THRESHOLD = 0.4;

/**
 * Color of default dark label.
 */
export const DARK_LABEL_COLOR = '#333';

/**
 * Color of default light label.
 */
export const LIGHT_LABEL_COLOR = '#ccc';

/**
 * Color of default light label.
 */
export const LIGHTER_LABEL_COLOR = '#eee';











