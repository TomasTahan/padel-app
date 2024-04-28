// @ts-nocheck

"use client";

import { useState } from "react";

const semifinales = [
  { pareja1: "Pareja 1", pareja2: "Pareja 2" },
  { pareja1: "Pareja 3", pareja2: "Pareja 4" },
  { pareja1: "Pareja 5", pareja2: "Pareja 6" },
  { pareja1: "Pareja 7", pareja2: "Pareja 8" },
];

export default function TabsContent() {
  const [parejaSeleccionada1, setParejaSeleccionada1] = useState("");
  const [parejaSeleccionada2, setParejaSeleccionada2] = useState("");
  const [parejaSeleccionada3, setParejaSeleccionada3] = useState("");
  const [parejaSeleccionada4, setParejaSeleccionada4] = useState("");
  const [parejaSeleccionadaFinal1, setParejaSeleccionadaFinal1] = useState("");
  const [parejaSeleccionadaFinal2, setParejaSeleccionadaFinal2] = useState("");
  const [parejaSeleccionadaGanadora, setParejaSeleccionadaGanadora] =
    useState("");

  const handleClick = (pareja, posicion) => {
    switch (posicion) {
      case "arriba1":
        setParejaSeleccionada1(pareja);
        break;
      case "abajo1":
        setParejaSeleccionada2(pareja);
        break;
      case "arriba2":
        setParejaSeleccionada3(pareja);
        break;
      case "abajo2":
        setParejaSeleccionada4(pareja);
        break;
      default:
        break;
    }
  };

  const handleFinalClick = (pareja, posicion) => {
    if (posicion === "arriba") {
      setParejaSeleccionadaFinal1(pareja);
    } else {
      setParejaSeleccionadaFinal2(pareja);
    }
  };

  const handleGanadorClick = (pareja) => {
    setParejaSeleccionadaGanadora(pareja);
  };

  console.log(parejaSeleccionadaGanadora);

  return (
    <>
      <div className="w-full relative">
        <div className="flex">
          <div className="relative">
            <div className="w-44 h-12 rounded-md border flex flex-col">
              <div
                className="h-1/2 rounded-t-md cursor-pointer"
                onClick={() => handleClick(semifinales[0].pareja1, "arriba1")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada1 === semifinales[0].pareja1
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[0].pareja1}
                </p>
              </div>
              <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
              <div
                className="h-1/2 rounded-b-md cursor-pointer"
                onClick={() => handleClick(semifinales[0].pareja2, "arriba1")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada1 === semifinales[0].pareja2
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[0].pareja2}
                </p>
              </div>
            </div>
            <div className="w-44 h-12 rounded-md border mt-8">
              <div
                className="h-1/2 rounded-t-md cursor-pointer"
                onClick={() => handleClick(semifinales[1].pareja1, "abajo1")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada2 === semifinales[1].pareja1
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[1].pareja1}
                </p>
              </div>
              <div className="absolute top-[104px] w-[99%] h-[1px] bg-black/50" />
              <div
                className="h-1/2 rounded-b-md cursor-pointer"
                onClick={() => handleClick(semifinales[1].pareja2, "abajo1")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada2 === semifinales[1].pareja2
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[1].pareja2}
                </p>
              </div>
            </div>
            <>
              <div className="absolute top-6 left-44 w-32 h-[1px] bg-gray-200" />
              <div className="absolute top-[104px] left-44 w-32 h-[1px] bg-gray-200" />
              <div className="absolute top-6 left-72 w-4 h-4 border-r border-gray-200" />
              <div className="absolute top-[88px] left-72 w-4 h-4 border-r border-gray-200" />
            </>
          </div>
          <div className="w-44 h-12 rounded-md border self-center ml-8 relative">
            <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
            <div
              className="h-1/2 rounded-t-md cursor-pointer"
              onClick={() => handleFinalClick(parejaSeleccionada1, "arriba")}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal1 === parejaSeleccionada1
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionada1}
              </p>
            </div>
            <div
              className="h-1/2 rounded-b-md cursor-pointer"
              onClick={() => handleFinalClick(parejaSeleccionada2, "arriba")}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal1 === parejaSeleccionada2
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionada2}
              </p>
            </div>
          </div>
        </div>
        <>
          <div className="absolute top-[65px] left-96 w-4 h-[1px] bg-gray-200" />
          <div className="absolute bottom-[62px] left-96 w-4 h-[1px] bg-gray-200" />
          <div className="absolute top-[65px] left-96 w-4 h-44 border-r border-gray-200" />
        </>
        <div className="flex mt-12">
          <div className="relative">
            <div className="w-44 h-12 rounded-md border flex flex-col">
              <div
                className="h-1/2 rounded-t-md cursor-pointer"
                onClick={() => handleClick(semifinales[2].pareja1, "arriba2")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada3 === semifinales[2].pareja1
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[2].pareja1}
                </p>
              </div>
              <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
              <div
                className="h-1/2 rounded-b-md cursor-pointer"
                onClick={() => handleClick(semifinales[2].pareja2, "arriba2")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada3 === semifinales[2].pareja2
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[2].pareja2}
                </p>
              </div>
            </div>
            <div className="w-44 h-12 rounded-md border mt-8">
              <div
                className="h-1/2 rounded-t-md cursor-pointer"
                onClick={() => handleClick(semifinales[3].pareja1, "abajo2")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada4 === semifinales[3].pareja1
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[3].pareja1}
                </p>
              </div>
              <div className="absolute top-[104px] w-[99%] h-[1px] bg-black/50" />
              <div
                className="h-1/2 rounded-b-md cursor-pointer"
                onClick={() => handleClick(semifinales[3].pareja2, "abajo2")}
              >
                <p
                  className={`text-xs text-end p-1 ${
                    parejaSeleccionada4 === semifinales[3].pareja2
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {semifinales[3].pareja2}
                </p>
              </div>
            </div>
            <>
              <div className="absolute top-6 left-44 w-32 h-[1px] bg-gray-200" />
              <div className="absolute top-[104px] left-44 w-32 h-[1px] bg-gray-200" />
              <div className="absolute top-6 left-72 w-4 h-4 border-r border-gray-200" />
              <div className="absolute top-[88px] left-72 w-4 h-4 border-r border-gray-200" />
            </>
          </div>
          <div className="w-44 h-12 rounded-md border self-center ml-8 relative">
            <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
            <div
              className="h-1/2 rounded-t-md cursor-pointer"
              onClick={() => handleFinalClick(parejaSeleccionada3, "abajo")}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal2 === parejaSeleccionada3
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionada3}
              </p>
            </div>
            <div
              className="h-1/2 rounded-b-md cursor-pointer"
              onClick={() => handleFinalClick(parejaSeleccionada4, "abajo")}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal2 === parejaSeleccionada4
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionada4}
              </p>
            </div>
          </div>
          <div className="w-44 h-12 rounded-md border relative bottom-[49px] left-8">
            <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
            <div
              className="h-1/2 rounded-t-md cursor-pointer"
              onClick={() => handleGanadorClick(parejaSeleccionadaFinal1)}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal1 == parejaSeleccionadaGanadora
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionadaFinal1}
              </p>
            </div>
            <div
              className="h-1/2 rounded-b-md cursor-pointer"
              onClick={() => handleGanadorClick(parejaSeleccionadaFinal2)}
            >
              <p
                className={`text-xs text-end p-1 ${
                  parejaSeleccionadaFinal2 == parejaSeleccionadaGanadora
                    ? "font-bold"
                    : ""
                }`}
              >
                {parejaSeleccionadaFinal2}
              </p>
            </div>
          </div>
          <div className="absolute top-[152px] left-[400px] w-4 h-[1px] bg-gray-200" />
        </div>
      </div>
    </>
  );
}
