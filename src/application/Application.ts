import { runInThisContext } from 'vm'
import Camera from './Camera'
import Canvas from './Canvas'
import Mouse from './Mouse'
import Select from './Select'


type Timestamp = number

export type MonitoringParams = {
    timestamp: Timestamp
    secondPart: number
    diff: number
    fps: number
}

interface IApplication {
    canvas: Canvas
    container: Array<any>
    tickHandlers: Array<any>
    pTimestamp: Timestamp
    mouse: Mouse
    camera: Camera

    tick: ( timestamp: Timestamp ) => void
}

class Application implements IApplication {
    canvas
    container: Array<any> = []
    tickHandlers: Array<any> = []
    pTimestamp = 0
    mouse
    camera
    select

    constructor( element: HTMLDivElement ) {
        this.canvas = new Canvas( {
            root: element,
            width: 500,
            height: 500,
            background: '#c3c3c3'
        } )

        this.mouse = new Mouse( this.canvas.element )
        this.camera = new Camera()
        this.select = new Select()

        this.resize()
        window.addEventListener( 'resize', () => this.resize() )

        requestAnimationFrame( x => this.tick( x ) )
    }

    tick( timestamp: Timestamp ) {
        requestAnimationFrame( x => this.tick( x ) )

        if( this.mouse.delta ) {
            if( this.mouse.over ) {
                let x = ( this.mouse.x - this.camera.offsetX ) / this.camera.scale
                let y = ( this.mouse.y - this.camera.offsetY ) / this.camera.scale

                this.camera.changeScale( this.mouse.delta )

                this.camera.offsetX = - x * this.camera.scale + this.mouse.x
                this.camera.offsetY = - y * this.camera.scale + this.mouse.y
            } else {
                this.camera.changeScale( this.mouse.delta )
            }
        }

        if( this.select.enable ) {
            if( !this.container.find( element => this.select === element ) ) {
                this.container.push( this.select )
            }

            console.log( this.container )
        }

        const diff = timestamp - this.pTimestamp
        const secondPart = 1000 / diff
        const fps = Math.round( 1000 / diff )

        this.pTimestamp = timestamp

        for( const tickHandler of this.tickHandlers )
            tickHandler( {
                timestamp,
                diff,
                secondPart,
                fps
            } )

        this.canvas.clear()

        this.canvas.drawGrid( {
            offsetX: this.camera.offsetX % ( 20 * this.camera.scale ),
            offsetY: this.camera.offsetY % ( 20 * this.camera.scale ),
            cellSize: 20 * this.camera.scale,
            lineWidth: .05,
            color: 'black' 
        } )

        this.canvas.save()
        this.canvas.translate( {
            x: this.camera.offsetX,
            y: this.camera.offsetY
        } )
        this.canvas.scale( this.camera.scale )
        
        for( const item of this.container )
            item.draw( this.canvas )

        this.canvas.restore()
        this.mouse.tick()
    }

    resize() {
        this.canvas.element.width = window.innerWidth
        this.canvas.element.height = window.innerHeight
    }
}

export default Application