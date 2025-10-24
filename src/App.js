import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); // 사용자가 입력 중인 메시지
  const ws = useRef(null); // WebSocket 객체(서버와의 실시간 연결)를 저장 할 변수. useRef : 리렌더 돼도 초기화 되지 않는 변수!
  const [messages, setMessages] = useState([]); // 서버에서 온 메시지 리스트(배열)

  const sendMessage = () => {
    if (input.trim() === null) {
      alert("내용을 입력하세요!");
    } else {
      ws.current.send(input); // send 메서드 이용해서 input값 전달하기
      setInput(""); // 전달 후 입력창 초기화
    }
  };

  // 첫 마운트 때 가져오기
  useEffect(() => {
    // useRef.current 로 값 받기. 웹 소켓 연결을 생성
    ws.current = new WebSocket("ws://localhost:8888/ws/chat");
    // 성공 여부를 알 수 있는 onopen 메서드
    ws.current.onopen = () => console.log("웹소켓 연결 성공");
    // 메시지 출력해주는 onmessage 메서드. event : 서버가 보낸 한 개의 메시지 이벤트
    ws.current.onmessage = (event) => {
      // prev : 이전까지 쌓인 메시지 배열. event.data : 서버가 보낸 실제 메시지 내용
      setMessages((prev) => [...prev, event.data]);
    };
    // [최종정리] input가 event.data가 되고, event.data가 계속 messages 배열에 추가되는 것

    ws.current.onclose = () => console.log("웹소켓 연결 종료");
    ws.current.onerror = (err) => console.err("웹소켓 에러 내용", err);
    return () => ws.current.close(); // cleanup 함수
  }, []);

  return (
    <div className="App">
      <h3>스프링부트 + 리액트 웹소켓 채팅</h3>
      <div className="msg-list">
        {/* messages 변수를 map을 이용해서 하나씩 꺼내주기 */}
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()} // enter 쳐도 메시지 보내질 수 있게
        className="new-msg"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default App;
