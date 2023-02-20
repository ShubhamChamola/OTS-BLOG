import "./style.scss";

export default function CategoriesSkeleton() {
  return (
    <article id="set-categories" className="categories-skeleton">
      <h4 className="skeleton">{}</h4>
      <ul className="skeleton-parent">
        <li className="skeleton"></li>
        <li className="skeleton"></li>
        <li className="skeleton"></li>
        <li className="skeleton"></li>
        <li className="skeleton"></li>
        <li className="skeleton"></li>
        <li className="skeleton"></li>
      </ul>
    </article>
  );
}
