// library

// Components
import Canvas from '../components/canvas/Canvas'

// Store

// Styles


const MainPage = () => {
    return (
        <section className="application">
            <div className="application__toolkit">
                <button className="toolkit-button application__button">
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