interface Props {
  children: React.ReactNode;
  id: string;
}

const Container: React.FC<Props> = ({ children, id }) => {
  return (
    <article className="container" id={id}>
      {children}
    </article>
  );
};

export default Container;
