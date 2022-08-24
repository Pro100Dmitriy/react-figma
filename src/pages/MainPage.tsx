// library

// Components
import Canvas from '../components/canvas/Canvas'
import Layers from '../components/layers/Layers'

// Store

// Styles


const MainPage = () => {

    const addPoint = ( event: MouseEvent ) => {
        event.preventDefault()
    }

    return (
        <section className="application">
            <div className="application__toolkit">
                <button onClick={ addPoint } className="toolkit-button toolkit-button_plus application__button">
                    +
                </button>

                <Layers/>
            </div>
            <div className="application__workspace">
                <Canvas/>
            </div>
        </section>
    )
}

export default MainPage