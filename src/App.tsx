import { useState } from 'react';
import CodeDisplay from './components/CodeDisplay';
import MessagesDisplay from './components/MessagesDisplay';

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [userInputValue, setUserInputValue] = useState<string>('');

  const getQuery = async () => {
    try {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ message: userInputValue }),
        headers: {
          'content-type': 'application/json',
        },
      };

      const response = await fetch(
        'http://localhost:6969/completions',
        options
      );

      const data = await response.json();

      const userMessage = {
        role: 'user',
        content: userInputValue,
      };
      setChatData((prevChatData) => [...prevChatData, data, userMessage]);
    } catch (error) {
      console.error('Scheisse our frontend is kaput: ', error);
    }
  };

  const userMessages = chatData.filter(({ role }) => role === 'user');
  const codeToDisplay = chatData
    .filter(({ role }) => role === 'assistant')
    .pop();

  return (
    <div className="app">
      <MessagesDisplay messages={userMessages} />
      <input
        value={userInputValue}
        onChange={(e) => setUserInputValue(e.target.value)}
      />
      <CodeDisplay codeToDisplay={codeToDisplay?.content || ''} />
      <div className="button-container">
        <button
          id="get-query"
          onClick={getQuery}
        >
          Get Query
        </button>
        <button
          onClick={() => {
            setChatData([]);
            setUserInputValue('');
          }}
          id="clear-chat"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
