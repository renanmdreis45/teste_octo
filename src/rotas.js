import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Clima from './pages/clima'
import Cep from './pages/cep'
import Contatos from './pages/contatos'

export default function Rotas() {
  return (
    <>
      <nav>
        <ul className="text-black-700 flex flex-row">
           <li className="px-3 mx-3"> <Link to="/">Clima</Link> </li>
           <li className="px-3 mx-3"> <Link to="/cep">Cep</Link> </li>
           <li className="px-3 mx-3"> <Link to="/contatos">Contatos</Link> </li>
        </ul>
      </nav>
      <Routes>
          <Route path="/" element={<Clima />} />
          <Route path="/cep" element={<Cep />} />
          <Route path="/contatos" element={<Contatos />} />
      </Routes>
    </>
  );
}