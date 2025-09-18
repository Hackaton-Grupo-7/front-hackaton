import axios from 'axios'

const apiBaseURL = import.meta.env.VITE_API_BASE_URL

export const httpClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: false,
})

httpClient.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem('token')
  const tokenType = localStorage.getItem('tokenType') || 'Bearer'
  if (storedToken) {
    config.headers.Authorization = `${tokenType} ${storedToken}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        return Promise.reject(error)
      }
      try {
        const refreshResponse = await axios.post('/api/auth/refresh', { refreshToken })
        const newToken = refreshResponse.data?.token
        const newRefreshToken = refreshResponse.data?.refreshToken
        if (newToken) {
          localStorage.setItem('token', newToken)
        }
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken)
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return httpClient(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient


