import React, { useState, useEffect } from 'react';
import { Plus, Pill, Clock, Bell, BellOff, Trash2, RotateCcw } from 'lucide-react';

const medicamentosDisponibles = [
  'Paracetamol',
  'Ibuprofeno',
  'Amoxicilina',
  'Omeprazol',
  'Aspirina',
  'Loratadina',
  'Metformina',
  'Atorvastatina'
];

function App() {
  const [medicamento, setMedicamento] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [alarma, setAlarma] = useState(false);
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [notificacionPermitida, setNotificacionPermitida] = useState(false);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem('medicamentos');
    if (datosGuardados) {
      setListaMedicamentos(JSON.parse(datosGuardados));
    }

    // Verificar si las notificaciones están permitidas
    if ('Notification' in window) {
      setNotificacionPermitida(Notification.permission === 'granted');
    }
  }, []);

  // Guardar en localStorage cuando cambia la lista
  useEffect(() => {
    localStorage.setItem('medicamentos', JSON.stringify(listaMedicamentos));
  }, [listaMedicamentos]);

  // Solicitar permiso para notificaciones
  const solicitarPermisoNotificaciones = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificacionPermitida(permission === 'granted');
        if (permission === 'granted') {
          mostrarNotificacion('Permiso concedido', 'Ahora recibirás recordatorios de tus medicamentos.');
        }
      });
    }
  };

  // Mostrar notificación
  const mostrarNotificacion = (titulo, mensaje) => {
    if (notificacionPermitida) {
      new Notification(titulo, {
        body: mensaje,
        icon: '/pill-icon.png' // Puedes agregar un icono
      });
    }
  };

  const handleAgregar = () => {
    if (!medicamento || !frecuencia) return;
    
    const nuevoMedicamento = {
      id: Date.now(),
      nombre: medicamento,
      horas: parseInt(frecuencia),
      alarma: alarma,
      fechaCreacion: new Date(),
      ultimaToma: null,
      proximaToma: new Date(Date.now() + (parseInt(frecuencia) * 60 * 60 * 1000))
    };
    
    setListaMedicamentos([...listaMedicamentos, nuevoMedicamento]);
    
    // Reset campos
    setMedicamento('');
    setFrecuencia('');
    setAlarma(false);

    // Mostrar notificación si está activada
    if (alarma && notificacionPermitida) {
      mostrarNotificacion(
        'Medicamento agregado', 
        `Recordatorio activado para ${medicamento} cada ${frecuencia} horas.`
      );
    }
  };

  const handleEliminar = (id) => {
    const medicamento = listaMedicamentos.find(med => med.id === id);
    setListaMedicamentos(listaMedicamentos.filter(med => med.id !== id));
    
    if (medicamento.alarma && notificacionPermitida) {
      mostrarNotificacion(
        'Medicamento eliminado', 
        `Se eliminó ${medicamento.nombre} de tu lista.`
      );
    }
  };

  const registrarToma = (id) => {
    setListaMedicamentos(listaMedicamentos.map(med => {
      if (med.id === id) {
        const ahora = new Date();
        const nuevaProximaToma = new Date(ahora.getTime() + (med.horas * 60 * 60 * 1000));
        
        if (med.alarma && notificacionPermitida) {
          mostrarNotificacion(
            'Toma registrada', 
            `Has tomado ${med.nombre}. Próxima dosis a las ${nuevaProximaToma.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
          );
        }
        
        return {
          ...med,
          ultimaToma: ahora,
          proximaToma: nuevaProximaToma
        };
      }
      return med;
    }));
  };

  const calcularTiempoRestante = (proximaToma) => {
    const ahora = new Date();
    const diferencia = proximaToma - ahora;
    
    if (diferencia <= 0) return "¡Ahora!";
    
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas}h ${minutos}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Control de Medicamentos</h1>
          <p className="text-gray-600">Gestiona tu medicación de forma sencilla y segura</p>
          
          {!notificacionPermitida && (
            <button
              onClick={solicitarPermisoNotificaciones}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Activar recordatorios
            </button>
          )}
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-blue-600" />
            Agregar Medicamento
          </h2>
          
          <div className="space-y-4">
            {/* Selector de medicamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona un medicamento
              </label>
              <select
                value={medicamento}
                onChange={(e) => setMedicamento(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">-- Selecciona un medicamento --</option>
                {medicamentosDisponibles.map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            {/* Frecuencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cada cuántas horas
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                placeholder="Ej: 8 horas"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Checkbox de alarma */}
            <div className="flex items-center space-x-3">
              <input
                id="alarma"
                type="checkbox"
                checked={alarma}
                onChange={(e) => setAlarma(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="alarma" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                {alarma ? <Bell className="w-4 h-4 mr-1" /> : <BellOff className="w-4 h-4 mr-1" />}
                Activar recordatorio
              </label>
            </div>

            {/* Botón agregar */}
            <button
              onClick={handleAgregar}
              disabled={!medicamento || !frecuencia}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Medicamento</span>
            </button>
          </div>
        </div>

        {/* Lista de medicamentos */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Pill className="w-6 h-6 mr-2 text-green-600" />
            Mis Medicamentos ({listaMedicamentos.length})
          </h2>

          {listaMedicamentos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No hay medicamentos agregados</p>
              <p className="text-gray-400 text-sm">Agrega tu primer medicamento usando el formulario de arriba</p>
            </div>
          ) : (
            <div className="space-y-4">
              {listaMedicamentos.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-blue-600" />
                        {item.nombre}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Cada {item.horas} {item.horas === 1 ? 'hora' : 'horas'}
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          {item.alarma ? (
                            <>
                              <Bell className="w-4 h-4 mr-2 text-green-600" />
                              <span className="text-green-600">Recordatorio activado</span>
                            </>
                          ) : (
                            <>
                              <BellOff className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-gray-500">Sin recordatorio</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-white rounded-lg border">
                        <div className="text-sm font-medium text-gray-700 mb-1">Próxima dosis:</div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-semibold">
                            {item.proximaToma.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {calcularTiempoRestante(item.proximaToma)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => registrarToma(item.id)}
                        className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors flex items-center"
                        title="Registrar toma"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleEliminar(item.id)}
                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors flex items-center"
                        title="Eliminar medicamento"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;