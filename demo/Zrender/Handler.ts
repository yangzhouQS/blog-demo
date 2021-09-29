/**
 * 事件交互处理，实现完整dom事件模拟封装
 */
import Eventful from './core/Eventful';

const handlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

type HandlerName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' |
    'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu';

class Handler extends Eventful {
    constructor() {
        super();
    }
}

export default Handler;
