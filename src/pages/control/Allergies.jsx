import React, { useState, useEffect } from 'react';
import { Plus, AlertTriangle, Trash2, Shield, Eye } from 'lucide-react';

const medicamentosDisponibles = [
  'Paracetamol',
  'Ibuprofeno',
  'Amoxicilina',
  'Omeprazol',
  'Aspirina',
  'Loratadina',
  'Metformina',
  'Atorvastatina',
  'Penicilina',
  'Cefalexina',
  'Ciprofloxacino',
  'Diclofenaco',
  'Naproxeno',
  'Prednisona',
  'Insulina',
  'Warfarina'
];

const tiposReaccion = [
  'Erupción cutánea',
  'Urticaria',
  'Picazón',
  'Hinchazón facial',
  'Dificultad respiratoria',
  'Náuseas y vómitos',
  'Diarrea',
  'Mareos',
  'Dolor de cabeza',
  'Shock anafiláctico',
  'Fiebre',
  'Dolor abdominal',
  'Confusión mental',
  'Palpitaciones',
  'Otro'
];

const severidad = [
  { valor: 'leve', label: 'Leve', color: 'yellow', descripcion: 'Molestias menores, no requiere tratamiento urgente' },
  { valor: 'moderada', label: 'Moderada', color: 'orange', descripcion: 'Síntomas notables que requieren atención médica' },
  { valor: 'severa', label: 'Severa', color: 'red', descripcion: 'Reacción grave que requiere atención médica inmediata' }
];

