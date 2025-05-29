import { BrowserRouter as Router } from "react-router-dom";
import "./assets/styles/global.css";
import Layout from "./pages/layout";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
