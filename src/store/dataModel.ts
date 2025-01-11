import axios from "axios";
import { Skill } from "../types";

export const getSkills = async () => {
	return new Promise<Skill[]>((resolve, reject) => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3355/skills"
				);
				if (response.status === 200) {
					const _skills: Skill[] = response.data;
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
