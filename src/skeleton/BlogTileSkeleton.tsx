export default function BlogTileSkeleton() {
  return (
    <>
      <div className="blog-tile">
        <div className="blog-img alternate skeleton"></div>
        <div className="blog-content">
          <h5 className="skeleton alternate">{}</h5>
        </div>
        <div></div>
      </div>
      <div className="blog-tile">
        <div className="blog-img alternate skeleton"></div>
        <div className="blog-content">
          <h5 className="skeleton alternate">{}</h5>
        </div>
        <div></div>
      </div>
    </>
  );
}
