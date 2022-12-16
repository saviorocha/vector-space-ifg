import { useEffect } from "react";
import MainSectionAnimationPage from "../../components/pagesections/animationPage/MainSectionAnimationPage";
import { useD3Context } from "../../context";

const AnimationPlane = () => {
  const { setEvents, margin, setDimension } = useD3Context();

  const handleResize = () => {
    if (window.innerWidth < 500) {
      setDimension({
        margin: margin,
        width: 360 - margin.left - margin.right,
        height: 300 - margin.top - margin.bottom,
      });
    }
    if (window.innerWidth > 500) {
      setDimension({
        margin: margin,
        width: 460 - margin.left - margin.right,
        height: 400 - margin.top - margin.bottom,
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    setEvents([]);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen">
      <MainSectionAnimationPage />
    </div>
  );
};

export default AnimationPlane;
