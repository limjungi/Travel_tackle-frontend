import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    const isAuthEndpoint = original.url?.includes('/auth/')
    if (err.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true
      try {
        await axios.post('/api/auth/refresh', {}, { withCredentials: true })
        return client(original)
      } catch {
        // not logged in — let the caller's own .catch() handle the fallback
      }
    }
    return Promise.reject(err)
  }
)

export default client
