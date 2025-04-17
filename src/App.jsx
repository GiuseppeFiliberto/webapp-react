import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./components/DefaultLayout"
import Home from "./pages/Home"
import SingleMovie from "./pages/SingleMovie"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<DefaultLayout />}>

            <Route element={<Home />} />
            <Route element={<SingleMovie />} />

          </Route>

        </Routes>

      </BrowserRouter >
    </>
  )
}

export default App
