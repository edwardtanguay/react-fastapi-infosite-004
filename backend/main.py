from fastapi import FastAPI
from routers import skills
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(CORSMiddleware, allow_origins=["*"])

app.include_router(skills.router)

@app.get("/")
async def hello_world():
	return {"message": "hello world"}

