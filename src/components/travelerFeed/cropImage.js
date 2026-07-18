function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = src
  })
}

// react-easy-crop의 onCropComplete가 주는 croppedAreaPixels(원본 이미지 픽셀 기준 영역)를
// canvas에 그려서 잘라낸 이미지의 blob URL을 반환한다.
export async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('이미지를 자르지 못했어요.'))
        return
      }
      resolve(URL.createObjectURL(blob))
    }, 'image/jpeg')
  })
}
