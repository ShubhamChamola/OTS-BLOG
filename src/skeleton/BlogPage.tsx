// CSS Module
import "../assets/styles/blogPage.scss";
import Container from "../components/ui/Container";
import AsideSkeleton from "./AsideSkeleton";
import BlogTileSkeleton from "./BlogTileSkeleton";

export function WritterInfo() {
  return (
    <div id="blog-base" className="skeleton-parent">
      <div className="writter">
        <div className="alternate skeleton"></div>
        <div>
          <h5 className="alternate skeleton">{}</h5>
          <h5 className="alternate skeleton">{}</h5>
          <h5 className="alternate skeleton">{}</h5>
        </div>
      </div>
      <ul>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
      </ul>
    </div>
  );
}

export function BlogContentSkeleton() {
  return (
    <article id="specific-blog" className="skeleton-parent">
      <h2 className="alternate skeleton">{}</h2>
      <ul>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
        <li className="alternate skeleton"></li>
      </ul>
      <p className="alternate skeleton"></p>
      <div id="blog-img" className="skeleton alternate"></div>
      <p className="alternate skeleton"></p>
      <p className="alternate skeleton"></p>
      <WritterInfo />
    </article>
  );
}

export function SimilarBlogsSkeleton() {
  return (
    <article id="similar-blogs" className="skeleton-parent">
      <h4 className="skeleton alternate">{}</h4>
      <div className="overflow-container">
        <BlogTileSkeleton />
        <BlogTileSkeleton />
      </div>
    </article>
  );
}

export function CommentTileSkeleton() {
  return (
    <div className="comment skeleton-parent">
      <div className="user-avatar skeleton"></div>
      <div className="comment-body">
        <h4 className="skeleton">{}</h4>
        <p className="skeleton"></p>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <section id="blog-page">
      <Container id="blog-container">
        <AsideSkeleton />
        <BlogContentSkeleton />
        <SimilarBlogsSkeleton />
      </Container>
    </section>
  );
}
