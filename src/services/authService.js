import httpClient from './httpClient'

export async function login({ username, password }) {
  const { data } = await httpClient.post('/api/auth/login', { username, password })
  return data
}

export async function register({ username, name, email, password }) {
  const { data } = await httpClient.post('/api/auth/register', { username, name, email, password })
  return data
}

export async function logout() {
  const { data } = await httpClient.post('/api/auth/logout')
  return data
}

export async function refresh(refreshToken) {
  const { data } = await httpClient.post('/api/auth/refresh', { refreshToken })
  return data
}


