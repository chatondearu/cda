import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    cda_lab: defineCollection({
      type: 'page',
      source: 'cda_lab/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        status: z.enum(['ARCHIVED', 'INCOMPLETE', 'ACTIVE']),
        tech_stack: z.array(z.string()),
        date: z.string(),
      }),
    }),
    archive: defineCollection({
      type: 'page',
      source: 'archive/**/*.md',
      schema: z.object({
        slug: z.string(),
        capsule: z.string(),
        title: z.string(),
        status: z.enum(['nominal', 'unfinished']),
        description: z.string(),
        tech: z.string(),
        image: z.string(),
        repo_url: z.string().url(),
        github_topics: z.array(z.string()).default([]),
        github_pinned: z.boolean().default(false),
        project_url: z.string().url().optional(),
        tier: z.enum(['featured', 'other']),
        order: z.number(),
      }),
    }),
  },
})
