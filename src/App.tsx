import React, { useEffect, useState } from "react";
import words from "./wordle_words.json";
import { filtrarPalabras, sugerirMejorPalabra } from "./utils";

const App: React.FC = () => {
  const [posibles, setPosibles] = useState<string[]>([]);
  const [intento, setIntento] = useState("");
  const [resultado, setResultado] = useState("");
  const [sugerencia, setSugerencia] = useState<string | null>(null);

  useEffect(() => {
    setPosibles(words as string[]);
  }, []);

  const manejarEnvio = () => {
    if (intento.length !== 5 || resultado.length !== 5) {
      alert("La palabra y el resultado deben tener 5 letras.");
      return;
    }

    const nuevas = filtrarPalabras(posibles, intento, resultado);
    const sugerida = sugerirMejorPalabra(nuevas);
    setPosibles(nuevas);
    setSugerencia(sugerida);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧠 Wordle Helper</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          maxLength={5}
          value={intento}
          onChange={(e) => setIntento(e.target.value.toLowerCase())}
          placeholder="Intento (ej. crane)"
        />
        <input
          className="border p-2"
          maxLength={5}
          value={resultado}
          onChange={(e) => setResultado(e.target.value.toLowerCase())}
          placeholder="Resultado (g,y,x)"
        />
      </div>
      <button onClick={manejarEnvio} className="bg-blue-600 text-white px-4 py-2 rounded">
        Filtrar
      </button>
      <div className="mt-4">
        <p>🔎 {posibles.length} palabras posibles restantes</p>
        {sugerencia && <p>💡 Sugerencia: <strong>{sugerencia}</strong></p>}
      </div>
    </div>
  );
};

export default App;
