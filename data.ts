
import { LevelData } from './types';

export const LEVELS: Record<number, LevelData> = {
  1: {
    id: 1,
    title: "Fundamentos",
    description: "Regla de Laplace y Principio Multiplicativo",
    color: "text-emerald-400",
    icon: "🟢",
    studyMaterial: [
      {
        title: "Regla de Laplace (Concepto Clave)",
        content: "Para calcular la probabilidad de un evento simple, utilizamos la Regla de Laplace. Es fundamental que todos los resultados posibles tengan la misma probabilidad de ocurrir (equiprobabilidad).",
        example: "P(A) = (Casos Favorables) / (Casos Totales Posibles)"
      },
      {
        title: "Principio Multiplicativo (Conteo)",
        content: "Si tienes que tomar una serie de decisiones independientes (ej: elegir una camisa Y luego un pantalón), el total de combinaciones es el producto de las opciones disponibles en cada etapa.",
        example: "3 camisas × 2 pantalones = 6 combinaciones únicas de ropa."
      }
    ],
    questions: [
      { 
        id: 101, 
        category: "Laplace", 
        q: "En un juego de mesa utilizas un dado estándar de 6 caras (numeradas del 1 al 6). Para ganar, necesitas obtener un resultado estrictamente mayor que 4 (es decir, 5 o 6). ¿Cuál es la probabilidad de ganar?", 
        opts: ["1/3", "1/2", "1/6", "2/3"], 
        c: 0, 
        exp: "Casos Totales = 6. Casos Favorables = {5, 6} (2 casos). P = 2/6. Simplificando la fracción (dividiendo por 2), obtenemos 1/3." 
      },
      { 
        id: 102, 
        category: "Laplace", 
        q: "Se lanza una moneda equilibrada al aire una sola vez. ¿Cuál es la probabilidad teórica de que el resultado sea 'Sello'?", 
        opts: ["1/2", "1/4", "1/1", "1/3"], 
        c: 0, 
        exp: "Espacio muestral = {Cara, Sello}. Solo 1 caso favorable de 2 posibles. P = 1/2." 
      },
      { 
        id: 103, 
        category: "Combinatoria", 
        q: "Pedro tiene en su armario 3 camisas distintas y 4 pantalones diferentes. Si decide elegir una prenda de cada tipo al azar, ¿cuántas combinaciones de vestimenta diferentes puede formar?", 
        opts: ["12", "7", "10", "43"], 
        c: 0, 
        exp: "Principio Multiplicativo: 3 (camisas) × 4 (pantalones) = 12 combinaciones." 
      },
      { 
        id: 104, 
        category: "Laplace", 
        q: "Una urna contiene exactamente 10 bolas idénticas al tacto: 5 son rojas y 5 son azules. Si extraes una bola al azar, ¿cuál es la probabilidad de que sea roja?", 
        opts: ["1/2", "1/5", "1/10", "3/4"], 
        c: 0, 
        exp: "P(Roja) = 5/10. Simplificando la fracción (dividiendo por 5), obtenemos 1/2." 
      },
      { 
        id: 105, 
        category: "Laplace", 
        q: "Al lanzar un dado común de 6 caras, definimos el evento A como 'obtener un número impar'. ¿Cuál es la probabilidad de que ocurra A?", 
        opts: ["1/2", "1/3", "1/6", "1/4"], 
        c: 0, 
        exp: "Impares: {1, 3, 5} (3 casos). Totales: 6. P = 3/6. Simplificado es 1/2." 
      },
      { 
        id: 106, 
        category: "Combinatoria", 
        q: "Para viajar de A a C, debes pasar por B. Hay 2 caminos de A a B, y 3 caminos de B a C. ¿Cuántas rutas totales distintas existen?", 
        opts: ["6", "5", "9", "8"], 
        c: 0, 
        exp: "Total rutas = (Caminos A→B) × (Caminos B→C) = 2 × 3 = 6." 
      },
      { 
        id: 107, 
        category: "Laplace", 
        q: "Escribimos las letras 'G', 'A', 'T', 'O' en tarjetas. Si sacas una al azar, ¿cuál es la probabilidad de que sea una vocal?", 
        opts: ["1/2", "1/4", "3/4", "1/1"], 
        c: 0, 
        exp: "Vocales: {A, O} (2 cartas). Total: 4 cartas. P = 2/4 = 1/2." 
      },
      { 
        id: 108, 
        category: "Laplace", 
        q: "En un naipe de 52 cartas con 4 pintas equitativas (Corazones, Diamantes, Tréboles, Picas), ¿cuál es la probabilidad de sacar 'Corazones'?", 
        opts: ["1/4", "1/2", "1/13", "1/52"], 
        c: 0, 
        exp: "Hay 13 corazones en 52 cartas. P = 13/52. Simplificando (dividiendo por 13) obtenemos 1/4." 
      }
    ]
  },
  2: {
    id: 2,
    title: "Aplicación",
    description: "Eventos Independientes y Permutaciones",
    color: "text-amber-400",
    icon: "🟡",
    studyMaterial: [
      {
        title: "Eventos Independientes",
        content: "Dos eventos son independientes cuando el resultado del primero NO afecta las probabilidades del segundo (ej: lanzar un dado y luego una moneda). La probabilidad de que ocurran ambos (A y B) se calcula multiplicando.",
        example: "P(A y B) = P(A) × P(B)"
      },
      {
        title: "Permutaciones Lineales",
        content: "Es la cantidad de formas en que se pueden ordenar 'n' objetos distintos en una fila. Importa el orden. Se calcula usando el factorial (n!).",
        example: "Ordenar 3 libros (A, B, C): ABC, ACB, BAC, BCA, CAB, CBA. Total = 3! = 6."
      }
    ],
    questions: [
      { 
        id: 201, 
        category: "Independientes", 
        q: "Lanzas un dado de 6 caras y una moneda. ¿Cuál es la probabilidad de obtener un '6' en el dado Y 'Cara' en la moneda?", 
        opts: ["1/12", "1/6", "1/8", "1/4"], 
        c: 0, 
        exp: "P(6) = 1/6. P(Cara) = 1/2. Son independientes: (1/6) × (1/2) = 1/12." 
      },
      { 
        id: 202, 
        category: "Combinatoria", 
        q: "Una clave de 3 dígitos usa los números del 1 al 4. Se permite repetir dígitos. ¿Cuántas claves distintas existen?", 
        opts: ["64", "12", "24", "81"], 
        c: 0, 
        exp: "4 opciones × 4 opciones × 4 opciones = 64 combinaciones." 
      },
      { 
        id: 203, 
        category: "Laplace Compuesto", 
        q: "Se lanzan dos dados y se suman sus resultados. ¿Cuál es la probabilidad de que la suma sea exactamente 2?", 
        opts: ["1/36", "1/18", "1/12", "1/6"], 
        c: 0, 
        exp: "Casos totales = 36. Único caso favorable: (1, 1). P = 1/36." 
      },
      { 
        id: 204, 
        category: "Combinatoria", 
        q: "Tres amigos encuentran una fila con 3 asientos vacíos. ¿De cuántas formas distintas pueden sentarse?", 
        opts: ["6", "9", "3", "27"], 
        c: 0, 
        exp: "Permutación de 3: 3! = 3 × 2 × 1 = 6." 
      },
      { 
        id: 205, 
        category: "Laplace", 
        q: "En un naipe de 52 cartas hay 4 Reinas (Q). Si extraes una carta al azar, ¿cuál es la probabilidad de que sea una Reina?", 
        opts: ["1/13", "1/52", "1/26", "4/13"], 
        c: 0, 
        exp: "P(Reina) = 4/52. Simplificando (dividiendo por 4) = 1/13." 
      },
      { 
        id: 206, 
        category: "Combinatoria", 
        q: "Armas un menú con: 1 entrada (de 3 opciones), 1 fondo (de 4 opciones) y 1 postre (de 2 opciones). ¿Cuántos menús únicos hay?", 
        opts: ["24", "12", "9", "18"], 
        c: 0, 
        exp: "3 × 4 × 2 = 24 menús posibles." 
      }
    ]
  },
  3: {
    id: 3,
    title: "Desafío Maestro",
    description: "Probabilidad Compuesta sin Reposición y Lógica",
    color: "text-rose-500",
    icon: "🔴",
    studyMaterial: [
      {
        title: "Extracción SIN Reposición",
        content: "Cuando extraes un elemento y NO lo devuelves, el espacio muestral total disminuye para el siguiente evento. Esto se conoce como probabilidad condicional o eventos dependientes.",
        example: "Urna con 5 bolas. Sacas 1. Para la segunda extracción, solo quedan 4 bolas en total."
      },
      {
        title: "Unión de Eventos (O)",
        content: "Cuando buscamos la probabilidad de que ocurra el evento A **O** el evento B. Si los eventos no pueden ocurrir al mismo tiempo (mutuamente excluyentes), simplemente sumamos sus probabilidades.",
        example: "P(A o B) = P(A) + P(B)"
      }
    ],
    questions: [
      { 
        id: 301, 
        category: "Dependientes", 
        q: "Urna con 4 rojas y 3 azules (7 total). Se extraen dos bolas sucesivamente SIN reposición. ¿Probabilidad de que AMBAS sean azules?", 
        opts: ["1/7", "9/49", "3/7", "1/6"], 
        c: 0, 
        exp: "1ª Azul (3/7). Quedan 2 azules y 6 total. 2ª Azul (2/6). P = (3/7) × (2/6) = 6/42 = 1/7." 
      },
      { 
        id: 302, 
        category: "Combinatoria", 
        q: "¿Cuántos números de tres cifras DISTINTAS se forman con los dígitos {1, 2, 3, 4, 5}?", 
        opts: ["60", "125", "20", "15"], 
        c: 0, 
        exp: "5 opciones (centena) × 4 opciones (decena) × 3 opciones (unidad) = 60." 
      },
      { 
        id: 303, 
        category: "Compuesta", 
        q: "Una familia tiene 3 hijos. P(Hombre)=P(Mujer)=1/2. ¿Probabilidad de que los tres sean mujeres?", 
        opts: ["1/8", "1/3", "3/8", "1/6"], 
        c: 0, 
        exp: "Eventos independientes: (1/2) × (1/2) × (1/2) = 1/8." 
      },
      { 
        id: 304, 
        category: "Lógica (Unión)", 
        q: "Sacas una carta de un naipe (52). ¿Probabilidad de obtener un AS o un REY?", 
        opts: ["2/13", "1/13", "3/13", "4/13"], 
        c: 0, 
        exp: "4 Ases + 4 Reyes = 8 favorables. P = 8/52. Simplificado (÷4) = 2/13." 
      },
      { 
        id: 305, 
        category: "Combinatoria", 
        q: "Ordenar 5 libros diferentes en una repisa. ¿De cuántas formas se puede hacer?", 
        opts: ["120", "25", "100", "5"], 
        c: 0, 
        exp: "Permutación de 5: 5! = 5 × 4 × 3 × 2 × 1 = 120." 
      }
    ]
  }
};
