import openai
import os
import subprocess
import dotenv
import json


def load_openai_key():
    dotenv.load_dotenv("../.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")
    print(openai.api_key)


def run_prompt(messageList):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    return completion.choices[0].message.content


load_openai_key()

# read in data from ./prompt.txt to use as prompt
with open("./prompts/mermaid_editor.txt", "r") as f:
    prompt = f.read()

messageList = [
    {
        "role": "user",
        "content": "You are a helpful code-generation bot. You help users architect and write programs in any language. You retain conversation history, so the user can mention things previously said in the conversation.",
    },
    {
        "role": "assistant",
        "content": "Got it!",
    },
    {"role": "user", "content": prompt},
]

print(run_prompt(messageList))
