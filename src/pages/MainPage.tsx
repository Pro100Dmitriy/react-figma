// library
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Application, { MonitoringParams } from '../application/Application'
import Bezier from '../application/Bezier'
import Select from '../application/Select'

// Components
import Layers from '../components/layers/Layers'
import { addEntity } from '../store/slices/mainPageSlice'

// Store

// Styles

// Types
import { RootState } from '../store'


const MainPage = () => {
    const [ app, setApp ] = useState( {} )
    const entity = useSelector( ( state: RootState ) => state.mainPage.entity )
    const canvasRef = useRef<HTMLDivElement>( null )
    const dispatch = useDispatch()


    const addPoint = ( event: React.MouseEvent ) => {
        event.preventDefault()
    }

    const startApplication = ( application: any ) => {

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

        // dispatch( addEntity( bezier ) )

        application.container.push( bezier )

        let point: any = false
        let startSelect: any = false
        let start: any = null
        let end: any = null

        application.tickHandlers.push( ( params: MonitoringParams ) => {
            if( application.mouse.click ) {
                let x = ( application.mouse.x - application.camera.offsetX ) / application.camera.scale
                let y = ( application.mouse.y - application.camera.offsetY ) / application.camera.scale
                point = bezier.getPointUnder( { x, y } )

                if( !point ) {
                    start = { x, y }
                    application.select.enable = true
                }
            }

            if( application.mouse.left ) {
                if( application.select.enable ) {
                    let x = ( application.mouse.x - application.camera.offsetX ) / application.camera.scale
                    let y = ( application.mouse.y - application.camera.offsetY ) / application.camera.scale

                    if ( start ) {
                        end = { x, y }
                        
                        application.select.draw( start, end )
                    }

                }

                if( !point ) return

                point.x = ( application.mouse.x - application.camera.offsetX ) / application.camera.scale
                point.y = ( application.mouse.y - application.camera.offsetY ) / application.camera.scale
            } else {
                point = false
                start = null
                application.select.enable = false
            }

            if( application.mouse.middle ) {
                application.camera.offsetX += application.mouse.dX
                application.camera.offsetY += application.mouse.dY
            }
        } )
    }

    useEffect( () => {
        setApp( () => (new Application( canvasRef.current! )) )
    }, [] )

    useEffect( () => {
        if ( Object.keys( app ).length ) {
            startApplication( app )
        }
    }, [ app ] )

    return (
        <section className="application">
            <div className="application__toolkit">
                <button onClick={ addPoint } className="toolkit-button toolkit-button_plus application__button">
                    +
                </button>

                {/* <Layers/> */}
            </div>
            <div className="application__workspace">
                <div
                    ref={ canvasRef }
                    className="canvas-root"
                />
            </div>
        </section>
    )
}

export default MainPage