const CDN_URL = 'https://cdn.3o3.co.kr/assets'

export function getAssetUrl(path: string, name: string, ext: string) {
  return `${CDN_URL}/${path}/${name}.${ext}`
}

export function getFontUrl(name: string, ext = 'woff2') {
  return getAssetUrl('fonts', name, ext)
}

export function getImageUrl(name: string, ext = 'png') {
  return getAssetUrl('images', name, ext)
}

export function getIconImageUrl(name: string, ext = 'png') {
  return getAssetUrl('images/icons', name, ext)
}

export function getCardImageUrl(name: string, ext = 'png') {
  return getAssetUrl('images/cards', name, ext)
}
