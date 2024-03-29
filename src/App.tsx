import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import theme from "./theme";
import Home from "./pages/Home/Home";
import MermaidGen from "./pages/MermaidGen/MermaidGen";
import MermaidEdit from "./pages/MermaidEdit/MermaidEdit";
import LandingPageBuilder from "./pages/LandingPageBuilder/LandingPageBuilder";

import ClickFuel from "pages/Examples/ClickFuel/ClickFuel";
import SurfaClub from "pages/Examples/SurfaClub/SurfaClub";

import { ColorModeScript } from "@chakra-ui/react";

function App() {
  return (
    <>
      <RecoilRoot>
        <ColorModeScript initialColorMode="dark" />
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPageBuilder />} />
              <Route path="/mermaid" element={<MermaidGen />} />
              <Route path="/mermaid-edit" element={<MermaidEdit />} />
              <Route path="/landing" element={<LandingPageBuilder />} />
              <Route path="/examples/clickfuel" element={<ClickFuel />} />
              <Route path="/examples/surfaclub" element={<SurfaClub />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
