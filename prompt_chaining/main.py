import openai
import os
import dotenv
import json

dotenv.load_dotenv("../.env")

openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)


# load the prompt
with open("./prompts/comp.txt", "r") as f:
    comp_prompt = f.read()

# # run comp prompt
# response = openai.Completion.create(
#     engine="text-davinci-003",
#     prompt=comp_prompt,
#     temperature=0,
#     max_tokens=500,
#     top_p=1,
#     frequency_penalty=0,
#     presence_penalty=0,
# )

# # export to json
# print(response.choices[0].text, file=open("./comp_out.json", "w+"))


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


# load json_str from the jsonfile
with open("./comp_out.json", "r") as f:
    json_str = f.read()

# Example usage with the given JSON object
components = json.loads(json_str)
tree = build_tree(components)
print(tree)
