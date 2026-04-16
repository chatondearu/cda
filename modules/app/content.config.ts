import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    lab: defineCollection({
      type: 'page',
      source: 'lab/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        status: z.enum(['ARCHIVED', 'INCOMPLETE', 'ACTIVE']),
        tech_stack: z.array(z.string()),
        date: z.string(),
      }),
    }),
  },
})

