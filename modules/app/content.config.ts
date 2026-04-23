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
      source: 'archive/*/*.md',
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
        locale: z.enum(['fr', 'en', 'zh', 'ja']),
        tier: z.enum(['featured', 'other']),
        order: z.number(),
      }),
    }),
    career_timeline: defineCollection({
      type: 'page',
      source: 'career/*/*.md',
      schema: z.object({
        slug: z.string(),
        locale: z.enum(['fr', 'en', 'zh', 'ja']),
        period: z.string(),
        title: z.string(),
        reference: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        layout: z.enum(['a', 'b']),
        order: z.number(),
      }),
    }),
    streamer_timeline: defineCollection({
      type: 'page',
      source: 'streamer-timeline/*/*.md',
      schema: z.object({
        slug: z.string(),
        locale: z.enum(['fr', 'en', 'zh', 'ja']),
        period: z.string(),
        title: z.string(),
        reference: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        layout: z.enum(['a', 'b']),
        order: z.number(),
      }),
    }),
  },
})
