import { atom, useAtom } from "jotai";
import BackgroundMusic from "./BackgroundMusic";
import { useEffect, useRef } from "react";
const pictures = [
  "01",
  "08",
  "02",
  "03",
  "04",
  "05",
  "06",
  "09",
  "10",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const flipAudio = useRef(null);

  useEffect(() => {
    if (!flipAudio.current) {
      flipAudio.current = new Audio("/audios/page-flip-01a.mp3");
    }
    flipAudio.current.currentTime = 0; // Reset audio to start
    flipAudio.current.play();
  }, [page]);

  return (
    <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
      <div className="pointer-events-auto mt-10 ml-10">
        <BackgroundMusic />
      </div>
      <div className="orbit-control"></div>
      <h1 className="heading" style={{ color: "white" }}>
        Year <br /> 2024
      </h1>
      <div className="w-full overflow-auto pointer-events-auto flex justify-center">
        <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
          {[...pages].map((_, index) => (
            <button
              key={index}
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                index === page
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(index)}
            >
              {index === 0 ? "Cover" : `Page ${index}`}
            </button>
          ))}
          <button
            className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
              page === pages.length
                ? "bg-white/90 text-black"
                : "bg-black/30 text-white"
            }`}
            onClick={() => setPage(pages.length)}
          >
            Back Cover
          </button>
        </div>
      </div>
    </main>
  );
};