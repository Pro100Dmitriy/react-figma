import Canvas, { Coords } from "./Canvas"
import { C, getDistance } from "./Additional"


export type Point = {
    x: Coords
    y: Coords
}

type BezierParams = {
    nodes: Point[]
    step: number
}

export interface IBezier {
    nodes: Point[]
    step: number

    add: ( ...nodes: Point[] ) => void
    draw: ( canvas: Canvas ) => void
    getPointUnder: ( point: Point ) => Point | boolean
}

class Bezier implements IBezier {
    step = 0
    nodes = []

    constructor( params: BezierParams ) {
        this.step = params.step

        this.add( ...params.nodes )
    }

    static getCurve( nodes: Point[], step: number ) {
        const result = []
        const n = nodes.length - 1

        for( let t = 0; t <= 1; t = Math.min(1, t + step) ) {
            const point = {
                x: 0,
                y: 0
            }

            for( let k = 0; k <= n; k++ ) {
                const b = C( n, k ) * t ** k * (1 - t) ** (n - k)
                const node = nodes[k]

                point.x += node.x * b
                point.y += node.y * b
            }

            result.push( point )

            if( t === 1 ) {
                break
            }
        }

        return result
    }

    add( ...nodes: Point[] ) {
        for( const node of nodes ) {
            if( !this.nodes.includes( node ) ) {
                this.nodes.push( node )
            }
        }
    }

    draw( canvas: Canvas ) {
        for( const { x, y } of this.nodes ) {
            canvas.drawCircle( {
                point: { x, y },
                radius: 5,
                appearance: {
                    style: 'fill',
                    color: 'red'
                }
            } )
        }

        for( let i = 0; i < this.nodes.length - 1; i++ ) {
            canvas.drawLine( {
                x1: this.nodes[i].x,
                y1: this.nodes[i].y,
                x2: this.nodes[i + 1].x,
                y2: this.nodes[i + 1].y,
                appearance: {
                    style: 'stroke',
                    color: 'red'
                }
            } )
        }

        const curve = Bezier.getCurve( this.nodes, this.step )
        for( let i = 0; i < curve.length - 1; i++ ) {
            canvas.drawLine( {
                x1: curve[i].x,
                y1: curve[i].y,
                x2: curve[i + 1].x,
                y2: curve[i + 1].y,
                appearance: {
                    style: 'stroke',
                    color: 'black'
                }
            } )
        }
    }

    getPointUnder( point: Point ) {
        for( const node of this.nodes ) {
            const dist = getDistance( point, node )
            if( dist <= 5 )
                return node
        }
        return false
    }
}

export default Bezier