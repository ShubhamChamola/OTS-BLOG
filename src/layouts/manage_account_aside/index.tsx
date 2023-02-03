import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useUserInfoStore from "../../store/useUserInfoStore";

const ManageAccountAside: React.FC = () => {
  const userInfo = useUserInfoStore((state) => state);
  const role = useAuthStore((state) => state.role);

  return (
    <aside id="manage-account-aside">
      <div className="profile">
        <div
          className="avatar"
          style={{ background: `url(${userInfo.avatar})` }}
        ></div>
        <h4>
          {userInfo.firstName} {userInfo.lastName}
        </h4>
      </div>
      {role === "Admin" ? (
        <ul>
          <li>
            <NavLink
              to="/manage-account"
              end
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Profile Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-account/created-blogs"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Cretaed Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-blog"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Create Blog
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink
              to="/manage-account"
              end
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Profile Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-account/saved-blogs"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Saved Blogs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/manage-account/user-security"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              User Security
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default ManageAccountAside;
