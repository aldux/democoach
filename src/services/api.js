// ============================================================================
// CONEXIÓN A GOOGLE SHEETS / APPS SCRIPT BACKEND
// ============================================================================

// TODO: Reemplaza esta URL con la que te dará Google Apps Script al publicar
export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx2y516LdLvqiy_we3sU5vE5SihJY9aZDhkRsB3GtFMSkOGKwswqgHOICGthuN-fE0/exec';

// Función genérica para manejar POSTs
const doPost = async (action, data) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      // 'no-cors' mode is often needed for simple Apps Script deployments from browser,
      // but 'no-cors' prevents reading the response. For a full API, you usually configure CORS 
      // in the Apps Script or use 'text/plain' to avoid preflight options. 
      // The best practice for Web Apps is simple POST requests using 'application/x-www-form-urlencoded' 
      // or handling CORS manually in Apps Script.
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
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
    return [];
  }
};

// ================= EJERCICIOS =================
export const getExercises = async () => {
  if (SCRIPT_URL.includes('TU_SCRIPT_ID')) return []; // Prevención antes de conectar
  return await doGet('getExercises') || [];
};

export const saveExercise = async (exercise) => {
  return await doPost('saveExercise', { exercise });
};

// ================= PIZARRA =================
export const getPlays = async () => {
  if (SCRIPT_URL.includes('TU_SCRIPT_ID')) return {}; 
  const result = await doGet('getPlays');
  return result || {};
};

export const savePlay = async (name, tokens) => {
  return await doPost('savePlay', { name, tokens });
};

// ================= CLÍNICA =================
export const getClinicData = async () => {
  if (SCRIPT_URL.includes('TU_SCRIPT_ID')) return []; 
  return await doGet('getClinicData') || [];
};

// ================= ASISTENCIA =================
export const getPlayers = async () => {
  if (SCRIPT_URL.includes('TU_SCRIPT_ID')) return []; 
  return await doGet('getPlayers') || [];
};

export const savePlayersList = async (players) => {
  return await doPost('savePlayersList', { players });
};

export const saveAttendance = async (attendanceData) => {
  return await doPost('saveAttendance', { attendanceData, date: new Date().toISOString() });
};
