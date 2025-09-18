import httpClient from './httpClient'

export async function listAllergies() {
  const { data } = await httpClient.get('/api/allergies')
  return data
}

export async function createAllergy({ name }) {
  const { data } = await httpClient.post('/api/allergies', { name })
  return data
}

export async function deleteAllergy(id) {
  await httpClient.delete(`/api/allergies/${id}`)
}

export async function getAllergySuggestions() {
  const { data } = await httpClient.get('/medications/suggestions')
  return data
}
