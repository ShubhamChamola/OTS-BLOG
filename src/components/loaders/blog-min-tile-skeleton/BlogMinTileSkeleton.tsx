import "./BlogMinTileSkeleton.scss";

export default function BlogMinTileSkeleton() {
  return (
    <div className="blog-min-tile-skeleton-container">
      <div className="blog-min-tile" id="blog-min-tile-skeleton">
        <h5 className="skeleton">{""}</h5>
        <div className="skeleton"></div>
      </div>{" "}
      <div className="blog-min-tile" id="blog-min-tile-skeleton">
        <h5 className="skeleton">{""}</h5>
        <div className="skeleton"></div>
      </div>{" "}
      <div className="blog-min-tile" id="blog-min-tile-skeleton">
        <h5 className="skeleton">{""}</h5>
        <div className="skeleton"></div>
      </div>
    </div>
  );
}
