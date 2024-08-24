import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import SearchPage from "./layouts/SearchPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}></Route>
        <Route path="/results" element={<SearchPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
