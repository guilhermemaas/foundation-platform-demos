from fastapi import FastAPI
import os
import uvicorn

app = FastAPI()

@app.get("/api/v1/hello")
async def read_root():
    name = os.getenv("NAME", "World")
    return {"message": f"Hello {name}!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8585)
