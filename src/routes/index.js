import Home from "../pages/Home";
import InforTour from "../pages/InforTour";
import Tour from "../pages/Tour";

const publicRoutes = [
    { path: "/", page: <Home /> },
    { path: "/tour", page: <Tour /> },
    { path: "/infor-tour/:tourId", page: <InforTour /> },
];
export { publicRoutes };
