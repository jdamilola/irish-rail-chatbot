import { MessageType, IMessage } from '../../types';

export const Message = ({ content, htmlContent, type }: IMessage): JSX.Element => {
    return (
        <div className={`chatbot-message-container ${type === MessageType.BOT ? 'bot' : 'user'}`}>
            {
                htmlContent ?
                <div className="chatbot-message-bubble bot" dangerouslySetInnerHTML={{ __html: htmlContent }} /> : 
                <div className={`chatbot-message-bubble ${type === MessageType.BOT ? 'bot' : 'user'}`}>{content}</div>
            }
        </div>
    );
}
