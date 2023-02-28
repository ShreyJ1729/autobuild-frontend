import openai
import os
import dotenv

dotenv.load_dotenv("../.env")

openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)


# load the prompt
with open("./prompts/architecture.txt", "r") as f:
    architecture_prompt = f.read()

# load the prompt
with open("./prompts/subcomp.txt", "r") as f:
    subcompy_prompt = f.read()

# load codegen prompt
with open("./prompts/codegen.txt", "r") as f:
    codegen_prompt = f.read()

if __name__ == "__main__":
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=codegen_prompt,
        temperature=0,
        max_tokens=500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    print(response)
    print(response.choices[0].text, file=open("./codegen_out.json", "w+"))
