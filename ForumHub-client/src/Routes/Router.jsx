import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";

import PostDetail from "../pages/Home/PostDetail/PostDetail";
import NotFound from "../components/NotFound";
import MembershipPage from "../pages/MembershipPage/MembershipPage";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyPosts from "../pages/MyPosts/MyPosts";
import AddPost from "../pages/AddPost/AddPost";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import ExploreTopics from "../ExtraSection/ExploreTopics";
import NewPost from "../ExtraSection/NewPost";
import PollsAndSurveysSection from "../ExtraSection/PollsAndSurveysSection";
import Payment from "../pages/Dashboard/Payment/payment";

import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import { JoinUs } from "../pages/Dashboard/JoinUs/JoinUs";
import { Register } from "../Layout/Register/Register";
import AdminProfile from "../components/Admin/AdminProfile";
import AnnouncementForm from "../assets/dashboard/AnnouncementForm/AnnouncementForm";
import CommentsPage from "../pages/CommentsPage/CommentsPage";
import ReportedCommentsPage from "../Layout/DashboardLayout/ReportedCommentsPage/ReportedCommentsPage";
import MoreInfo from "../ExtraSection/MoreInfo";
// import AdminProfile from "../components/Admin/AdminProfile";


 
  
  export const router = createBrowserRouter([
    {
      path: "/",
          element: <Main />,
          children: [
              {
                  path: '/',
                  element: <Home/>
            },
            {
              path: 'explore-topics',
              element:<ExploreTopics/>
            },
            {
              path: 'new-posts',
              element:<NewPost/>
            },
            {
              path: 'polls-surveys',
              element:<PollsAndSurveysSection/>
            },
            {
              path: '/login',
              element: <Login/>
            },
            {
              path: 'signup',
              element:<SignUp/>
            },
            {
              path: 'register',
              element:<Register/>
            },
            {
              path: 'post/:id',
              element: <PostDetail />,
              loader:({params})=>fetch(`https://bistro-boss-server-eight-cyan.vercel.app/post/${params.id}`)
            },
            {
              path: '*',
              element:<NotFound/>
            },
            // {
            //   path:''
            // },
            {
              path: '/membership',
              element: <PrivateRoute>
                <MembershipPage/>
              </PrivateRoute>
            },
            {
              path: '/moreInfo',
              element: <PrivateRoute>
                <MoreInfo/>
              </PrivateRoute>
            }

      ]
    },
    {
      path: '/dashboard',
      element:<PrivateRoute> <DashboardLayout/></PrivateRoute>,
      children: [
      // normal user routes
        {
          path: 'profile',
          element:<MyProfile/>
        },
        {
          path: 'add-post',
          element: <AddPost/>
        },
        {
          path: 'my-posts',
          element:<MyPosts/>
        },
        {
          path: 'my-cart',
          element:<Payment/>
        },
        {
          path: '/dashboard/comments/:id',
          element:<CommentsPage/> ,
          loader:({params})=>fetch(`https://bistro-boss-server-eight-cyan.vercel.app/comments/${params.id}`)
        },
        {
          path: 'dashboard/join-us',
          element:<JoinUs/>
        },
       



        // admin only routes routes
        {
          path: 'admin-profile',
          element:<AdminRoute><AdminProfile/></AdminRoute>
        },
        {
          path: 'manage-users',
          element:<AdminRoute><AllUsers/></AdminRoute>
        },
        {
          path: 'make-announcement',
          element:<AdminRoute><AnnouncementForm/></AdminRoute>
        },
        // {
        //   path: 'reported-activities/:id',
        //   element: <AdminRoute><UpdateItem /></AdminRoute>,
        //   loader:({params})=>fetch(`https://bistro-boss-server-eight-cyan.vercel.app/menu/${params.id}`)
        // },
        {
          path: 'reported-activities',
          element:<AdminRoute><ReportedCommentsPage/></AdminRoute>
        }
      ]
    }
  ]);