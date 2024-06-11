import { Routes, Route } from "react-router-dom";

import Root from "./Root";
import { MovieList } from "./components/MovieList";
import "./style/index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<MovieList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
