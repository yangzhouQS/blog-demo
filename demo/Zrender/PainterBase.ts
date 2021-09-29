/**
 * canvase元素生命周期管理，视图渲染，绘画，更新控制
 */
import {GradientObject} from './graphic/Gradient';
import Path from './graphic/Path';
import ZRImage from './graphic/Image';
import {Dictionary} from './core/types';

interface PainterOption {
    width?: number | string
    height?: number | string
}

// 画图接口
export interface PainterBase {
    type: string;
    root: HTMLElement

    resize(width?: number | string, height?: number | string): void

    refresh(): void

    clear(): void

    getType: () => string
    getWidth: number
    getHeight: number

    dispose(): void

    getViewportRoot: () => HTMLElement
    getViewportRootOffset: () => { offsetLeft: number, offsetTop: number }

    refreshHover(): void

    pathToImage(e: Path, dpr: number): ZRImage

    configLayer(zlevel: number, config: Dictionary<any>): void

    setBackgroundColor(backgroundColor: string | GradientObject): void
}
