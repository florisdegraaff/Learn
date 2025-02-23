import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Learn',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || "development",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
