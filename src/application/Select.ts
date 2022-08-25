import Canvas from "./Canvas"
import Mouse from "./Mouse"
import { Point } from "./Bezier"

export interface ISelect {
    enable: boolean
    start: Point
    end: Point
    
    draw: ( canvas: Canvas ) => void
    clear: () => void
}

class Select implements ISelect {
    enable: boolean = false
    start: Point = {
        x: 0,
        y: 0
    }
    end: Point = {
        x: 0,
        y: 0
    }
    background: string = 'rgba(0, 209, 255, 0.08)'
    borderColor: string = '#00A3FF'

    draw ( canvas: Canvas ) {
        canvas.drawSelect( { 
            start: this.start, 
            end: this.end,
            appearance: {
                style: 'multiple',
                multiple: {
                    background: this.background,
                    borderColor: this.borderColor
                }
            }
        } )
    }

    clear () {
        this.start = { x: 0, y: 0 }
        this.end = { x: 0, y: 0 }
    }
}

export default Select