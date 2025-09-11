export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { JSX } from "preact";

function NJCheckerboard(): JSX.Element {
  const style: JSX.CSSProperties = {
    width: "100%",
    height: "47px",
    backgroundImage: 'url("/nick-jonas/checkerboard-tile.svg")',
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
  };

  return (
    <div aria-hidden="true" className="w-full">
      <div className="w-full h-[5px] bg-nj-secondary" />
      <div style={style} />
      <div className="w-full h-[5px] bg-nj-secondary" />
    </div>
  );
}

export default NJCheckerboard;
