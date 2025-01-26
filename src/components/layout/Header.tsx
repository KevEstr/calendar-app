import { CalendarIcon, Layout, List } from 'lucide-react';

interface HeaderProps {
  currentView: "month" | "week" | "day" | "agenda";
  setCurrentView: (view: "month" | "week" | "day" | "agenda") => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMenuClick: () => void;
}

export const Header = ({
  currentView,
  setCurrentView,
}: HeaderProps) => {
  const viewOptions = [
    { icon: CalendarIcon, label: "Mes", view: "month" as const },
    { icon: List, label: "Semana", view: "week" as const },
    { icon: Layout, label: "Agenda", view: "agenda" as const },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 md:px-6 py-4 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Mi Calendario</h1>
          </div>

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
