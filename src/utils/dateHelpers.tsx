/**
 * Obtiene el número de días en un mes específico.
 * 
 * @param {Date} date - Fecha de referencia, de la cual se extrae el mes y el año.
 * @returns {number} - Número de días en el mes correspondiente a la fecha proporcionada.
 * 
 * Ejemplo:
 * getDaysInMonth(new Date(2025, 0, 1)) // Devuelve 31 para el mes de enero de 2025.
 */
export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Obtiene el día de la semana en el que comienza el mes (0 = Domingo, 1 = Lunes, etc.).
 * 
 * @param {Date} date - Fecha de referencia, de la cual se extrae el mes y el año.
 * @returns {number} - Día de la semana del primer día del mes (0-6).
 * 
 * Ejemplo:
 * getFirstDayOfMonth(new Date(2025, 0, 1)) // Devuelve 3, lo que indica que el 1 de enero de 2025 es un miércoles.
 */
export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

/**
 * Calcula las semanas de un mes, considerando el primer y último día del mes.
 * 
 * @param {Date} date - Fecha de referencia, de la cual se extrae el mes y el año.
 * @returns {Array} - Un array de semanas, donde cada semana es un array de días (del 1 al 31), 
 *                    y se rellena con null para los días vacíos antes del primer día del mes.
 * 
 * Ejemplo:
 * getWeeksInMonth(new Date(2025, 0, 1)) // Devuelve las semanas de enero de 2025, considerando días vacíos al principio del mes.
 */
export const getWeeksInMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const weeks = [];
  let currentWeek = [];
  
  // Agrega días vacíos hasta llegar al primer día del mes.
  for (let i = 0; i < firstDay.getDay(); i++) {
    currentWeek.push(null);
  }
  
  // Agrega todos los días del mes.
  for (let day = 1; day <= lastDay.getDate(); day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Agrega los días restantes si no completan una semana completa.
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  return weeks;
};

/**
 * Verifica si un día específico es el día de hoy.
 * 
 * @param {number} day - Día del mes a comparar.
 * @param {Date} currentDate - Fecha de referencia para obtener el mes y el año.
 * @returns {boolean} - Devuelve true si el día especificado es hoy, de lo contrario false.
 * 
 * Ejemplo:
 * isToday(15, new Date(2025, 0, 1)) // Devuelve true si hoy es 15 de enero de 2025.
 */
export const isToday = (day: number, currentDate: Date) => {
  const today = new Date();
  return today.getDate() === day && 
         today.getMonth() === currentDate.getMonth() && 
         today.getFullYear() === currentDate.getFullYear();
};
