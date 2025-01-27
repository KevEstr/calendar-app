// Importación de iconos de navegación de la librería 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importación de las propiedades tipadas para el componente CalendarHeader
import { CalendarHeaderProps } from '../../types/Calendar';

/**
 * Componente que representa el encabezado del calendario.
 * 
 * Funcionalidades clave:
 * - Muestra el mes y año actuales en formato legible.
 * - Permite la navegación entre meses mediante botones de anterior y siguiente.
 * 
 * @param {CalendarHeaderProps} props - Propiedades del componente, incluyendo:
 *   - currentStoreDate: Fecha actual del calendario.
 *   - onPrevMonth: Función para retroceder un mes.
 *   - onNextMonth: Función para avanzar un mes.
 */
export const CalendarHeader = ({ 
  currentStoreDate, 
  onPrevMonth, 
  onNextMonth 
}: CalendarHeaderProps) => {
  return (
    <div className="text-center py-6 md:py-8 border-b">
      <div className="flex items-center justify-center gap-4">
        
        {/* Botón para retroceder al mes anterior */}
        <div className="flex gap-1">
          <button 
            onClick={onPrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
          </button>
        </div>

        {/* Muestra el mes y el año actual en formato "Mes Año" */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          {currentStoreDate.toLocaleString('es-ES', { 
            month: 'long',  // Muestra el nombre completo del mes en español
            year: 'numeric' // Muestra el año en formato numérico
          }).replace(/^\w/, (c: string) => c.toUpperCase())} {/* Capitaliza la primera letra del mes */}
        </h2>

        {/* Botón para avanzar al mes siguiente */}
        <button 
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
        </button>

      </div>
    </div>
  );
};
