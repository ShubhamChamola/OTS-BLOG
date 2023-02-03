const formatDate = (date: Date, type: "full" | "partial") => {
  if (type === "partial") {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}`;
  } else {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;
  }
};

export default formatDate;
