/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type OpenQuestion = {
  _type: "openQuestion";
  question: string;
  answer: string;
};

export type MultipleChoiceQuestion = {
  _type: "multipleChoiceQuestion";
  question: string;
  answers: Array<{
    answer: string;
    isCorrect?: boolean;
    _key: string;
  }>;
  becomesOpen?: boolean;
};

export type Program = {
  _id: string;
  _type: "program";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  courses?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "course";
  }>;
};

export type Section = {
  _type: "section";
  title?: string;
  questions: Array<{
    _key: string;
  } & MultipleChoiceQuestion | {
    _key: string;
  } & OpenQuestion>;
};

export type Course = {
  _id: string;
  _type: "course";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  sections?: Array<{
    _key: string;
  } & Section>;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityImageHotspot | SanityImageCrop | SanityFileAsset | SanityImageAsset | SanityImageMetadata | Geopoint | SanityAssetSourceData | OpenQuestion | MultipleChoiceQuestion | Program | Section | Course | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../site/lib/sanity/queries.ts
// Variable: COURSES_QUERY
// Query: *[_type == "course"]
export type COURSES_QUERYResult = Array<{
  _id: string;
  _type: "course";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  sections?: Array<{
    _key: string;
  } & Section>;
}>;
// Variable: COURSE_BY_SLUG_QUERY
// Query: *[_type == "course" && slug.current == $courseSlug][0]
export type COURSE_BY_SLUG_QUERYResult = {
  _id: string;
  _type: "course";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  sections?: Array<{
    _key: string;
  } & Section>;
} | null;
// Variable: THEME_BY_SLUG_QUERY
// Query: *[_type == "course" && slug.current == $courseSlug][0].themes[slug.current == $themeSlug][0]
export type THEME_BY_SLUG_QUERYResult = null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"course\"]": COURSES_QUERYResult;
    "*[_type == \"course\" && slug.current == $courseSlug][0]": COURSE_BY_SLUG_QUERYResult;
    "*[_type == \"course\" && slug.current == $courseSlug][0].themes[slug.current == $themeSlug][0]": THEME_BY_SLUG_QUERYResult;
  }
}
