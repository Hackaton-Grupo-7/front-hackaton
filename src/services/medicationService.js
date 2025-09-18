import httpClient from './httpClient'

export async function listMedications() {
  const { data } = await httpClient.get('/medications')
  return data
}

export async function listMedicationsByUser(userId) {
  if (!userId) {
    const { data } = await httpClient.get('/medications')
    return data
  }
  // Try common REST patterns; if not available, fallback with client-side filter
  try {
    const { data } = await httpClient.get(`/api/users/${userId}/medications`)
    return data
  } catch {
    try {
      const { data } = await httpClient.get(`/medications`, { params: { userId } })
      return data
    } catch {
      const { data } = await httpClient.get('/medications')
      if (Array.isArray(data)) {
        return data.filter((m) => m.userId === userId || m?.user?.id === userId)
      }
      return data
    }
  }
}

export async function createMedication({ name, dose, hour, description }) {
  const { data } = await httpClient.post('/medications', { name, dose, hour, description })
  return data
}

export async function deleteMedication(id) {
  await httpClient.delete(`/medications/${id}`)
}

export async function markMedicationTaken(id) {
  const { data } = await httpClient.put(`/medications/${id}/taken`)
  return data
}

export async function getMedicationById(id) {
  const { data } = await httpClient.get(`/medications/${id}`)
  return data
}

export async function getMedicationSuggestions() {
  const { data } = await httpClient.get('/medications/suggestions')
  return data
}


