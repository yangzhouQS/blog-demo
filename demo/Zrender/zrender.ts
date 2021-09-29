import env from './core/env';
import * as zrUtil from './utils';
import Storage from './Storage';
import {PainterBase} from './PainterBase';
import {Dictionary} from './core/types';
import Animation from './animation/Animation';
import Handler from './Handler';

const useVML = !env.canvasSupported;

// 根据实例id缓存
const instances: Map<number, ZRender> = new Map<number, ZRender>();


type PainterBaseCtor = {
    new(dom: HTMLElement, storage: Storage, ...args: any[]): PainterBase
}

const painterCtors: Dictionary<PainterBaseCtor> = {};

/**
 * 根据id移除缓存实例
 * @param id
 */
function delInstance(id: number): void {
    instances.delete(id);
}

class ZRender {
    dom: HTMLElement;
    id: number;
    storage: Storage;
    painter: PainterBase;
    handler: Handler;
    animation: Animation;

    private _sleepAfterStill = 10;

    private _stillFrameAccum = 0;

    private _needsRefresh = true;
    private _needsRefreshHover = true;

    // 主题模式
    private _darkMode = false;

    // 背景色: 字符串格式/渐变色/图片填充
    private _backgroundColor: string; // | GradientObject | PatternObject;

    public constructor(id: number, dom: HTMLElement, opts?: ZRenderInitOpt) {
        opts = opts || {};
        this.dom = dom;
        this.id = id;
        const storage = new Storage(); // 存储

        // 渲染方式
        let rendererType: string = opts.renderer || 'canvas';
        if (useVML) {// 不支持canvas绘制
            throw new Error('IE8 support has been dropped since 5.0');
        }

        if (!painterCtors[rendererType]) {
            // Use the first registered renderer.
            rendererType = zrUtil.keys(painterCtors)[0] as string;
        }

        // 注册器里边获取不到
        if (!painterCtors[rendererType]) {
            throw new Error(`Renderer '${rendererType}' is not imported. Please import it first.`);
        }

        // TODO 是否需要脏读
        opts.useDirtyRect = opts.useDirtyRect == null ? false : opts.useDirtyRect;

        const painter = new painterCtors[rendererType](dom, storage, opts, id);

        this.storage = storage;
        this.painter = painter;

        this.animation = new Animation({
            stage: {
                update: () => this._flush(true)
            }
        });

        // 开始动画
        this.animation.start();
    }

    dispose() {

    }

    private _flush(fromInside?: boolean) {

    }
}

export interface ZRenderInitOpt {
    renderer?: string; // 支持：'canavs'、'svg'、'vml'
    devicePixelRatio?: number; // 画布大小与容器之比
    width?: number; // 画布宽度，设为 'auto' 则根据 devicePixelRatio 与容器宽度自动计算
    height?: number; // 10, 10px, 'auto'
    useDirtyRect?: boolean; // 肮脏的
}

// 创建zrender实例
export function init(dom: HTMLElement, opts?: ZRenderInitOpt) {
    const zr = new ZRender(zrUtil.guid(), dom, opts);
    return zr;
}

export function dispose(zr: ZRender) {
    zr.dispose();
}

export function disposeAll() {
    for (const instance of instances.values()) {
        instance.dispose();
    }
    instances.clear();
}

export function getInstance(id: number): ZRender {
    return instances.get(id);
}

// 绘制方式注册
export function registerPainter(name: string, Ctor: PainterBaseCtor) {
    painterCtors[name] = Ctor;
}

export const version = '3.0.1';

export interface ZRenderType extends ZRender {
};

