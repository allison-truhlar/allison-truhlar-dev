import { z, defineCollection } from "astro:content";
const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  url: z.string().optional(),
  urlText: z.string().optional(),
  githubRepo: z.string().optional(),
});

export type NoteSchema = z.infer<typeof noteSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;

const noteCollection = defineCollection({ schema: noteSchema });
const projectCollection = defineCollection({ schema: projectSchema });

export const collections = {
  notes: noteCollection,
  projects: projectCollection,
};
