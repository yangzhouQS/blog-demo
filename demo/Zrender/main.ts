export * from './zrender';
export * from './export';
import {registerPainter} from './zrender';
import CanvasPainter from './canvas/Painter';

registerPainter('canvas', CanvasPainter);
