"use client";

export default function ChildComponent({ onValueChange }: any) {
  const handleClick = () => {
    const value = "Valor del componente hijo";
    onValueChange(value);
  };

  return (
    <div>
      <h2>Componente Hijo</h2>
      <button onClick={handleClick}>Enviar valor al padre</button>
    </div>
  );
}
