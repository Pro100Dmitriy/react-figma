// Types
import { Coords } from './Canvas'


interface IMouse {
    x: Coords
    y: Coords
    
    pX: Coords
    pY: Coords

    dX: number
    dY: number

    left: boolean
    pLeft: boolean
    click: boolean

    middle: boolean
    pMiddle: boolean
    clickMiddle: boolean

    delta: number
    pDelta: number
    cDelta: number

    el: HTMLCanvasElement
    over: boolean
}

class Mouse implements IMouse {
    x = 0
    y = 0

    pX = 0
    pY = 0

    dX = 0
    dY = 0

    left = false
    pLeft = false
    click = false

    middle = false
    pMiddle = false
    clickMiddle = false

    delta = 0
    pDelta = 0
    cDelta = 0

    el
    over = false

    constructor( el: HTMLCanvasElement ) {
        this.el = el

        this.el.addEventListener( 'mouseenter', ( e: MouseEvent ) => this.mouseenterHandler( e ) )
        this.el.addEventListener( 'mouseout', ( e: MouseEvent ) => this.mouseoutHandler( e ) )
        this.el.addEventListener( 'mousemove', ( e: MouseEvent ) => this.mousemoveHandler( e ) )

        this.el.addEventListener( 'mousedown', ( e: MouseEvent ) => this.mousedownHandler( e ) )
        this.el.addEventListener( 'mouseup', ( e: MouseEvent ) => this.mouseupHandler( e ) )

        this.el.addEventListener( 'wheel', ( e: WheelEvent ) => this.wheelHandler( e ) )
    }

    tick() {
        // Left Button
        this.click = !this.pLeft && this.left
        this.pLeft = this.left

        // Middle Button
        this.clickMiddle = !this.pMiddle && this.middle
        this.pMiddle = this.middle

        // Common
        this.dX = this.x - this.pX
        this.dY = this.y - this.pY

        this.pX = this.x
        this.pY = this.y

        // Wheel
        this.delta = this.cDelta - this.pDelta
        this.pDelta = this.cDelta
    }

    mouseenterHandler( event: MouseEvent ) {
        this.over = true
    }

    mouseoutHandler( event: MouseEvent ) {
        this.over = false
    }

    mousemoveHandler( event: MouseEvent ) {
        const boundingEl = this.el.getBoundingClientRect()

        this.x = event.clientX - boundingEl.left
        this.y = event.clientY - boundingEl.top
    }

    mousedownHandler( event: MouseEvent ) {
        event.preventDefault()

        if( event.button === 0 )
            this.left = true

        if( event.button === 1 )
            this.middle = true
    }

    mouseupHandler( event: MouseEvent ) {
        event.preventDefault()

        if( event.button === 0 )
            this.left = false

        if( event.button === 1 )
            this.middle = false
    }

    wheelHandler( event: WheelEvent ) {
        event.preventDefault()

        this.cDelta += event.deltaY / 100
    }
}

export default Mouse