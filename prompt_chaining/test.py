def build_tree(components):
    """
    Recursive function to build a tree structure of components with summaries.
    """
    if not components:
        return None

    tree = []
    for comp in components:
        node = {
            "name": comp["name"],
            "summary": comp["summary"],
            "childComponents": build_tree(comp.get("childComponents")),
        }
        tree.append(node)

    return tree


# Example usage with the given JSON object
import json

json_str = """
[{
    "name": "App",
    "summary": "Root component for the application",
    "childComponents": "ChatRoom"
}, {
    "name": "ChatRoom",
    "summary": "Manages the single room chat page",
    "childComponents": "ChatHeader,Messages,MessageInput"
}, {
    "name": "ChatHeader",
    "summary": "Displays the chat room name and other info",
    "childComponents": "RoomName,RoomOptions"
}, {
    "name": "Messages",
    "summary": "Displays all of the messages in the chatroom",
    "childComponents": "Message"
}, {
    "name": "MessageInput",
    "summary": "Provides an input to write and send a message",
    "childComponents": "MessageInputField,MessageSendButton"
}, {
    "name": "RoomName",
    "summary": "Displays the name of the current chatroom",
    "childComponents": null
}, {
    "name": "RoomOptions",
    "summary": "Provides the user with options for the current chatroom",
    "childComponents": "RoomSettingsButton,LeaveRoomButton"
}, {
    "name": "Message",
    "summary": "Displays an individual message",
    "childComponents": "MessageContents,MessageSender,MessageTimestamp"
}, {
    "name": "MessageInputField",
    "summary": "Provides an input field for the user to type in a message",
    "childComponents": null
}, {
    "name": "MessageSendButton",
    "summary": "Provides a button to send a message",
    "childComponents": null
}, {
    "name": "RoomSettingsButton",
    "summary": "Provides a button to open chatroom settings",
    "childComponents": null
}, {
    "name": "LeaveRoomButton",
    "summary": "Provides a button to leave the current chatroom",
    "childComponents": null
}, {
    "name": "MessageContents",
    "summary": "Displays the contents of a message",
    "childComponents": null
}, {
    "name": "MessageSender",
    "summary": "Displays the sender of a message",
    "childComponents": null
}, {
    "name": "MessageTimestamp",
    "summary": "Displays the timestamp of a message",
    "childComponents": null
}]
"""

components = json.loads(json_str)
tree = build_tree(components)


# Example usage of the tree
def print_tree(tree, indent=0):
    for node in tree:
        print("  " * indent + "- " + node["name"] + " (" + node["summary"] + ")")
        print_tree(node["childComponents"], indent + 1)


print_tree(tree)
