// ============================================================================
// CONEXIÓN A GOOGLE SHEETS / APPS SCRIPT BACKEND
// ============================================================================

export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRK0oyjHsw1zTNQBnzkNaTPEB3ThHIBd7lDOqmxKV5MZ8bqLAp6Gonpzq5Oue19vg/exec';

// --- DATOS POR DEFECTO BASE ---
const exercisesMock = [
  { id: '1', title: "El Juego del Pañuelo (Evasión)", duration: "15 minutos", category: "Entrada en calor", description: "Cada chico se pone una pechera colgada del pantalón. Deben trotar en un cuadrado de 10x10m e intentar robarle la pechera a los compañeros sin perder la suya." },
  { id: '2', title: "Pases en Cruz", duration: "10 minutos", category: "Destreza", description: "Cuatro jugadores enfrentados en forma de cruz. Pases rápidos con dos pelotas en simultáneo para practicar visión periférica y agarre." },
  { id: '3', title: "Impacto al Escudo", duration: "20 minutos", category: "Fuerza y Contacto", description: "Fila de 3 jugadores. Arranque explosivo de 5 metros e impacto con hombro derecho/izquierdo al profe que sostiene el escudo. Retroceder y repetir." },
  { id: '4', title: "Burpees y Sprint a los 10m", duration: "10 minutos", category: "Resistencia", description: "Series de 5 burpees seguidos de un sprint explosivo a máxima velocidad hasta la línea de 10 metros." },
  { id: '5', title: "Empuje de Carretilla", duration: "10 minutos", category: "Fuerza", description: "En parejas, un jugador camina con las manos mientras el compañero le sostiene las piernas por los tobillos. Excelente para fortalecer el core y los hombros, ideal para los futuros primeras líneas." },
  { id: '6', title: "Tracción con Soga (Tug of War)", duration: "15 minutos", category: "Fuerza", description: "Dos equipos de 5 jugadores tiran de una soga gruesa. Fomenta el empuje coordinado y la fuerza de tracción baja, una postura fundamental para el scrum y el maul." },
  { id: '7', title: "Línea Defensiva Espejo", duration: "20 minutos", category: "Sistema", description: "Ataque contra defensa. La defensa no taclea, pero debe mantener la línea recta subiendo junta al grito del líder. Si el ataque quiebra, la defensa retrocede 5 metros y se rearma rápido." },
  { id: '8', title: "Circulación en Células (Pods)", duration: "15 minutos", category: "Sistema", description: "Grupos de 3 forwards (célula) reciben la pelota del medio scrum, impactan contra los escudos, presentan la pelota, y la siguiente célula ya debe estar armada en posición para la próxima fase." },
  { id: '9', title: "Limpieza de Ruck 1v1", duration: "10 minutos", category: "Fuerza y Contacto", description: "Un portador va al piso sobre un escudo y presenta la pelota. Un defensor (pescador) intenta agarrarla. El jugador de apoyo debe entrar con postura bien baja, espalda recta, e impactar desde abajo hacia arriba para limpiar al pescador usando la fuerza de las piernas." },
  { id: '10', title: "Resolución del 2 vs 1", duration: "15 minutos", category: "Destreza", description: "En un canal de 10 metros de ancho, dos atacantes enfrentan a un solo defensor. El portador de la pelota debe correr bien derecho para 'fijar' la marca y, justo antes del contacto, dar un pase preciso a las manos de su compañero para que quiebre la línea." }
];

