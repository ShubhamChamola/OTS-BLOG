// React Module
import { NavLink } from "react-router-dom";

// Store Module
import useUserInfoStore from "../../store/useUserInfoStore";

const dummyAvatar =
  require("../../assets/images/user-dummy-avatar.png") as string;

const ManageAccountAside: React.FC = () => {
  const { firstName, lastName, role, avatar } = useUserInfoStore(
    (store) => store.info
  );

  return (
    <aside id="manage-account-aside">
      <div className="profile">
        <div
          className="avatar"
          style={{ background: `url(${avatar || dummyAvatar})` }}
        ></div>
        <h4>
          {firstName} {lastName}
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