function App() {
  const [medicamento, setMedicamento] = useState('');
  const [medicamentoPersonalizado, setMedicamentoPersonalizado] = useState('');
  const [reaccion, setReaccion] = useState('');
  const [reaccionPersonalizada, setReaccionPersonalizada] = useState('');
  const [nivelSeveridad, setNivelSeveridad] = useState('');
  const [notas, setNotas] = useState('');
  const [listaAlergias, setListaAlergias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('alergiasMedicamentos') || '[]');
    setListaAlergias(datosGuardados);
  }, []);

  // Guardar cuando cambia la lista
  useEffect(() => {
    localStorage.setItem('alergiasMedicamentos', JSON.stringify(listaAlergias));
  }, [listaAlergias]);

  const handleAgregar = () => {
    const medicamentoFinal = medicamento === 'Otro' ? medicamentoPersonalizado : medicamento;
    const reaccionFinal = reaccion === 'Otro' ? reaccionPersonalizada : reaccion;
    
    if (!medicamentoFinal || !reaccionFinal || !nivelSeveridad) return;
    
    // Verificar si ya existe esta alergia
    const yaExiste = listaAlergias.some(alergia => 
      alergia.medicamento.toLowerCase() === medicamentoFinal.toLowerCase()
    );
    
    if (yaExiste) {
      alert('Ya existe un registro de alergia para este medicamento. Puedes eliminarlo y agregar uno nuevo si necesitas actualizarlo.');
      return;
    }
    
    const nuevaAlergia = {
      id: Date.now(),
      medicamento: medicamentoFinal,
      reaccion: reaccionFinal,
      severidad: nivelSeveridad,
      notas: notas,
      fechaRegistro: new Date().toISOString()
    };
    
    setListaAlergias([...listaAlergias, nuevaAlergia]);
    
    // Reset campos
    setMedicamento('');
    setMedicamentoPersonalizado('');
    setReaccion('');
    setReaccionPersonalizada('');
    setNivelSeveridad('');
    setNotas('');
    setMostrarFormulario(false);
  };

  const handleEliminar = (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este registro de alergia?');
    if (confirmar) {
      setListaAlergias(prevLista => prevLista.filter(alergia => alergia.id !== id));
    }
  };

  const getSeveridadColor = (severidad) => {
    const config = {
      'leve': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'moderada': 'bg-orange-100 text-orange-800 border-orange-200',
      'severa': 'bg-red-100 text-red-800 border-red-200'
    };
    return config[severidad] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSeveridadIcon = (severidad) => {
    if (severidad === 'severa') return <AlertTriangle className="w-4 h-4" />;
    if (severidad === 'moderada') return <AlertTriangle className="w-4 h-4" />;
    return <Eye className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Control de Alergias</h1>
          <p className="text-gray-600">Registra y gestiona tus alergias a medicamentos</p>
          
          {listaAlergias.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg inline-block">
              <div className="flex items-center text-red-700">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">Tienes {listaAlergias.length} alergia(s) registrada(s)</span>
              </div>
            </div>
          )}
        </div>

        {/* Botón para mostrar formulario */}
        {!mostrarFormulario && (
          <div className="text-center mb-8">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Registrar Nueva Alergia</span>
            </button>
          </div>
        )}

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Plus className="w-6 h-6 mr-2 text-red-600" />
                Registrar Alergia a Medicamento
              </h2>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medicamento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicamento *
                </label>
                <select
                  value={medicamento}
                  onChange={(e) => setMedicamento(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="">-- Selecciona un medicamento --</option>
                  {medicamentosDisponibles.map((med) => (
                    <option key={med} value={med}>
                      {med}
                    </option>
                  ))}
                  <option value="Otro">Otro (especificar)</option>
                </select>
                
                {medicamento === 'Otro' && (
                  <input
                    type="text"
                    value={medicamentoPersonalizado}
                    onChange={(e) => setMedicamentoPersonalizado(e.target.value)}
                    placeholder="Especifica el medicamento"
                    className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                )}
              </div>

              {/* Reacción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Reacción *
                </label>
                <select
                  value={reaccion}
                  onChange={(e) => setReaccion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="">-- Selecciona la reacción --</option>
                  {tiposReaccion.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                
                {reaccion === 'Otro' && (
                  <input
                    type="text"
                    value={reaccionPersonalizada}
                    onChange={(e) => setReaccionPersonalizada(e.target.value)}
                    placeholder="Describe la reacción"
                    className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                )}
              </div>

              {/* Severidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de Severidad *
                </label>
                <div className="space-y-2">
                  {severidad.map((nivel) => (
                    <label key={nivel.valor} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="severidad"
                        value={nivel.valor}
                        checked={nivelSeveridad === nivel.valor}
                        onChange={(e) => setNivelSeveridad(e.target.value)}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                      />
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSeveridadColor(nivel.valor)}`}>
                          {getSeveridadIcon(nivel.valor)}
                          <span className="ml-1">{nivel.label}</span>
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{nivel.descripcion}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Información adicional sobre la reacción, tratamiento recibido, etc."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregar}
                disabled={!medicamento || (!medicamentoPersonalizado && medicamento === 'Otro') || !reaccion || (!reaccionPersonalizada && reaccion === 'Otro') || !nivelSeveridad}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Registrar Alergia</span>
              </button>
            </div>
          </div>
        )}

        {/* Lista de alergias */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
            Mis Alergias Registradas ({listaAlergias.length})
          </h2>

          {listaAlergias.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No hay alergias registradas</p>
              <p className="text-gray-400 text-sm">Es importante registrar tus alergias para evitar reacciones adversas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {listaAlergias.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        <h3 className="font-semibold text-lg text-gray-800">{item.medicamento}</h3>
                        <span className={`ml-3 inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSeveridadColor(item.severidad)}`}>
                          {getSeveridadIcon(item.severidad)}
                          <span className="ml-1 capitalize">{item.severidad}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Reacción:</span>
                          <p className="text-gray-600">{item.reaccion}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Fecha de registro:</span>
                          <p className="text-gray-600">{new Date(item.fechaRegistro).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      {item.notas && (
                        <div className="mt-3 p-3 bg-white rounded-lg border">
                          <span className="font-medium text-gray-700 text-sm">Notas:</span>
                          <p className="text-gray-600 text-sm mt-1">{item.notas}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleEliminar(item.id)}
                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors flex items-center"
                        title="Eliminar registro"
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