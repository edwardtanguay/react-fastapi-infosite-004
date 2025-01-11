import { action, Action, thunk, Thunk } from "easy-peasy";
import { Skill } from "../../types";
import * as dataModel from "../dataModel";
import axios from "axios";

export interface SkillModel {
	// state
	skills: Skill[];

	// computed values

	// actions
	setSkills: Action<this, Skill[]>;
	saveSkill: Action<this, Skill>;
	_deleteSkill: Action<this, Skill>;

	// thunks
	loadSkillsThunk: Thunk<this>;
	deleteSkillThunk: Thunk<this, Skill>;
}

export const skillModel: SkillModel = {
	// state
	skills: [],

	// actions
	setSkills: action((state, skills) => {
		state.skills = structuredClone(skills);
	}),
	saveSkill: action((state, skill) => {
		const index = state.skills.findIndex((s) => s.id === skill.id);
		if (index !== -1) {
			state.skills[index] = structuredClone(skill);
		}
	}),
	_deleteSkill: action((state, skill) => {
		const index = state.skills.findIndex((s) => s.id === skill.id);
		if (index !== -1) {
			state.skills.splice(index, 1);
		}
	}),

	// thunks
	loadSkillsThunk: thunk((actions) => {
		(async () => {
			const _skills = await dataModel.getSkills();
			actions.setSkills(_skills);
		})();
	}),
	deleteSkillThunk: thunk((actions, skill) => {
		try {
			(async () => {
				const response = await axios.delete(
					`http://localhost:3355/skills/${skill.id}`
				);

				if (response.status === 200) {
					actions._deleteSkill(skill);
					console.log("Skill deleted successfully");
				} else {
					console.error("Failed to delete the skill");
				}
			})();
		} catch (error) {
			console.error("Error deleting skill:", error);
		}
	}),
};
