import { useCallback, useState } from 'react';
import SubmitIcon from '../../icons/SubmitIcon';
import { FooterProps } from '../../types';

export const Footer = ({ placeholder, onSubmit }: FooterProps): JSX.Element => {
    const [message, setMessage] = useState('');

    const handleOnSubmit = useCallback(() => {
        if (message) {
            onSubmit(message);
            setMessage('');
        }
    }, [message, setMessage, onSubmit]);

    return (
        <div className="chatbot-footer">
            <input
                autoFocus
                onFocus={(e) => e.preventDefault()}
                type="text"
                className="chatbot-input"
                placeholder={placeholder}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setMessage('');
                        handleOnSubmit();
                    }
                }}
            />
            <button className="chatbot-btn" onClick={handleOnSubmit}>
                <SubmitIcon />
            </button>
        </div>
    );
}
