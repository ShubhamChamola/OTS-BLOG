import LikedBlogSkeleton from "./BlogMinimalTileSkeleton";

export default function AsideSkeleton() {
  return (
    <aside id="home-page-aside" className="skeleton-parent">
      <div id="site-theme">
        <h5 className="skeleton">{}</h5>
        <h5 className="skeleton">{}</h5>
      </div>
      <div id="set-categories">
        <h5 className="skeleton">{}</h5>
        <ul>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
        </ul>
      </div>
      <div>
        <h5 className="skeleton">{}</h5>
        <span className="skeleton"></span>
      </div>
      <div id="socials">
        <h5 className="skeleton">{}</h5>
        <ul>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
          <li className="skeleton"></li>
        </ul>
      </div>
      <LikedBlogSkeleton />
    </aside>
  );
}
