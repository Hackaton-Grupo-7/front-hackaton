import httpClient from './httpClient'

export async function getMyUser() {
  const { data } = await httpClient.get('/api/users/my-user')
  return data
}

export async function listAllUsers() {
  const { data } = await httpClient.get('/api/users')
  return data
}


