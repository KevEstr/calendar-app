import { WeekSelectorProps } from '../../types/Event';

/**
 * Componente WeekSelector
 * 
 * Representa un selector de semanas que permite al usuario elegir una semana de entre varias disponibles.
 * 
 * @param {WeekSelectorProps} props - Propiedades del componente:
 *   - weeks: Lista de semanas disponibles para seleccionar (puede ser un arreglo vacío).
 *   - selectedWeek: Índice de la semana actualmente seleccionada.
 *   - onWeekSelect: Función que se ejecuta al seleccionar una semana, recibiendo el índice de la semana seleccionada.
 */
export const WeekSelector = ({ weeks, selectedWeek, onWeekSelect }: WeekSelectorProps) => {
  return (
    <div className="flex justify-center gap-2 pt-6 mb-4">
      {weeks.map((_, index) => (
        <button
          key={index}
          onClick={() => onWeekSelect(index)}
          className={`px-4 py-2 rounded-lg ${
            selectedWeek === index 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
          }`}
        >
          Semana {index + 1}
        </button>
      ))}
    </div>
  );
};
