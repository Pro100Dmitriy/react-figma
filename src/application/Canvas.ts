import { Point } from "./Bezier"

export type Color = string

export type Coords = number

type Appearance = {
    style: 'fill' | 'stroke' | 'multiple'
    color: Color
    multiple?: any
}

type GridParam = {
    offsetX: number
    offsetY: number
    cellSize: number
    lineWidth: number
    color: Color
}

type LineParams = {
    x1: Coords
    y1: Coords
    x2: Coords
    y2: Coords
    appearance: Appearance
}

type SelectParam = {
    start: Point
    end: Point
    appearance: any
}

type CircleParams = {
    point: Point
    radius: number
    appearance: Appearance
}

type CanvasParams = {
    root: HTMLDivElement
    width: number
    height: number
    background: Color
}

export interface ICanvas {
    element: HTMLCanvasElement
    context: CanvasRenderingContext2D
    background: Color

    clear: () => void
    drawCircle: ( param: CircleParams ) => void
    drawLine: ( param: LineParams ) => void
}

class Canvas implements ICanvas {
    element = document.createElement( 'canvas' )
    context = this.element.getContext( '2d' ) as CanvasRenderingContext2D
    background: Color

    constructor( params: CanvasParams ) {
        params.root.innerHTML = ''
        params.root?.append( this.element )

        this.element.width = params.width
        this.element.height = params.height
        this.background = params.background

        this.clear()
    }

    clear() {
        const { context } = this

        context.beginPath()
        context.fillStyle = this.background
        context.rect( 0, 0, this.element.width, this.element.height )
        context.fill()
    }

    drawSelect( param: SelectParam ) {
        const { context } = this

        const { start, end, appearance } = param

        context.beginPath()
        context.rect( start.x, start.y, end.x, end.y )

        context.fillStyle = appearance.multiple.background
        context.fill()
        
        context.strokeStyle = appearance.multiple.borderColor
        context.stroke()
    }

    drawCircle( param: CircleParams ) {
        const { context } = this
        const { point, radius, appearance } = param

        context.beginPath()
        context.arc( point.x, point.y, radius, 0, 2 * Math.PI )

        if( appearance.style === 'fill' ) {
            context.fillStyle = appearance.color
            context.fill()
        }

        if( appearance.style === 'stroke' ) {
            context.strokeStyle = appearance.color
            context.stroke()
        }
    }

    drawLine( params: LineParams ) {
        const { context } = this
        const { x1, y1, x2, y2, appearance } = params

        context.beginPath()
        context.moveTo( x1, y1 )
        context.lineTo( x2, y2 )
        context.lineWidth = 1

        if( appearance.style === 'fill' ) {
            context.fillStyle = appearance.color
            context.fill()
        }

        if( appearance.style === 'stroke' ) {
            context.strokeStyle = appearance.color
            context.stroke()
        }
    }

    drawGrid( param: GridParam ) {
        this.context.strokeStyle = param.color
        this.context.lineWidth = param.lineWidth

        for( let i = 0; i < this.element.width / param.cellSize; i++ ) {
            this.context.beginPath()
            this.context.moveTo( param.offsetX + i * param.cellSize, 0 )
            this.context.lineTo( param.offsetX + i * param.cellSize, this.element.height )
            this.context.stroke()
        }

        for( let i = 0; i < this.element.height / param.cellSize; i++ ) {
            this.context.beginPath()
            this.context.moveTo( 0, param.offsetY + i * param.cellSize )
            this.context.lineTo( this.element.width, param.offsetY + i * param.cellSize )
            this.context.stroke()
        } 
    }

    save() {
        this.context.save()
    }

    restore() {
        this.context.restore()
    }

    translate( { x, y }: Point ) {
        this.context.translate( x, y )
    }

    scale( scale: number ) {
        this.context.scale( scale, scale )
    }
}

export default Canvas