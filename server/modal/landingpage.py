import os
import openai
import dotenv


def load_openai_key():
    dotenv.load_dotenv("./.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")


def build_message_list(variables, prompt_path, prompt_instructions):
    prompt = open(prompt_path, "r").read()

    # replace variables in prompt
    for key in variables:
        prompt = prompt.replace(f"{{{{{key}}}}}", variables[key])

    # based on component type, get list of prompts
    inputs = []
    outputs = []
    for i in range(
        1, len(os.listdir(f"./landingpage_prompts/{variables['COMPONENT']}")) // 2 + 1
    ):
        inputs.append(
            open(
                f"./landingpage_prompts/{variables['COMPONENT']}/input{i}.txt", "r"
            ).read()
        )
        outputs.append(
            open(
                f"./landingpage_prompts/{variables['COMPONENT']}/output{i}.txt", "r"
            ).read()
        )

    # build and return messageList
    messageList = [
        {
            "role": "system",
            "content": prompt_instructions,
        },
    ]
    for i in range(len(inputs)):
        messageList.append(
            {
                "role": "user",
                "content": inputs[i],
            }
        )
        messageList.append(
            {
                "role": "assistant",
                "content": outputs[i],
            }
        )
    messageList.append({"role": "user", "content": prompt})
    return messageList


def component_gen(name, description, component_name):
    # print("navbar-gen request received: ", name, description, component_name)

    load_openai_key()
    messageList = build_message_list(
        variables={
            "NAME": name,
            "DESCRIPTION": description,
            "COMPONENT": component_name,
        },
        prompt_path="./landingpage_prompts/format.txt",
        prompt_instructions="You are a helpful React.js navbar generation bot. Given a startup idea, you generate the code for the website navbar using React and material-ui. Stop token: <<|END|>>",
    )

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messageList
    )

    code = completion.choices[0].message.content.rstrip("<<|END|>>")

    # print(code)
    return code


def build_prompt(variables, prompt_path):
    prompt = open(prompt_path, "r").read()

    # replace variables in prompt
    for key in variables:
        prompt = prompt.replace(f"{{{{{key}}}}}", variables[key])

    return prompt


if __name__ == "__main__":
    req = {
        "name": "Supabase",
        "description": "an open source Firebase alternative. It offers developers a full Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage to help build their projects quickly and with a focus on their products.",
        "component_name": "NavBar",
    }
    code = component_gen(req["name"], req["description"], req["component_name"])
    print(
        code,
        file=open("/Users/shreyjoshi/dev/autobuild/landingpage/src/NavBar.jsx", "w+"),
    )
