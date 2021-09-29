interface Stage {
    update?: () => void
}

type OnframeCallback = (deltaTime: number) => void

interface AnimationOption {
    stage?: Stage
    onframe?: OnframeCallback
}

export default class Animation {
    stage: Stage;
    onframe: OnframeCallback;

    constructor(opts?: AnimationOption) {
        opts = opts || {};
        this.stage = opts.stage || {};
        this.onframe = opts.onframe || function () {
        };
    }

    start() {
    }
}
