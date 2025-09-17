import React, { useState } from 'react';
import { Pill, Bell, AlertTriangle, Clock, ChevronRight, Activity, Shield, Calendar, Users } from 'lucide-react';

const menuOptions = [
  {
    id: 'medicamentos',
    title: 'Medicamentos',
    description: 'Gestiona tu lista de medicamentos y dosis',
    icon: Pill,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-indigo-100',
    features: ['Lista de medicamentos', 'Control de dosis', 'Historial de tomas']
  },
  {
    id: 'alarmas',
    title: 'Alarmas',
    description: 'Configura recordatorios para tus medicamentos',
    icon: Bell,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-emerald-100',
    features: ['Recordatorios automáticos', 'Notificaciones push', 'Horarios personalizados']
  },
  {
    id: 'alergias',
    title: 'Alergias',
    description: 'Registra y controla tus alergias a medicamentos',
    icon: AlertTriangle,
    color: 'red',
    gradient: 'from-red-500 to-red-600',
    bgGradient: 'from-red-50 to-pink-100',
    features: ['Registro de alergias', 'Tipos de reacciones', 'Niveles de severidad']
  },
  {
    id: 'horarios',
    title: 'Horarios',
    description: 'Organiza tus horarios de medicación',
    icon: Clock,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-indigo-100',
    features: ['Calendario médico', 'Planificación semanal', 'Seguimiento diario']
  }
];

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (option) => {
    alert(`Navegando a ${option.title}...`);
    // Aquí implementarías la navegación real a cada sección
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200',
        hover: 'hover:bg-green-50'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200',
        hover: 'hover:bg-red-50'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Centro de Salud
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu plataforma integral para el control y seguimiento de medicamentos, alergias y horarios de tratamiento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Medicamentos</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Alarmas Activas</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Alergias</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Próxima Toma</p>
                <p className="text-sm font-semibold text-gray-900">No programada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {menuOptions.map((option) => {
            const Icon = option.icon;
            const colorClasses = getColorClasses(option.color);
            
            return (
              <div
                key={option.id}
                onClick={() => handleCardClick(option)}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative group cursor-pointer transition-all duration-300 transform
                  ${hoveredCard === option.id ? 'scale-105 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
                `}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.bgGradient} rounded-2xl opacity-50`}></div>
                
                {/* Card Content */}
                <div className="relative bg-white rounded-2xl p-8 border border-gray-200 h-full">
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${option.gradient} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <ChevronRight 
                      className={`
                        w-6 h-6 text-gray-400 transition-all duration-300
                        ${hoveredCard === option.id ? 'text-gray-600 translate-x-1' : ''}
                      `} 
                    />
                  </div>

                  {/* Title and Description */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                      {option.title}
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Características
                    </h3>
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full ${colorClasses.bg} mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <div className={`
                      w-full py-3 px-4 rounded-xl border-2 text-center font-semibold transition-all duration-300
                      ${colorClasses.border} ${colorClasses.text} ${colorClasses.bg} ${colorClasses.hover}
                      group-hover:shadow-md
                    `}>
                      Acceder a {option.title}
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className={`
                    absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${option.gradient} rounded-t-2xl
                    transform origin-left transition-transform duration-300
                    ${hoveredCard === option.id ? 'scale-x-100' : 'scale-x-0'}
                  `}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Información Importante</h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Esta plataforma está diseñada para ayudarte a gestionar tu medicación de forma segura y eficiente. 
              Siempre consulta con tu médico antes de realizar cambios en tu tratamiento. En caso de emergencia 
              médica, contacta inmediatamente a los servicios de emergencia de tu localidad.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Disponible en móvil</span>
              <span>🔒 Datos seguros</span>
              <span>⏰ Recordatorios inteligentes</span>
              <span>📊 Seguimiento detallado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;