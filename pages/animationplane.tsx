import { useRouter } from "next/router";
import { useEffect } from "react";
import D3PlotAnimation from "../components/d3/D3plotAnimation";
import { useD3Context } from "../context";

const AnimationPlane = () => {
  const router = useRouter();
  const { setEvents } = useD3Context();

  useEffect(() => {
    setEvents([]);
  }, []);

  return (
    <section>
      <D3PlotAnimation />
      <br />
      <button
        onClick={() => {
          router.push("/editplane");
        }}
      >
        go back
      </button>
    </section>
  );
};

export default AnimationPlane;
