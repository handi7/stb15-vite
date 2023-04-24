import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Ruang from "./pages/Ruang";
import Bab from "./pages/Bab";
import Antonym from "./pages/Antonym";
import Synonym from "./pages/Synonym";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Ruang />} path="/bab" />
          <Route element={<Bab />} path="/bab/:bab" />
          <Route element={<Antonym />} path="/antonym" />
          <Route element={<Synonym />} path="/synonym" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
