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
					const _rawSkills: unknown[] = response.data;
					const _skills: Skill[] = [];
					for (const _rawSkill of _rawSkills) {
						const parseResult = SkillSchema.safeParse(_rawSkill);
						if (parseResult.success) {
							const {id, idCode, name, description, url} =
								parseResult.data;
							const _skill: Skill = {
								id: id,
								idCode: idCode.trim(),
								name: name.trim(),
								description: description.trim(),
								url: url.trim(),
								isOpen: false
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
