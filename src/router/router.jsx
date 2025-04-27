import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import UserPanel from "../layout/UserPanel/UserPanel";
import Listings from "../pages/Listings/Listings";
import Login from "../pages/Login/Login";
import IndividualEarnings from "../components/IndividualEarnings/IndividualEarnings";
import Earnings from "../pages/Earnings/Earnings";
import Reservations from "../pages/Reservations/Reservations";


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
                    },
                    {
                         path: "/login",
                         element: <Login />,
                    },
                    {
                         path: "individual-earnings/:id",
                         element: <IndividualEarnings />,
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
                    },
                    {
                         path: 'reservations',
                         elements: <Reservations />,
                    },
                    {
                         path: 'earnings',
                         element: <Earnings />,
                    }
               ]
          }
     ]
)