interface ICamera {
    offsetX: number
    offsetY: number

    scale: number
    scaleStep: number

    changeScale: ( delta: number ) => void
}

class Camera implements ICamera {
    offsetX = 0
    offsetY = 0

    scale = 1
    scaleStep = -0.05

    changeScale( delta: number ) {
        if( this.scale < 0.2 )
            this.scale = 0.2
        else if( this.scale > 15 )
            this.scale = 15
        else
            this.scale += delta * this.scaleStep
    }
}

export default Camera
