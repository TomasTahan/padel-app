"use client";

import { useState } from "react";

export default function Tabla({ data }: any) {
  const [selectedCategory, setSelectedCategory] = useState("Cuarta A");

  const filteredData = data.filter(
    (row: any) => row.categoria === selectedCategory
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <label className="mr-2">Selecciona categoría:</label>
        <select
          className="border border-gray-300 px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Cuarta A">Cuarta A</option>
          <option value="Cuarta B">Cuarta B</option>
        </select>
      </div>
      <table className="table-auto border-collapse border border-gray-400 bg-white shadow-md rounded-lg w-full mx-24">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Pareja ID</th>
            <th className="border border-gray-300 px-4 py-2">Usuario 1</th>
            <th className="border border-gray-300 px-4 py-2">Usuario 2</th>
            <th className="border border-gray-300 px-4 py-2">PJ</th>
            <th className="border border-gray-300 px-4 py-2">PG</th>
            <th className="border border-gray-300 px-4 py-2">PP</th>
            <th className="border border-gray-300 px-4 py-2">SF</th>
            <th className="border border-gray-300 px-4 py-2">SC</th>
            <th className="border border-gray-300 px-4 py-2">DIF S</th>
            <th className="border border-gray-300 px-4 py-2">JF</th>
            <th className="border border-gray-300 px-4 py-2">JC</th>
            <th className="border border-gray-300 px-4 py-2">DIF J</th>
            <th className="border border-gray-300 px-4 py-2">Puntos</th>
            <th className="border border-gray-300 px-4 py-2">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row: any, index: number) => (
            <tr
              key={row.parejaId}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.parejaId}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.user1}</td>
              <td className="border border-gray-300 px-4 py-2">{row.user2}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.pj}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.pg}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.pp}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.sf}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.sc}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.difS}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.jf}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.jc}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.difJ}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.puntos}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.categoria}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
