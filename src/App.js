import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";
import GlobalStyle from "./GlobalStyle"


function App() {
 return(
     <Router>
      <GlobalStyle/>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/repositorio/:repositorio" element={<Repositorio />} />
        <Route />
      </Routes>
    </Router>
 )
}

export default App;
