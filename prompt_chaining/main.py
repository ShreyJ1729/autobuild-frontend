import openai
import os
import dotenv
import json


def load_openai_key():
    dotenv.load_dotenv("../.env")
    openai.api_key = os.getenv("OPENAI_API_KEY")
    print(openai.api_key)


def load_prompt(path):
    with open(path, "r") as f:
        comp_prompt = f.read()
    return comp_prompt


def run_prompt(prompt, max_tokens=1000):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0,
        max_tokens=max_tokens,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    return response.choices[0].text


def save_json(json_str, path):
    with open(path, "w") as f:
        f.write(json_str)


def load_json(path):
    with open(path, "r") as f:
        json_str = f.read()
    return json_str


# build tree from json
def build_tree(components, level=0, tree={"tree": ""}):
    if not components:
        return ""
    for comp in components:
        tree["tree"] += (
            level * " " + "- " + comp["name"] + ": " + comp["summary"] + "\n"
        )
        if "childComponents" in comp:
            build_tree(comp["childComponents"], level + 1, tree)
    return tree["tree"]


# Example usage with the given JSON object
components = json.loads(json_str)
tree = build_tree(components)
print(tree)


if __name__ == "__main__":
    load_openai_key()

    # run prompt
    prompt = load_prompt("./prompts/idea.txt")
    idea_response = run_prompt(prompt)
    save_json(response, "idea.json")
    json_str = load_json("idea.json")
    components = json.loads(json_str)
    tree = build_tree(components)
    print(tree)
