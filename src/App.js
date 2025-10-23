import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); // 사용자가 새로 입력한 메시지

  const handleEnter = () => {};
  const handleSubmit = () => {};

  // 첫 마운트 때 가져오기
  useEffect(() => {
    new WebSocket("ws://localhost:8888/ws/chat");
  }, []);

  return (
    <div className="App">
      <h3>스프링부트 + 리액트 웹소켓 채팅</h3>
      <div className="msg-list">메시지 배열</div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleEnter}
        className="new-msg"
      />
      <button onClick={handleSubmit}>전송</button>
    </div>
  );
}

export default App;
