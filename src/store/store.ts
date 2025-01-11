import { createStore } from "easy-peasy";
import { mainModel, MainModel } from "./models/mainModel";
import { SkillModel, skillModel } from "./models/skillModel";

export type StoreModel = {
	mainModel: MainModel;
	skillModel: SkillModel;
};

export const store = createStore<StoreModel>({
	mainModel,
	skillModel,
});
