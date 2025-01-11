import json
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

router = APIRouter(
	prefix="/skills"
)

@router.get("/")
async def get_skills():
	with open("data/skills.json", "r") as file:
		skills = json.load(file)
		return skills

@router.get("/{id}")
async def get_skill(id:int):
	with open("data/skills.json", "r") as file:
		skills = json.load(file)
	try:
		skill = next(skill for skill in skills if skill["id"] == id)
		return skill
	except:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="skill not found")

@router.delete("/{id}")
async def delete_skill(id: int):
    with open("data/skills.json", "r") as file:
        skills = json.load(file)
 
    skill_to_delete = next((skill for skill in skills if skill["id"] == id), None)
    if not skill_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
 
    skills = [skill for skill in skills if skill["id"] != id]
 
    with open("data/skills.json", "w") as file:
        json.dump(skills, file, indent=4)
    return JSONResponse(content={"deleted": skill_to_delete}, status_code=status.HTTP_200_OK)