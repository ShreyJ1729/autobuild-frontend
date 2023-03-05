import * as React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MermaidEdit";
import LandingPage2 from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Codegen from "./pages/Codegen";

function App() {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage2 />} />
              <Route path="/app" element={<MainPage />} />
              <Route path="/codegen" element={<Codegen />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
