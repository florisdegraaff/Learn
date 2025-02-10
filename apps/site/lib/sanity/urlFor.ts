import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: 'tksen46a',
  dataset: 'production',
})

export function urlFor(source: any) {
  return builder.image(source)
}