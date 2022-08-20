import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom"
import Rotas from "./rotas"


export default function App() {
  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href ="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);
  
  return (
   <BrowserRouter>
      <Rotas/>
   </BrowserRouter>
  );
}