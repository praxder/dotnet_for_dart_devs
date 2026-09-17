import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    day: z.number(),
    week: z.number(),
    module: z.number(),
    moduleName: z.string(),
    phase: z.enum(['csharp', 'dotnet']),
    dartConcept: z.string().optional(),
    csharpConcept: z.string(),
    learningObjectives: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    sources: z.array(z.string().url()).optional(),
    estimatedMinutes: z.number().default(30),
    isProject: z.boolean().default(false),
    projectType: z.enum(['mini', 'capstone']).optional(),
  }),
});

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    flutterAnalogy: z.string(),
    relatedDays: z.array(z.number()).default([]),
  }),
});

export const collections = { lessons, concepts };
