import { RgbaValue } from '@jiaminghi/color/types/types';
export declare type LineCap = 'butt' | 'round' | 'square';
export declare type LineJoin = 'round' | 'bevel' | 'miter';
export declare type HoverCursor = 'url' | 'default' | 'auto' | 'crosshair' | 'pointer' | 'move' | 'e-resize' | 'ne-resize' | 'nw-resize' | 'n-resize' | 'se-resize' | 'sw-resize' | 's-resize' | 'w-resize' | 'text' | 'wait' | 'help';
export declare type FontStyle = 'normal' | 'italic' | 'oblique';
export declare type FontVarient = 'normal' | 'small-caps';
export declare type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
export declare type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center';
export declare type TextBaseLine = 'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging';
export declare type GradientType = 'linear' | 'radial';
export declare type GradientWith = 'stroke' | 'fill';
export declare type LinearGradientParams = [number, number, number, number];
export declare type RadialGradientParams = [number, number, number, number, number, number];
export declare type GradientParams = LinearGradientParams | RadialGradientParams;
export declare type GradientStops = 'auto' | number[];
export declare type StyleConfig<ColorType = RgbaValue> = {
    /**
     * @description Rgba value of graph fill color
     */
    fill?: ColorType;
    /**
     * @description Rgba value of graph stroke color
     */
    stroke?: ColorType;
    /**
     * @description Opacity of graph
     */
    opacity?: number;
    /**
     * @description LineCap of Ctx
     */
    lineCap?: LineCap;
    /**
     * @description Linejoin of Ctx
     */
    lineJoin?: LineJoin;
    /**
     * @description LineDash of Ctx
     */
    lineDash?: number[];
    /**
     * @description LineDashOffset of Ctx
     */
    lineDashOffset?: number;
    /**
     * @description ShadowBlur of Ctx
     */
    shadowBlur?: number;
    /**
     * @description Rgba value of graph shadow color
     */
    shadowColor?: ColorType;
    /**
     * @description ShadowOffsetX of Ctx
     */
    shadowOffsetX?: number;
    /**
     * @description ShadowOffsetY of Ctx
     */
    shadowOffsetY?: number;
    /**
     * @description LineWidth of Ctx
     */
    lineWidth?: number;
    /**
     * @description Center point of the graph
     */
    graphCenter?: [number, number];
    /**
     * @description Graph scale
     */
    scale?: [number, number];
    /**
     * @description Graph rotation degree
     */
    rotate?: number;
    /**
     * @description Graph translate distance
     */
    translate?: [number, number];
    /**
     * @description Cursor status when hover
     */
    hoverCursor?: HoverCursor;
    /**
     * @description Font style of Ctx
     */
    fontStyle?: FontStyle;
    /**
     * @description Font varient of Ctx
     */
    fontVarient?: FontVarient;
    /**
     * @description Font weight of Ctx
     */
    fontWeight?: FontWeight;
    /**
     * @description Font size of Ctx
     */
    fontSize?: number;
    /**
     * @description Font family of Ctx
     */
    fontFamily?: string;
    /**
     * @description TextAlign of Ctx
     */
    textAlign?: TextAlign;
    /**
     * @description TextBaseline of Ctx
     */
    textBaseline?: TextBaseLine;
    /**
     * @description The color used to create the gradient
     */
    gradientColor?: ColorType[];
    /**
     * @description Gradient type
     */
    gradientType?: GradientType;
    /**
     * @description Gradient params
     */
    gradientParams?: GradientParams;
    /**
     * @description When to use gradients
     */
    gradientWith?: GradientWith;
    /**
     * @description Gradient color stops
     */
    gradientStops?: GradientStops;
};
