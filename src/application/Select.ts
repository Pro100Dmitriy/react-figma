import Canvas from "./Canvas"
import Mouse from "./Mouse"
import { Point } from "./Bezier"

export interface ISelect {
    enable: boolean
    canvas: Canvas
    
    draw: ( start: Point, end: Point ) => void
}

class Select implements ISelect {
    enable: boolean = false
    canvas: Canvas

    constructor ( canvas: Canvas ) {
        this.canvas = canvas
    }

    draw ( start: Point, end: Point ) {
        this.canvas.drawSelect( { start, end, appearance: {
            style: 'fill',
            color: 'black'
        } } )
    }
}

export default Select