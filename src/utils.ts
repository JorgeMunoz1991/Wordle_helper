export function filtrarPalabras(
  lista: string[],
  intento: string,
  resultado: string
): string[] {
  const nuevas: string[] = [];

  for (const palabra of lista) {
    let valida = true;
    const letrasConfirmadas = new Set<string>();

    for (let i = 0; i < 5; i++) {
      if (resultado[i] === "g" || resultado[i] === "y") {
        letrasConfirmadas.add(intento[i]);
      }
    }

    for (let i = 0; i < 5; i++) {
      const letra = intento[i];

      if (resultado[i] === "g") {
        if (palabra[i] !== letra) {
          valida = false;
          break;
        }
      } else if (resultado[i] === "y") {
        if (!palabra.includes(letra) || palabra[i] === letra) {
          valida = false;
          break;
        }
      } else if (resultado[i] === "x") {
        if (!letrasConfirmadas.has(letra) && palabra.includes(letra)) {
          valida = false;
          break;
        }
      }
    }

    if (valida) nuevas.push(palabra);
  }

  return nuevas;
}

export function sugerirMejorPalabra(lista: string[]): string | null {
  if (lista.length === 0) return null;
  return lista.reduce((mejor, actual) =>
    new Set(actual).size > new Set(mejor).size ? actual : mejor
  );
}
