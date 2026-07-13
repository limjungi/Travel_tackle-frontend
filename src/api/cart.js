import client from './client'

export function addCartItem(contentId) {
  return client.post('/cart-items', { contentId }).then((res) => res.data)
}
