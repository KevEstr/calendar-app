import { useState, useEffect } from 'react';

interface Holiday {
  date: string;
  name: string;
}

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

        // Mapea los datos recibidos a un formato más manejable.
        setHolidays(
          data.map((holiday: Holiday) => ({
            date: holiday.date,
            name: holiday.name,
          }))
        );
      } catch (error) {
        console.error('Error al obtener los días festivos:', error);
      }
    };

    fetchHolidays(); // Llama a la función para cargar los datos.
  }, [year]); // Se ejecuta cada vez que el año cambia.

  return holidays;
};
