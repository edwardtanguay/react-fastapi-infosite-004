import { z } from "zod";

export const RawSkillSchema = z.object({
	id: z.number(),
	idCode: z.string(),
	name: z.string(),
	description: z.string(),
	url: z.string().url(),
});

export const SkillSchema = RawSkillSchema.extend({
	isOpen: z.boolean()
})

export type RawSkill = z.infer<typeof RawSkillSchema>;
export type Skill = z.infer<typeof SkillSchema>;
