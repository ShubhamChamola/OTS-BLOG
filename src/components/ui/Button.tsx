interface BtnProp {
  onClick?: (event: any) => void;
  children: React.ReactNode;
  className: "solid-btn" | "outlined-btn";
  id?: string;
  disabled?: boolean;
}

const Button: React.FC<BtnProp> = ({
  id,
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={"button " + className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
