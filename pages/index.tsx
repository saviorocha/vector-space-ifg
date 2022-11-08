import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className=""
        onClick={() => {
          router.push("/tutorial");
        }}
      >
        Tutorial
      </button>
      <div className="transformation">
        <button
          onClick={() => {
            router.push("/transformancaolinear/simpleplot");
          }}
        >
          Criar Transformações
        </button>
        <button
          onClick={() => {
            router.push("/transformancaolinear/animationplane");
          }}
        >
          Animar Transformações
        </button>
      </div>
    </div>
  );
};

export default Home;
