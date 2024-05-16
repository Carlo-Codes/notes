import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/notfound";
import Home from "./containers/home";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}