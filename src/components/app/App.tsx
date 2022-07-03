// library
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import MainPage from '../../pages/MainPage'

// Store


const App = () => {
    const location = useLocation()
    
    return (
        <div className="App">
            <main>
                <AnimatePresence exitBeforeEnter>
                    <Routes location={ location } key={ location.pathname }>
                        <Route path="/" element={ <MainPage/> }/>
                    </Routes>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App