const defaultPlays = {
  "Salida Kick-off": [
    { id: "b1", type: "ball", x: 50, y: 95, isPercent: true },
    { id: "f1", type: "forward", x: 20, y: 97, isPercent: true }, { id: "f2", type: "forward", x: 35, y: 97, isPercent: true },
    { id: "f3", type: "forward", x: 65, y: 97, isPercent: true }, { id: "f4", type: "forward", x: 80, y: 97, isPercent: true },
    { id: "bk1", type: "back", x: 30, y: 80, isPercent: true }, { id: "bk2", type: "back", x: 70, y: 80, isPercent: true }
  ],
  "Line-out de 5 (Der)": [
    { id: "f_hooker", type: "forward", x: 98, y: 60, isPercent: true },
    { id: "b1", type: "ball", x: 96, y: 60, isPercent: true },
    { id: "f1", type: "forward", x: 85, y: 55, isPercent: true }, { id: "f2", type: "forward", x: 85, y: 58, isPercent: true },
    { id: "f3", type: "forward", x: 85, y: 61, isPercent: true }, { id: "f4", type: "forward", x: 85, y: 64, isPercent: true },
    { id: "bk_9", type: "back", x: 75, y: 65, isPercent: true }, { id: "bk_10", type: "back", x: 60, y: 70, isPercent: true },
    { id: "bk_12", type: "back", x: 45, y: 75, isPercent: true }
  ],
  "Scrum 5 Yardas": [
    { id: "f_pack1", type: "forward", x: 45, y: 15, isPercent: true }, { id: "f_pack2", type: "forward", x: 50, y: 15, isPercent: true },
    { id: "f_pack3", type: "forward", x: 55, y: 15, isPercent: true }, { id: "f_pack4", type: "forward", x: 50, y: 20, isPercent: true },
    { id: "b1", type: "ball", x: 50, y: 22, isPercent: true },
    { id: "bk_9", type: "back", x: 50, y: 25, isPercent: true }, { id: "bk_10", type: "back", x: 70, y: 35, isPercent: true },
    { id: "bk_12", type: "back", x: 85, y: 45, isPercent: true }
  ],
  "Apertura Rápida": [
    { id: "f1", type: "forward", x: 50, y: 50, isPercent: true }, { id: "f2", type: "forward", x: 52, y: 52, isPercent: true },
    { id: "f3", type: "forward", x: 48, y: 52, isPercent: true }, { id: "b1", type: "ball", x: 50, y: 54, isPercent: true },
    { id: "bk_9", type: "back", x: 45, y: 55, isPercent: true }, { id: "bk_10", type: "back", x: 30, y: 65, isPercent: true },
    { id: "bk_12", type: "back", x: 15, y: 75, isPercent: true }
  ],
  "Defensa Line (Izq)": [
    { id: "f1", type: "forward", x: 15, y: 45, isPercent: true }, { id: "f2", type: "forward", x: 15, y: 48, isPercent: true },
    { id: "f3", type: "forward", x: 15, y: 51, isPercent: true }, { id: "f4", type: "forward", x: 15, y: 54, isPercent: true },
    { id: "bk1", type: "back", x: 30, y: 50, isPercent: true }, { id: "bk2", type: "back", x: 50, y: 50, isPercent: true },
    { id: "bk3", type: "back", x: 70, y: 50, isPercent: true }
  ]
};

