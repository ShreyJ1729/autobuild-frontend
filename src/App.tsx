import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./theme";
import Home from "./pages/Home/Home";
import MermaidGen from "./pages/MermaidGen/MermaidGen";
import MermaidEdit from "./pages/MermaidEdit/MermaidEdit";

function App() {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mermaid" element={<MermaidGen />} />
              <Route path="/mermaid-edit" element={<MermaidEdit />} />
              <Route path="/landing" element={<div>404</div>} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
