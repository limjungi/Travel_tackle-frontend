import client from './client'

export function getTourContents(params) {
  return client.get('/tour/contents', { params }).then((res) => res.data)
}

export function getTourContentDetail(contentId) {
  return client.get(`/tour/contents/${contentId}`).then((res) => res.data)
}

export function getTourAreas(areaCode) {
  return client.get('/tour/areas', { params: { areaCode } }).then((res) => res.data)
}
