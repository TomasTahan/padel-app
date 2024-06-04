// _components/ResultadosForm.tsx
"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { saveResult } from "@/actions/actions";

export default function ResultadosForm({ data }: any) {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [result, setResult] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleTeamChange = (team: string, value: string) => {
    const selectedTeam = data.find(
      (row: any) => row.parejaId === parseInt(value)
    );
    if (selectedTeam) {
      setCategoria(selectedTeam.categoria);
    }
    if (team === "team1") {
      setTeam1(value);
    } else {
      setTeam2(value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        action={saveResult}
        method="post"
        className="flex flex-col items-center"
      >
        <div className="flex mb-4">
          <select
            className="border border-gray-300 px-4 py-2 mr-2"
            value={team1}
            onChange={(e) => handleTeamChange("team1", e.target.value)}
            required
          >
            <option value="">Selecciona pareja 1</option>
            {data.map((row: any) => (
              <option key={row.parejaId} value={row.parejaId}>
                {row.user1} / {row.user2}
              </option>
            ))}
          </select>
          <Input
            className="border border-gray-300 px-4 py-2"
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Resultado"
            required
          />
          <select
            className="border border-gray-300 px-4 py-2 ml-2"
            value={team2}
            onChange={(e) => handleTeamChange("team2", e.target.value)}
            required
          >
            <option value="">Selecciona pareja 2</option>
            {data.map((row: any) => (
              <option key={row.parejaId} value={row.parejaId}>
                {row.user1} / {row.user2}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="team1" value={team1} />
        <input type="hidden" name="team2" value={team2} />
        <input type="hidden" name="result" value={result} />
        <input type="hidden" name="categoria" value={categoria} />

        <ActionButton type="submit">Guardar Resultado</ActionButton>
      </form>
    </div>
  );
}
