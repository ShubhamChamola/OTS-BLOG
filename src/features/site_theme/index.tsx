import { useEffect, useState } from "react";
import RadioBtnActive from "../../assets/icons/RadioBtnActive";
import RadioBtn from "../../assets/icons/RadioBtn";

const Theme: React.FC = () => {
  const bodyRef = document.querySelector("body");

  const [lightThemeTrue, setLightThemeTrue] = useState(
    bodyRef?.classList.contains("light") ? true : false
  );

  useEffect(() => {
    if (lightThemeTrue) {
      bodyRef?.classList.remove("dark");
      bodyRef?.classList.contains("light") || bodyRef?.classList.add("light");
    } else {
      bodyRef?.classList.remove("light");
      bodyRef?.classList.add("dark");
    }
  }, [lightThemeTrue]);

  return (
    <div id="site-theme">
      <h4>Theme</h4>
      <div
        className="input-container"
        onClick={() => {
          setLightThemeTrue(true);
        }}
      >
        <span className="radio-parent">
          {lightThemeTrue ? <RadioBtnActive /> : <RadioBtn />}
        </span>
        <span>Light Theme</span>
      </div>
      <div
        className="input-container"
        onClick={() => {
          setLightThemeTrue(false);
        }}
      >
        <span className="radio-parent">
          {lightThemeTrue ? <RadioBtn /> : <RadioBtnActive />}
        </span>
        <span>Dark Theme</span>
      </div>
    </div>
  );
};

export default Theme;
