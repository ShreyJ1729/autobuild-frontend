const defaultMermaid = `
graph TD;
App-->|renders|ChatWindow;
ChatWindow-->|renders|ChatHeader;
ChatWindow-->|renders|ChatBody;
ChatWindow-->|renders|ChatInput;
ChatBody-->|iterativelyrenders|ChatMessage;
ChatHeaderProps["roomName:string"];
ChatMessageProps["author:string,<br/>text:string,<br/>timestamp:string"];
ChatInput-sendMessage["sendMessage"];
ChatInput-->|calls|ChatInput-sendMessage;
utils/socket.io[utils/socket.io.js];
socket["socket.io-client"];
utils/recoil[utils/recoil.js];
messagesAtom["[{id:string<br/>author:string,<br/>text:string,<br/>timestamp:string},...]"];
utils/recoil-.->|messagesAtom|messagesAtom;
utils/socket.io-.->|socket|socket;
utils/socket.io-->|updatesmessages|messagesAtom;
ChatBody-->|reads|messagesAtom;
ChatHeader-.->|props|ChatHeaderProps;
ChatMessage-.->|props|ChatMessageProps;
`;

export default defaultMermaid;
