import axios from "axios";
import { Skill, SkillSchema } from "../types";

export const getSkills = async () => {
	return new Promise<Skill[]>((resolve, reject) => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3355/skills"
				);
				if (response.status === 200) {
					const _rawSkills: Skill[] = response.data;
					const _skills: Skill[] = [];
					for (const _rawSkill of _rawSkills) {
						const parseResult = SkillSchema.safeParse(_rawSkill);
						if (parseResult.success) {
							const _skill: Skill = {
								id: _rawSkill.id,
								idCode: _rawSkill.idCode.trim(),
								name: _rawSkill.name.trim(),
								description: _rawSkill.description.trim(),
								url: _rawSkill.url.trim(),
							};
							_skills.push(_skill);
						} else {
							let r = "";
							r += `INVALID SKILL IN IMPORT: ${JSON.stringify(
								_rawSkill,
								null,
								2
							)}\n`;
							parseResult.error.errors.forEach((err) => {
								r += `Error in field "${err.path.join(
									"."
								)}" - ${err.message}\n`;
							});
							console.error(r);
						}
					}
					resolve(_skills);
				}
			} catch (e: unknown) {
				if (e instanceof Error) {
					reject(`ERROR: ${e.message}`);
				} else {
					reject(`UNKNOWN ERROR: ${e}`);
				}
			}
		})();
	});
};
