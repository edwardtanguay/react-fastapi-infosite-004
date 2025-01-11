import json
from fastapi import APIRouter, HTTPException, status

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

