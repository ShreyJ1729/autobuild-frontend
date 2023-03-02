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


def load_openai_key():
    dotenv.load_dotenv("./.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")


@app.get("/")
async def root():
    return {"message": "AutoBuild Backend"}


def build_prompt(description, prompt_path, prompt_instructions):
    prompt = open(prompt_path, "r").read()
    prompt = prompt.replace("{{INPUT}}", description)
    return [
        {
            "role": "user",
            "content": prompt_instructions,
        },
        {
            "role": "assistant",
            "content": "Got it!",
        },
        {"role": "user", "content": prompt},
    ]


class MermaidGenRequest(BaseModel):
    description: str


@app.post("/mermaid-gen")
async def mermaid_gen(data: MermaidGenRequest):
    print("mermaid-gen request received: ", data.description)

    load_openai_key()
    messageList = build_prompt(
        data.description,
        "/root/prompts/mermaid_gen.txt",
        "You are a helpful markdown generation bot for mermaid diagrams that architects mermaid diagrams for React web apps in markdown from a text description.",
    )

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    print(completion.choices[0].message.content)
    return {"code": completion.choices[0].message.content}


class MermaidEditRequest(BaseModel):
    code: str
    query: str


@app.post("/mermaid-edit")
async def mermaid_edit(data: MermaidEditRequest):
    print("mermaid-edit request received: ", data.code, "\n", data.query)

    load_openai_key()
    messageList = build_prompt(
        data.query,
        "/root/prompts/mermaid_edit.txt",
        "You are a helpful markdown generation bot for mermaid diagrams. Given a markdown mermaid diagram and a query, you generate a new markdown mermaid diagram that satisfies the query.",
    )

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    print(completion.choices[0].message.content)
    return {"code": completion.choices[0].message.content}


@stub.asgi(mounts=[modal.Mount.from_local_dir("./", remote_path="/root/")])
def fastapi_app():
    return app
