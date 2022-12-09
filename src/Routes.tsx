import { Routes as RoutesDom, Route } from "react-router-dom";
import { Search } from "./pages/Search";

export const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Search />} />
    </RoutesDom>
  );
};
