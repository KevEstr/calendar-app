import { CalendarIcon, Layout, List } from 'lucide-react';
import { HeaderProps } from '../../types/Layout';

/**
 * Componente Header
 * 
 * Muestra la barra de encabezado del calendario con opciones de vista (Mes, Semana, Agenda).
 * 
 * @param {HeaderProps} props - Propiedades del componente:
 *   - currentView: Vista actual seleccionada (month, week, agenda).
 *   - setCurrentView: Función para cambiar la vista actual.
 */
export const Header = ({
  currentView,
  setCurrentView,
}: HeaderProps) => {
  // Opciones de vista disponibles para el calendario
  const viewOptions = [
    { icon: CalendarIcon, label: "Mes", view: "month" as const },
    { icon: List, label: "Semana", view: "week" as const },
    { icon: Layout, label: "Agenda", view: "agenda" as const },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 md:px-6 py-4 space-y-4 md:space-y-0">
          
          {/* Título del calendario */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Mi Calendario
            </h1>
          </div>

          {/* Selector de vista */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
              {viewOptions.map(({ icon: Icon, label, view }) => (
                <button
                  key={label}
                  onClick={() => setCurrentView(view)}
                  className={` 
                    flex items-center justify-center px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base rounded-lg transition-all flex-1 sm:flex-auto
                    ${currentView === view ? "bg-white text-blue-600 shadow-sm" : "hover:bg-white/50"}
                  `}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 sm:mr-2" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
