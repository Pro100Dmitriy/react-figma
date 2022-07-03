// library

// Components
import Canvas from '../components/canvas/Canvas'

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
            </div>
            <div className="application__workspace">
                <Canvas/>
            </div>
        </section>
    )
}

export default MainPage