const mockClinic = [
  { id: 1, title: "El Tackle Seguro", category: "Tackle", description: "Técnica fundamental para detener al portador de la pelota de forma segura. La prioridad absoluta es la postura del cuerpo y el uso de los brazos para abrazar, evitando siempre golpear con la cabeza.", steps: ["Encuadrar al rival: pies apuntando hacia adelante.", "Mirar al blanco: apuntar la vista a los muslos del portador.", "Impacto: golpear firmemente con el hombro.", "Anillo de hierro: cerrar fuertemente los brazos alrededor de las piernas.", "Llevar al piso y soltar rápidamente para volver al juego."] },
  { id: 2, title: "El Pase Básico (Manos en W)", category: "Pase", description: "El pase clásico para mover la pelota a lo ancho de la cancha. El secreto está en el control desde el agarre y en acompañar el movimiento con los brazos extendidos hacia el objetivo.", steps: ["Agarre: sostener la pelota con ambas manos formando una 'W' con los pulgares.", "Visión: mirar al compañero receptor antes de soltar la pelota.", "Movimiento de péndulo: balancear los brazos desde la cadera hacia el objetivo.", "Acompañamiento: al soltar la pelota, las manos y dedos deben quedar apuntando hacia donde fue el pase."] },
  { id: 3, title: "Presentación de la pelota (Ruck)", category: "Ruck", description: "Acción vital post-tackle para asegurar la posesión. El jugador que cae al piso debe disponibilizar la pelota rápidamente y lo más lejos posible del rival para facilitar la limpieza de su equipo.", steps: ["Caída segura: absorber el impacto cayendo de costado.", "Posición de 'lápiz': estirar todo el cuerpo paralelo a la línea de touch.", "Alejar la pelota: empujar la pelota hacia atrás (hacia tu equipo) extendiendo los brazos.", "Cubrirse: proteger la cabeza con los brazos mientras llegan los apoyos."] },
  { id: 4, title: "Salto y Toma en el Line-out", category: "Line-out", description: "Coordinación entre el lanzador, los levantadores (lifters) y el saltador para obtener la pelota en el lateral. Se busca máxima altura, tensión en el cuerpo y explosión en el salto.", steps: ["Postura del saltador: flexión profunda de piernas, brazos pegados al cuerpo.", "Levantadores: agarre firme por encima de las rodillas (o muslos) del saltador.", "El salto: extensión explosiva del saltador hacia arriba, manteniendo el cuerpo rígido.", "Toma a dos manos: buscar la pelota en el punto más alto y llevarla rápido al pecho al descender."] },
  { id: 5, title: "Pase Corto o 'Pop Pass'", category: "Pase", description: "Pase muy corto y suave que se deja prácticamente suspendido en el aire para un compañero que entra en velocidad cortando la línea de la defensa rival.", steps: ["Fijar la marca: correr derecho hacia el defensor para atraerlo.", "Sostén a dos manos: mantener la pelota cerca del pecho.", "Muñequeo suave: soltar la pelota hacia arriba con un leve toque de muñecas.", "Timing: el receptor debe venir en carrera y tomarla en el aire justo antes del contacto."] }
];

// Función genérica para manejar POSTs
const doPost = async (action, data) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...data })
    });
    return await response.json();
  } catch (error) {
    console.error(`Error en POST ${action}:`, error);
    return null;
  }
};

// Función genérica para manejar GETs
const doGet = async (action) => {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=${action}`);
    return await response.json();
  } catch (error) {
    console.error(`Error en GET ${action}:`, error);
    return null;
  }
};

// ================= EJERCICIOS =================
export const getExercises = async () => {
  const data = await doGet('getExercises');
  const fetchedExercises = Array.isArray(data) ? data : [];
  return [...exercisesMock, ...fetchedExercises];
};

export const saveExercise = async (exercise) => {
  return await doPost('saveExercise', { exercise });
};

// ================= PIZARRA =================
export const getPlays = async () => {
  const data = await doGet('getPlays');
  const customPlays = data || {};
  
  // Guardamos temporalmente en local también para que se vean al instante antes de refrescar
  const localPlays = JSON.parse(localStorage.getItem('rugby_plays') || '{}');
  
  return { ...defaultPlays, ...localPlays, ...customPlays };
};

export const savePlay = async (name, tokens) => {
  // Optimistic UI: save to localStorage first
  const plays = JSON.parse(localStorage.getItem('rugby_plays') || '{}');
  plays[name] = tokens;
  localStorage.setItem('rugby_plays', JSON.stringify(plays));
  
  // Save to Google Sheets
  return await doPost('savePlay', { name, tokens });
};

// ================= CLÍNICA =================
export const getClinicData = async () => {
  const data = await doGet('getClinicData');
  const fetchedClinic = Array.isArray(data) ? data : [];
  return [...mockClinic, ...fetchedClinic];
};

// ================= ASISTENCIA =================
export const getPlayers = async () => {
  const data = await doGet('getPlayers');
  // En asistencia, los de Google Sheets son la fuente de verdad. 
  // Si no hay ninguno, devolver el roster base temporal de localStorage
  if (Array.isArray(data) && data.length > 0) return data;
  
  const localPlayers = localStorage.getItem('rugby_players');
  return localPlayers ? JSON.parse(localPlayers) : [];
};

export const savePlayersList = async (players) => {
  localStorage.setItem('rugby_players', JSON.stringify(players));
  return await doPost('savePlayersList', { players });
};

export const saveAttendance = async (attendanceData) => {
  return await doPost('saveAttendance', { attendanceData, date: new Date().toISOString() });
};
