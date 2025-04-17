import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import SingleMovie from "./pages/SingleMovie"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<DefaultLayout />}>

            <Route path='/' element={<Home />} />
            <Route path='/movies/:id' element={<SingleMovie />} />

          </Route>

        </Routes>

      </BrowserRouter >
    </>
  )
}

export default App
