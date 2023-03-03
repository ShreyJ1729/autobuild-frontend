import os
from fastapi import FastAPI, Response
from pydantic import BaseModel
import modal
import openai
import dotenv

app = FastAPI()

image = modal.Image.debian_slim().pip_install_from_requirements("requirements.txt")

stub = modal.Stub("autobuild", image=image)
app = FastAPI()


def load_openai_key():
    dotenv.load_dotenv("./.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")


@app.get("/")
async def root():
    return {"message": "AutoBuild Backend"}


def build_prompt(variables, prompt_path, prompt_instructions):
    prompt = open(prompt_path, "r").read()

    # replace variables in prompt
    for key in variables:
        prompt = prompt.replace(f"{{{{{key}}}}}", variables[key])

    # build and return messageList
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
async def mermaid_gen(data: MermaidGenRequest, response: Response):
    print("mermaid-gen request received: ", data.description)

    load_openai_key()
    messageList = build_prompt(
        variables={
            "DESCRIPTION": data.description,
        },
        prompt_path="/root/prompts/mermaid_gen.txt",
        prompt_instructions="You are a helpful markdown generation bot for mermaid diagrams that architects mermaid diagrams for React web apps in markdown from a text description. Stop token: <<|END|>>",
    )

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    mermaid = completion.choices[0].message.content.rstrip("<<|END|>>")

    print(mermaid)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return {"mermaid": mermaid}


class MermaidEditRequest(BaseModel):
    mermaid: str
    query: str


@app.post("/mermaid-edit")
async def mermaid_edit(data: MermaidEditRequest):
    print("mermaid-edit request received: ", data.mermaid, "\n", data.query)

    load_openai_key()
    messageList = build_prompt(
        variables={
            "MERMAID": data.mermaid,
            "QUERY": data.query,
        },
        prompt_path="/root/prompts/mermaid_edit.txt",
        prompt_instructions="You are a helpful markdown generation bot for mermaid diagrams that takes in a markdown mermaid diagram and a query and returns a new mermaid diagram with edits. Stop token: <<|END|>>",
    )

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    mermaid = completion.choices[0].message.content.rstrip("<<|END|>>")

    print(mermaid)
    return {"mermaid": mermaid}


@stub.asgi(mounts=[modal.Mount.from_local_dir("./", remote_path="/root/")])
def fastapi_app():
    return app
