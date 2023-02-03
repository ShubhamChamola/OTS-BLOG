import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import AdminAuthPage from "./pages/AdminAuthPage";
import HomePage from "./pages/HomePage";
import ManageAccountPage from "./pages/ManageAccountPage";
import ProfileSetting from "./features/profile_setting";
import UserBlogs from "./features/user_blogs";
import UserSecurity from "./features/user_security";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogPage from "./pages/BlogPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<p>Error Occured</p>}>
      <Route index element={<HomePage />}></Route>
      <Route path="blog/:blogId" element={<BlogPage />}></Route>
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
