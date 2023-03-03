import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./ChatbotStyles.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { mermaidData } from "../recoil/atoms.js";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useRecoilState(mermaidData);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => "Hi! Enter your queries below:"}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => "Done!"}
      />
    );
    setMessages(newMessages);

    // format
    const obj = {
      mermaid: data,
      query: text,
    };

    axios
      .post(
        "https://shreyj1729--autobuild-fastapi-app.modal.run/mermaid-edit",
        obj
      )
      .then((res) => {
        const mermaid_code = res.data["mermaid"];
        console.log("got response from edit:");
        console.log(mermaid_code);
        setData(mermaid_code);
      })
      .then(() => {
        // navigate(`/app`);
      });
  };

  return (
    <div className="chatbot" style={{ width: "100%", height: "425px" }}>
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
};

const Header = () => {
  return <div className="header">&nbsp;Chatbot</div>;
};

const Messages = ({ messages }) => {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="messages">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
};

const UserMessage = ({ text }) => {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
};

const BotMessage = ({ fetchMessage }) => {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : message}</div>
    </div>
  );
};

const Input = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <div className="input">
      <form onSubmit={handleSend}>
        <input
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Enter your change here"
        />
        <button>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
