import os
from fastapi import FastAPI
from pydantic import BaseModel
import modal
from datetime import datetime
import openai
import dotenv

image = modal.Image.debian_slim().pip_install_from_requirements("requirements.txt")

stub = modal.Stub("autobuild", image=image)
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "AutoBuild Backend"}


class MermaidGenRequest(BaseModel):
    description: str


def load_openai_key():
    dotenv.load_dotenv("./.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")


def build_mermaid_gen_prompt(description):
    prompt = open("/root/prompts/mermaid_gen.txt", "r").read()
    prompt = prompt.replace("{{INPUT}}", description)
    return [
        {
            "role": "user",
            "content": "You are a helpful markdown generation bot for mermaid diagrams. You help architect mermaid diagrams for React web apps in markdown from a description.",
        },
        {
            "role": "assistant",
            "content": "Got it!",
        },
        {"role": "user", "content": prompt},
    ]


@app.post("/mermaid-gen")
async def mermaid_gen(data: MermaidGenRequest):
    print("mermaid-gen request received: ", data.description)

    load_openai_key()
    messageList = build_mermaid_gen_prompt(data.description)

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    print(completion.choices[0].message.content)
    return {"code": completion.choices[0].message.content}


@stub.asgi(mounts=[modal.Mount.from_local_dir("./", remote_path="/root/")])
def fastapi_app():
    return app
