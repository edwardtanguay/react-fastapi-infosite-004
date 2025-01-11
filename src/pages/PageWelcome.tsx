import { useTypedStoreState } from "../store/hooks"

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);
	const {skills} = useTypedStoreState(state => state.skillModel)

	return (
		<>
		<p>{message}</p>

			<h2 className="text-2xl mt-3">{skills.length} Skills</h2>

			<ul>
				{skills.map(skill => {
					return (
						<li key={skill.id}>{skill.name}</li>
					)
				})}
			</ul>
		</>
	)
}