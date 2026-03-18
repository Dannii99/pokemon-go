import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AppRouter } from "./router";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <SpeedInsights />
    </Providers>
  );
}

export default App;
