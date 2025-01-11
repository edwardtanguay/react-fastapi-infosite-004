import { useTypedStoreActions, useTypedStoreState } from "../store/hooks";
import { Skill } from "../types";

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);
	const { skills } = useTypedStoreState((state) => state.skillModel);
	const { saveSkill, deleteSkillThunk } = useTypedStoreActions((actions) => actions.skillModel);

	const handleDeleteSkill = (skill: Skill) => {
		deleteSkillThunk(skill);
	};

	const handleToggleSkill = (skill: Skill) => {
		skill.isOpen = !skill.isOpen;
		saveSkill(skill);
	};

	return (
		<>
			<p>{message}</p>

			<h2 className="text-2xl mt-3">{skills.length} Skills</h2>

			<ul>
				{skills.map((skill) => {
					return (
						<li key={skill.id}>
							<p
								className={`cursor-pointer w-fit ${
									skill.isOpen ? "font-bold" : ""
								}`}
								onClick={() => handleToggleSkill(skill)}
							>
								{skill.name}
							</p>
							{skill.isOpen && (
								<div className="border border-slate-500 border-1 bg-slate-300 px-2 py-1 mb-2 w-fit rounded-md">
									<p>{skill.description}</p>
									<p className="text-sm italic">
										get more info about{" "}
										<a
											href={skill.url}
											className="underline"
											target="_blank"
										>
											{skill.name}
										</a>
									</p>
									<div className="flex justify-end">
										<button
											onClick={() =>
												handleDeleteSkill(skill)
											}
											className=""
										>
											delete
										</button>
									</div>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</>
	);
};
