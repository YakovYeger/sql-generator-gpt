export interface MessageDisplayProps {
  role: string;
  content: string;
}

const MessageDisplay = ({ content }: MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id="icon">⊚</p>
      <p>{content ?? 'Empty user query'}</p>
    </div>
  );
};

export default MessageDisplay;
