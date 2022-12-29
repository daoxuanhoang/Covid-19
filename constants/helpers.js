import React from "react";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: 1200,
    height: 800,
  });
  function handleWindowSizeChange() {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    setWindowDimensions({ width, height });
  }
  React.useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      if (process.browser)
        window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return windowDimensions;
};
