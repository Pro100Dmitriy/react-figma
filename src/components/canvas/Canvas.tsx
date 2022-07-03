// library
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Application, { MonitoringParams } from '../../application/Application'
import Bezier from '../../application/Bezier'

// Components
import { addEntity } from '../../store/global/globalSlice'

// Store

// Styles

// Types
import { RootState } from '../../store'


const Canvas = () => {
    const entity = useSelector( ( state: RootState ) => state.globalSlice.entity )
    const canvasRef = useRef<HTMLDivElement>( null )
    const dispatch = useDispatch()

    const startApplication = ( element: HTMLDivElement ) => {
        const app = new Application( element )

        const bezier = new Bezier( {
            step: 0.01,
            nodes: [
                { x: 100, y: 100 },
                { x: 400, y: 200 },
                { x: 100, y: 400 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
                { x: 400, y: 450 },
            ]
        } )

        dispatch( addEntity( bezier ) )

        console.log( entity )
        app.container.push( ...entity )

        let point: any = false

        app.tickHandlers.push( ( params: MonitoringParams ) => {
            if( app.mouse.click ) {
                let x = ( app.mouse.x - app.camera.offsetX ) / app.camera.scale
                let y = ( app.mouse.y - app.camera.offsetY ) / app.camera.scale
                point = bezier.getPointUnder( { x, y } )
            }

            if( app.mouse.left ) {
                if( !point ) return

                point.x = ( app.mouse.x - app.camera.offsetX ) / app.camera.scale
                point.y = ( app.mouse.y - app.camera.offsetY ) / app.camera.scale
            } else {
                point = false
            }

            if( app.mouse.middle ) {
                app.camera.offsetX += app.mouse.dX
                app.camera.offsetY += app.mouse.dY
            }
        } )
    }

    useEffect( () => {
        console.log( entity )
        startApplication( canvasRef.current! )
    }, [] )

    return (
        <div
            ref={ canvasRef }
            className="canvas-root"
        />
    )
}

export default Canvas