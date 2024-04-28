"use client";

import { useState } from "react";

export default function Semifinales({ semifinales }: any) {
  const [parejaSeleccionada1, setParejaSeleccionada1] = useState("");
  const [parejaSeleccionada2, setParejaSeleccionada2] = useState("");

  const handleClick = (pareja: any, posicion: any) => {
    if (posicion === "arriba") {
      setParejaSeleccionada1(pareja);
    } else {
      setParejaSeleccionada2(pareja);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex">
          <div className="relative">
            <div className="w-44 h-12 rounded-md border flex flex-col">
              <div
                className="h-1/2 rounded-t-md cursor-pointer"
                onClick={() => handleClick(semifinales[0].pareja1, "arriba")}
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
                onClick={() => handleClick(semifinales[0].pareja2, "arriba")}
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
                onClick={() => handleClick(semifinales[1].pareja1, "abajo")}
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
                onClick={() => handleClick(semifinales[1].pareja2, "abajo")}
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
            <div className="absolute top-6 left-44 w-32 h-[1px] bg-gray-200" />
            <div className="absolute top-[104px] left-44 w-32 h-[1px] bg-gray-200" />
            <div className="absolute top-6 left-72 w-4 h-4 border-r border-gray-200" />
            <div className="absolute top-[88px] left-72 w-4 h-4 border-r border-gray-200" />
          </div>
          <div className="w-44 h-12 rounded-md border self-center ml-8 relative">
            <div className="absolute top-6 w-[100%] h-[1px] bg-black/50" />
            <div className="h-1/2 rounded-t-md">
              <p className="text-xs text-end p-1 truncate">
                {parejaSeleccionada1}
              </p>
            </div>
            <div className="h-1/2 rounded-b-md">
              <p className="text-xs text-end p-1 truncate">
                {parejaSeleccionada2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
