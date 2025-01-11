import { useEffect } from "react";
import { useTypedStoreState } from "../store/hooks"
import axios from "axios";

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);

	useEffect(() => {
		(async () => {
			const response = await axios.get("http://localhost:3355/skills")
			const skills = response.data
			console.log(11111, skills);
		})();
	},[])

	return (
		<p>{message}</p>
	)
}