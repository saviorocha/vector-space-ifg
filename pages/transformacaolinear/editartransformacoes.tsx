import { useEffect } from "react";
import BottomBar from "../../components/pagesections/simplerPlotPage/BottomBar";
import MainSectionPlotPage from "../../components/pagesections/simplerPlotPage/MainSectionPlotPage";
import { useD3Context } from "../../context";

const SimplePlot = () => {
  const { margin, setDimension } = useD3Context();
  const handleResize = () => {
    if (window.innerWidth < 500 || window.innerHeight < 500) {
      setDimension({
        margin: margin,
        width: 360 - margin.left - margin.right,
        height: 300 - margin.top - margin.bottom,
      });
    }
    if (window.innerWidth > 500 && window.innerHeight > 500) {
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 
  
  return (
    <div className="h-screen">
      <MainSectionPlotPage />
      <BottomBar />
    </div>
  );
};

export default SimplePlot;
