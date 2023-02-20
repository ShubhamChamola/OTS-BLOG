// React Module
import { useLocation } from "react-router-dom";

// Component Module
import Container from "../components/ui/Container";

// CSS Modules
import "../assets/styles/manageAccountPage.scss";
import BlogTileSkeleton from "./BlogTileSkeleton";

function Page() {
  return (
    <>
      <section id="manage-account">
        <Container id="manage-account-container">
          <aside id="manage-account-aside" className="skeleton-parent">
            <div className="profile">
              <div className="avatar skeleton"></div>
              <h5 className="skeleton">{}</h5>
            </div>
            <ul>
              <li className="skeleton"></li>
              <li className="skeleton"></li>
              <li className="skeleton"></li>
            </ul>
          </aside>
          <form id="profile-setting" className="skeleton-parent">
            <div className="input-container">
              <div className="alternate skeleton"></div>
              <div className="alternate skeleton"></div>
            </div>
            <div className="input-container">
              <div className="alternate skeleton"></div>
              <div className="alternate skeleton"></div>
            </div>
            <div className="input-container">
              <div className="alternate skeleton"></div>
              <span className="alternate skeleton"></span>
            </div>
            <span className="alternate skeleton"></span>
          </form>
        </Container>
      </section>
    </>
  );
}

function ProfileSetting() {
  return (
    <>
      <form id="profile-setting" className="skeleton-parent">
        <div className="input-container">
          <div className="alternate skeleton"></div>
          <div className="alternate skeleton"></div>
        </div>
        <div className="input-container">
          <div className="alternate skeleton"></div>
          <div className="alternate skeleton"></div>
        </div>
        <div className="input-container">
          <div className="alternate skeleton"></div>
          <span className="alternate skeleton"></span>
        </div>
        <span className="alternate skeleton"></span>
      </form>
    </>
  );
}

function UserSecurity() {
  return (
    <>
      <article id="user-security" className="skeleton-parent">
        <h4 className="alternate skeleton">{}</h4>
        <span className="alternate skeleton"></span>
      </article>
    </>
  );
}

function UserBlogs() {
  return (
    <>
      <article id="user-blogs" className="skeleton-parent">
        <BlogTileSkeleton />
        <BlogTileSkeleton />
      </article>
    </>
  );
}

interface TypeProp {
  removeAside?: boolean;
}

export default function ManageAccountPage({ removeAside }: TypeProp) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/manage-account" && !removeAside && <Page />}
      {pathname === "/manage-account" && removeAside && <ProfileSetting />}
      {(pathname === "/manage-account/created-blogs" ||
        pathname === "/manage-account/saved-blogs") &&
        removeAside && <UserBlogs />}
      {pathname === "/manage-account/user-security" && removeAside && (
        <UserSecurity />
      )}
    </>
  );
}
