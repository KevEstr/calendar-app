import { useState, useEffect } from 'react';
import { Holiday } from '../types/Holiday';

/**
 * Hook personalizado para obtener los días festivos de Colombia.
 * @param year - Año para el cual se consultan los días festivos.
 * @returns {Holiday[]} - Lista de días festivos con su fecha y nombre.
 */
export const useHolidays = (year: number) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  /**
   * Obtiene los días festivos desde una API externa y actualiza el estado.
   */
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`https://api-colombia.com/api/v1/holiday/year/${year}`);
        const data = await response.json();
        console.log('Raw holiday data:', data);

        setHolidays(
          data.map((holiday: Holiday) => {
            const mappedHoliday = {
              date: holiday.date,
              name: holiday.name,
            };
            return mappedHoliday;
          })
        );
      } catch (error) {
        console.error('Error al obtener los días festivos:', error);
      }
    };

    fetchHolidays();
}, [year]);

  return holidays;
};
