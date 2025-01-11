from fastapi import FastAPI
from routers import skills

app = FastAPI()

app.include_router(skills.router)

@app.get("/")
async def hello_world():
	return {"message": "hello world"}

