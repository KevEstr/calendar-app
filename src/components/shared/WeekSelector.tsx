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
      {/* Botones para cada semana */}
      {weeks.map((_, index) => (
        <button
          key={index}
          onClick={() => onWeekSelect(index)} // Llama a la función onWeekSelect con el índice seleccionado
          className={`px-4 py-2 rounded-lg ${
            selectedWeek === index 
              ? "bg-blue-600 text-white" // Estilo para la semana seleccionada
              : "bg-gray-100 hover:bg-gray-200" // Estilo para las semanas no seleccionadas
          }`}
        >
          {/* Etiqueta del botón mostrando el número de la semana */}
          Semana {index + 1}
        </button>
      ))}
    </div>
  );
};
