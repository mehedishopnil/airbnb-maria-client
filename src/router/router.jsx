import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import UserPanel from "../layout/UserPanel/UserPanel";
import Listings from "../pages/Listings/Listings";


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
          },
          {
               path: 'user-panel',
               element: <UserPanel />,
               children: [
                    {
                         path: 'listings',
                         element: <Listings />,
                    }
               ]
          }
     ]
)