import React from "react";
import { Route } from "react-router-dom";
import CreateFundraiser from "./components/createFundraiser";

function App() {
  return (
    <div className="App">
      <Route path="/" component={CreateFundraiser} />
    </div>
  );
}

export default App;
