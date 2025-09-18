export function setAuthToken(token) {
  if (token) localStorage.setItem('token', token)
}

export function setRefreshToken(refreshToken) {
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

export function setUser(user) {
  if (user) localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
  const raw = localStorage.getItem('user')
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}

export function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}


