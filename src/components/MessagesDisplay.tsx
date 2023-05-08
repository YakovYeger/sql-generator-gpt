import MessageDisplay, { MessageDisplayProps } from './MessageDisplay';

interface MessagesDisplayProps {
  messages: MessageDisplayProps[];
}

const MessagesDisplay = ({ messages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
      {messages.map(({ content, role }) => (
        <MessageDisplay
          content={content}
          role={role}
        />
      ))}
    </div>
  );
};

export default MessagesDisplay;
