const Theme: React.FC = () => {
  return (
    <form id="site-theme">
      <div className="input-container">
        <input
          type="radio"
          name="theme"
          value="dark"
          id="dark-theme"
          defaultChecked
        />
        <label htmlFor="dark-theme">Dark Theme</label>
      </div>
      <div className="input-container">
        <input type="radio" name="theme" value="light" id="light-theme" />
        <label htmlFor="light-theme">Light Theme</label>
      </div>
    </form>
  );
};

export default Theme;
