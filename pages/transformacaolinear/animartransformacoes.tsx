import { useEffect } from "react";
import MainSectionAnimationPage from "../../components/pagesections/animationPage/MainSectionAnimationPage";
import { useD3Context } from "../../context";

const AnimationPlane = () => {
  const { setEvents } = useD3Context();

  useEffect(() => {
    setEvents([]);
  }, []);

  return (
    <div className="h-screen">
      <MainSectionAnimationPage />
    </div>
  );
};

export default AnimationPlane;
