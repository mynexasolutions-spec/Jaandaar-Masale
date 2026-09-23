import ImageKit from 'imagekit'

// Initialize ImageKit instance
export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
})

export function getImageKitAuth() {
  return imagekit.getAuthenticationParameters()
}
