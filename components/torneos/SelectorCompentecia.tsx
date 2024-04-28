"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SelectorCompentecia() {
  const router = useRouter();

  const [tipo, setTipo] = useState("");
  const [cantidadJugadores, setCantidadJugadores] = useState<number | null>(
    null
  );
  const [categorias, setCategorias] = useState<string>("");

  const getButtonVariant = (buttonType: string) => {
    return buttonType === tipo ? "default" : "outline";
  };

  const handleCantidadJugadoresClick = (cantidad: number) => {
    setCantidadJugadores(cantidad);
    router.push(`?tipo=${tipo}&num=${cantidad}`);
  };

  const handleCategoriaClick = (categoria: string) => {
    setCategorias(categoria);
    router.push(`?tipo=${tipo}&num=${cantidadJugadores}&cat=${categoria}`);
  };

  console.log(tipo, cantidadJugadores, categorias);

  return (
    <div>
      <div className="flex justify-between text-black">
        <Button
          variant={getButtonVariant("Americano")}
          onClick={() => setTipo("Americano")}
        >
          Americano
        </Button>
        <Button
          variant={getButtonVariant("Cuadrangular")}
          onClick={() => setTipo("Cuadrangular")}
        >
          Cuadrangular
        </Button>
        <Button
          variant={getButtonVariant("Torneo")}
          onClick={() => setTipo("Torneo")}
        >
          Torneo
        </Button>
        <Button
          variant={getButtonVariant("Liga")}
          onClick={() => setTipo("Liga")}
        >
          Liga
        </Button>
      </div>
      {tipo === "Americano" && (
        <div className="mt-4">
          <div>
            <p>Cantidad de parejas</p>
            <div className="flex gap-2 mt-2">
              <Button
                variant={cantidadJugadores === 6 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(6)}
              >
                6
              </Button>
              <Button
                variant={cantidadJugadores === 8 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(8)}
              >
                8
              </Button>
              <Button
                variant={cantidadJugadores === 9 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(9)}
              >
                9
              </Button>
              <Button
                variant={cantidadJugadores === 10 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(10)}
              >
                10
              </Button>
              <Button
                variant={cantidadJugadores === 12 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(12)}
              >
                12
              </Button>
              <Button
                variant={cantidadJugadores === 16 ? "default" : "outline"}
                onClick={() => handleCantidadJugadoresClick(16)}
              >
                16
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <p>Categoria</p>
            <div className="flex gap-2 mt-2">
              <Button
                variant={categorias == "4" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("4")}
              >
                4
              </Button>
              <Button
                variant={categorias == "5" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("5")}
              >
                5
              </Button>
              <Button
                variant={categorias == "6" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("6")}
              >
                6
              </Button>
              <Button
                variant={categorias == "Mixto" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("Mixto")}
              >
                Mixto
              </Button>
              <Button
                variant={categorias == "C" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("C")}
              >
                C
              </Button>
              <Button
                variant={categorias == "D" ? "default" : "outline"}
                onClick={() => handleCategoriaClick("D")}
              >
                D
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
