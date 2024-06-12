import { z } from "zod";
import AdLocationSchema from "./AdLocation";

const AdSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	images: z.array(z.string().url()).min(1).max(5),
	targetLink: z.string().url().optional(),
	location: AdLocationSchema,
	state: z.enum(['private', 'public']).default('private'),
	createdAt: z.date(),
});

type Ad = z.infer<typeof AdSchema>;

export default AdSchema;

export type { Ad };
