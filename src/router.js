import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Main />},
            {path: "/:code", element: <Detail />}
        ],
    },
    {
        path: "/login",
        element: <Login/>
    }
]);

export default router;