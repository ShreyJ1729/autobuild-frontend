import openai
import os
import subprocess
import dotenv
import json


def load_openai_key():
    dotenv.load_dotenv("../.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")
    print(openai.api_key)


def build_prompt(path, variables):
    with open(path, "r") as f:
        prompt = f.read()

    for key, value in variables.items():
        prompt = prompt.replace("{{" + key.upper() + "}}", value)

    return prompt


def run_prompt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )
    return response.choices[0].message.content


def save_json(json_str, path):
    with open(path, "w") as f:
        f.write(json_str)


def load_json(path):
    with open(path, "r") as f:
        json_str = f.read()
    json_as_dict = json.loads(json_str)
    return json_as_dict


# build tree from json
def build_tree(node, level=0, tree={"tree": ""}):
    if not node:
        return ""

    # add current level to tree
    tree["tree"] += level * ">" + "" + node["name"] + ": " + node["summary"] + "\n"

    # iterate over next level
    if "children" in node and node["children"] is not None:
        for child in node["children"]:
            build_tree(child, level + 1, tree)
    return tree["tree"]


# postorder traversal of components, building prompt at each level
def postorder_traversal(node, level=0):
    if not node:
        return

    # iterate over next level
    if "children" in node and node["children"] is not None:
        for child in node["children"]:
            postorder_traversal(child, level + 1)

    # if file already exists, skip
    filename = node["name"].replace(" ", "_")
    if os.path.exists(f"components/{filename}.jsx"):
        return

    # after all children have been processed, run codegen for current node
    print("Running codegen for: ", node["name"])

    # build codegen prompt
    prompt = build_prompt(
        "./prompts/codegen.txt",
        {
            "IDEA": IDEA,
            "COMPONENT_NAME": node["name"],
            "COMPONENT_SUMMARY": node["summary"],
            "COMPONENT_CHILDREN": ",".join(
                [
                    child["name"]
                    for child in node["children"]
                    if node["children"] is not None
                ]
            ),
            "COMPONENT_PROPS": ",".join(node["props"]),
            "DESIGN_TYPE": "Sleek, Crisp, and Modern",
        },
    )

    print(level * " " + "- " + node["summary"])

    # run to get typescript code
    code = run_prompt(prompt)

    # save file under react-app/src/components
    if not os.path.exists("./react-app/src/components"):
        os.mkdir("./react-app/src/components")
    with open(f"./react-app/src/components/{filename}.tsx", "w+") as f:
        f.write(code)
    return


if __name__ == "__main__":
    load_openai_key()

    IDEA = "a single-room chat app using websockets"

    if not os.path.exists("components.json"):
        # build+run idea prompt
        prompt = build_prompt("./prompts/idea.txt", {"IDEA": IDEA})
        components = run_prompt(prompt)
        save_json(components, "components.json")

        print("Saved components to components.json, waiting for user input...")
        input()

    if not os.path.exists("component_tree.txt"):
        # build tree
        components = load_json("components.json")
        tree = build_tree(components)
        print(tree, file=open("component_tree.txt", "w+"))

        print("Saved component tree to component_tree.txt, waiting for user input...")
        input()

    # load component json
    components = load_json("components.json")

    # run npx create-react-app with typescript and wait for it to finish
    if not os.path.exists("react-app"):
        print("Creating react app...")
        p = subprocess.Popen(
            ["npx", "create-react-app", "react-app", "--template", "typescript"]
        )
        p.wait()

    # then spin up the react app
    # subprocess.Popen(["npm", "run", "start"], cwd="react-app")

    # run codegen for each component in postorder traversal (bottom-up)
    postorder_traversal(components)
