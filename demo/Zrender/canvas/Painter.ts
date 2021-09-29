import {PainterBase} from '../PainterBase';
import Image from '../graphic/Image';
import {Dictionary} from '../core/types';
import Path from '../graphic/Path';
import {GradientObject} from '../graphic/Gradient';

export default class CanvasPainter implements PainterBase {
    constructor() {
    }

    getHeight: number;

    getType(): string {
        return '';
    }

    getViewportRoot(): HTMLElement {
        return undefined;
    }

    getViewportRootOffset(): { offsetLeft: number; offsetTop: number } {
        return {offsetLeft: 0, offsetTop: 0};
    }

    getWidth: number;
    root: HTMLElement;
    type: string;

    clear(): void {
    }

    configLayer(zlevel: number, config: Dictionary<any>): void {
    }

    dispose(): void {
    }

    pathToImage(e: Path, dpr: number): Image {
        return undefined;
    }

    refresh(): void {
    }

    refreshHover(): void {
    }

    resize(width?: number | string, height?: number | string): void {
    }

    setBackgroundColor(backgroundColor: string | GradientObject): void {
    }
}
