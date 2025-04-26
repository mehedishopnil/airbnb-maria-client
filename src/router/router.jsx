import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";


export const router = createBrowserRouter(
     [
          {
               path: "/",
               element: <Main />,
               children: [
                    {
                         path: "/",
                         element: <Home />,
                    },
                    {
                         path: "/profile",
                         element: <Profile />,
                    }
               ]
          }
     ]
)