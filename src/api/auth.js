import client from './client'

export function requestEmailCode(email) {
  return client.post('/auth/email-verifications', { email })
}

export function confirmEmailCode(email, code) {
  return client.post('/auth/email-verifications/confirm', { email, code })
}

export function signup({ email, password, name, nationality }) {
  return client.post('/auth/signup', { email, password, name, nationality })
}

export function login({ email, password }) {
  return client.post('/auth/login', { email, password }).then((res) => res.data)
}

export function logout() {
  return client.post('/auth/logout')
}

export function getMe() {
  return client.get('/auth/me').then((res) => res.data)
}

export function requestPasswordReset(email) {
  return client.post('/auth/password-resets', { email })
}

export function confirmPasswordReset({ email, code, newPassword }) {
  return client.post('/auth/password-resets/confirm', { email, code, newPassword })
}
