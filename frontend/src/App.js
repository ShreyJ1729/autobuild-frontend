import logo from "./logo.svg";
import "./App.css";
import ChakraUIPage from "./ChakraUIPage";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ChakraUIPage />
      </ChakraProvider>
    </div>
  );
}

export default App;
