import ChatbotIcon from '../../icons/ChatBotIcon';
import { HeaderProps } from '../../types';

export const Header = ({ title }: HeaderProps): JSX.Element => {
    return (
        <div className="chatbot-header">
            <ChatbotIcon />
            <h2>{title}</h2>
        </div>
    );
}