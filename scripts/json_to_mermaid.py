import json

# load in json from "../data/google-keep-clone.json"
with open("../data/google-keep-clone.json", "r") as f:
    data = json.load(f)

print(len(data))

mermaid = "graph TD;"

extensions = {}

for filename in data:
    # initialize each file as a node
    mermaid += filename + ";"
    extensions[filename] = filename.split(".")[-1] if "." in filename else None

    # add edges between files via imports for each file
    for import_ in data[filename]["fileImports"]:
        mermaid += filename + "-->" + import_ + extensions[filename] + ";"

print(mermaid, file=open("mermaid.txt", "w+"))
