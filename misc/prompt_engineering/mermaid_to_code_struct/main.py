import os
import openai
import dotenv

def load_openai_key():
    dotenv.load_dotenv("./.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")

def build_prompt(variables, prompt_path, prompt_instructions):
    prompt = open(prompt_path, "r").read()

    # replace variables in prompt
    for key in variables:
        prompt = prompt.replace(f"{{{{{key}}}}}", variables[key])

    # build and return messageList
    return [
        {
            "role": "system",
            "content": prompt_instructions,
        },
        {
            "role": "user",
            "content": prompt
        },
    ]

 

if __name__ == "__main__":
    load_openai_key()
    description = "A frontend application built using React in Typescript that is a single-room chat app that allows users to send messages to other users on the website. Socket.io is used for real-time communication and recoil is used for state management."
    
    # Write file input_1.txt to variable
    with open("./inputs/input_1.txt", "r") as f:
        mermaid_md = f.read()

    messageList = build_prompt(
        variables={
            "DESCRIPTION": mermaid_md,
        },
        prompt_path="./prompts/m2c.txt",
        prompt_instructions="""
        You are a helpful bot for converting mermaid diagrams that illustrate architecture for React web apps in markdown to tree structures and descriptions for future code generation. 
        Assume index.tsx is the React root, not a component, so make sure the index.tsx file is in the src/ folder. It should not be in a different folder. We should also make sure App.tsx is in our src/ folder like our index.tsx, not inside a src/App folder. 
        Parse the mermaid markdown code given to a tree of components and folders for a React frontend app in Typescript. Strictly adhere to the components listed, do not make any new components. Each component have will only a single file and folder for that component, with no prop files. Group dependencies in the same folder file structure. Make sure only folders and components defined are in the tree, nothing else. 
        For each component, create a description with what components the component renders, what props it's passed in, what component it calls (if any) and what functions it has. For each prop, make sure we pass the return type and input types for the prop. 
        Stop token: <<|END|>>
        """,
    )
    #print(messageList)

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    output = completion.choices[0].message.content.rstrip("<<|END|>>")
    
    with open("./outputs/m2c_out.txt", "w") as f:
        f.write(output)