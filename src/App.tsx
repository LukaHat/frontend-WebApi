import { Routes, Route } from "react-router-dom";

import Root from "./Root";
import { MovieList } from "./components/MovieList";
import "./style/index.css";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
