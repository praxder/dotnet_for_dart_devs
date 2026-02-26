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
    estimatedMinutes: z.number().default(30),
    isProject: z.boolean().default(false),
    projectType: z.enum(['mini', 'capstone']).optional(),
  }),
});

export const collections = { lessons };
