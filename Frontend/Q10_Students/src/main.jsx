import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeContainer from "./pages/Home/homeContainer"
import Login from "./pages/Login/Login";
import UserContainer from "./pages/Users/UserContainer";
import StudentContainer from "./pages/Students/StudentContainer";
import SubjectContainer from "./pages/Subjects/SubjectContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer/>,
  },
  {
    path: "/users",
    element: <UserContainer/>,
  },
  {
    path: "/students",
    element: <StudentContainer/>,
  },
  {
    path: "/subjects",
    element: <SubjectContainer/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);