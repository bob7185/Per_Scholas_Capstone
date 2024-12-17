
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/Context.jsx";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </UserProvider>
  </StrictMode>
);
