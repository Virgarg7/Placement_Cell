import "./App.css";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import createRoutes from "./utils/Routes/app-routes";

function App() {
  const routes = createRoutes();
  return <div className="App">{routes}</div>;
}

export default App;
