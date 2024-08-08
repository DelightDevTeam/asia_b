import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import GamesPage from "../pages/Games";
import Promotion from "../pages/Promotion";
import RankingPage from "../pages/Ranking";
import ContactPage from "../pages/Contact";
import InformationPage from "../pages/Information";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:'/games',
                element:<GamesPage/>
            },
            {
               path:'/login',
                element:<LoginPage/>
            },
            // {
            //     path:'/register',
            //      element:<RegisterPage/>
            //  },
             {
                path:'/promotion',
                 element:<Promotion/>
             },
            //  {
            //     path:'/ranking',
            //      element:<RankingPage/>
            //  },
             {
                path:'/contact',
                 element:<ContactPage/>
             },
             {
                path:'/information',
                 element:<InformationPage/>
             }
        ]
    }
])