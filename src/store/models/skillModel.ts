import { action, Action, thunk, Thunk } from "easy-peasy";
import { Skill } from "../../types";
import * as dataModel from "../dataModel";

export interface SkillModel {
	// state
	skills: Skill[];

	// computed values

	// actions
	setSkills: Action<this, Skill[]>;
	saveSkill: Action<this, Skill>;

	// thunks
	loadSkillsThunk: Thunk<this>;
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

	// thunks
	loadSkillsThunk: thunk((actions) => {
		(async () => {
			const _skills = await dataModel.getSkills();
			actions.setSkills(_skills);
		})();
	}),
};
