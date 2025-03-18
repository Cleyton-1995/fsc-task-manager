import { useState } from 'react';
import Header from './Header';

export function Tasks() {
  const [inputValue, setInputValue] = useState();
  const [messages, setMessages] = useState([
    'Hello world',
    'FSC is the best course in the world',
  ]);

  function handleButtonClick() {
    setMessages([...messages, inputValue]);
  }

  return (
    <div>
      <Header>
        <h1>Add a Tasks</h1>
      </Header>

      <input
        type="text"
        className="input"
        placeholder="Create your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button className="button" onClick={handleButtonClick}>
        Add Task
      </button>

      <Header>My Tasks</Header>

      <div>
        <ul>
          {messages.map((message) => {
            return <li key={messages}>{message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
