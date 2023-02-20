// React Modules
import { lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Component Modules
import App from "./App";

const ManageAccountPage = lazy(() => import("./pages/ManageAccountPage"));
const AdminAuthPage = lazy(() => import("./pages/AdminAuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfileSetting = lazy(() => import("./features/profile_setting"));
const UserBlogs = lazy(() => import("./features/user_blogs"));
const UserSecurity = lazy(() => import("./features/user_security"));
const CreateBlogPage = lazy(() => import("./pages/CreateBlogPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<p>Error Occured</p>}>
      <Route index element={<HomePage />}></Route>
      <Route path="blog/:blogID" element={<BlogPage />}></Route>
      <Route path="admin" element={<AdminAuthPage />}></Route>
      <Route path="manage-account" element={<ManageAccountPage />}>
        <Route index element={<ProfileSetting />} />
        <Route path="saved-blogs" element={<UserBlogs />} />
        <Route path="created-blogs" element={<UserBlogs />} />
        <Route path="user-security" element={<UserSecurity />} />
      </Route>
      <Route path="create-blog" element={<CreateBlogPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
