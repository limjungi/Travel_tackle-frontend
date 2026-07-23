import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    // /auth/me는 만료된 액세스 토큰을 refresh로 살려 재시도 (로그인·refresh 자체의 401은 재시도 금지)
    const isAuthEndpoint = original.url?.includes('/auth/') && !original.url?.includes('/auth/me')
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
