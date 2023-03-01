import * as React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

// 1. import `ChakraProvider` component
import { Button, ChakraProvider } from "@chakra-ui/react";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <RecoilRoot>
      <ChakraProvider>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/app" element={<MainPage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>

      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
