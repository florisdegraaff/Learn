import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || '',
})

export function urlFor(source: any) {
  return builder.image(source)
}