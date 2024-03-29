/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
import Handler from './Handler';
import Storage from './Storage';
import { PainterBase } from './PainterBase';
import Animation from './animation/Animation';
import Element, { ElementEventCallback } from './Element';
import { ElementEventName, WithThisType } from './core/types';
import { LayerConfig } from './canvas/Layer';
import { GradientObject } from './graphic/Gradient';
import { PatternObject } from './graphic/Pattern';
import { EventCallback } from './core/Eventful';
import TSpan from './graphic/TSpan';
import ZRImage from './graphic/Image';
import Displayable from './graphic/Displayable';
import Path from './graphic/Path';
declare type PainterBaseCtor = {
    new (dom: HTMLElement, storage: Storage, ...args: any[]): PainterBase;
};
declare class ZRender {
    dom: HTMLElement;
    id: number;
    storage: Storage;
    painter: PainterBase;
    handler: Handler;
    animation: Animation;
    private _sleepAfterStill;
    private _stillFrameAccum;
    private _needsRefresh;
    private _needsRefreshHover;
    private _darkMode;
    private _backgroundColor;
    constructor(id: number, dom: HTMLElement, opts?: ZRenderInitOpt);
    add(el: Element): void;
    remove(el: Element): void;
    configLayer(zLevel: number, config: LayerConfig): void;
    setBackgroundColor(backgroundColor: string | GradientObject | PatternObject): void;
    getBackgroundColor(): string | GradientObject | PatternObject;
    setDarkMode(darkMode: boolean): void;
    isDarkMode(): boolean;
    refreshImmediately(fromInside?: boolean): void;
    refresh(): void;
    flush(): void;
    private _flush;
    setSleepAfterStill(stillFramesCount: number): void;
    wakeUp(): void;
    addHover(el: Displayable): void;
    removeHover(el: Path | TSpan | ZRImage): void;
    clearHover(): void;
    refreshHover(): void;
    refreshHoverImmediately(): void;
    resize(opts?: {
        width?: number | string;
        height?: number | string;
    }): void;
    clearAnimation(): void;
    getWidth(): number;
    getHeight(): number;
    pathToImage(e: Path, dpr: number): ZRImage;
    setCursorStyle(cursorStyle: string): void;
    findHover(x: number, y: number): {
        target: Displayable;
        topTarget: Displayable;
    };
    on<Ctx>(eventName: ElementEventName, eventHandler: ElementEventCallback<Ctx, ZRenderType>, context?: Ctx): this;
    on<Ctx>(eventName: string, eventHandler: WithThisType<EventCallback<any[]>, unknown extends Ctx ? ZRenderType : Ctx>, context?: Ctx): this;
    off(eventName?: string, eventHandler?: EventCallback): void;
    trigger(eventName: string, event?: unknown): void;
    clear(): void;
    dispose(): void;
}
export interface ZRenderInitOpt {
    renderer?: string;
    devicePixelRatio?: number;
    width?: number | string;
    height?: number | string;
    useDirtyRect?: boolean;
}
export declare function init(dom: HTMLElement, opts?: ZRenderInitOpt): ZRender;
export declare function dispose(zr: ZRender): void;
export declare function disposeAll(): void;
export declare function getInstance(id: number): ZRender;
export declare function registerPainter(name: string, Ctor: PainterBaseCtor): void;
export declare const version = "5.1.1";
export interface ZRenderType extends ZRender {
}
export {};
