import { useCallback, useRef, useEffect, useState } from 'react';

import { parseMessageContent } from '../../services/message-parser';
import { IChatBot, IMessage, MessageType } from '../../types';
import { Footer } from './Footer';
import { Header } from './Header';
import { Message } from './Message';

import './style.css';
  

export const ChatBot = (props: IChatBot): JSX.Element => {
    const [messages, setMessages] = useState(props.messages || []) // useReducer(chatbotReducer, { messages: props.messages || [] });

    const contentRef = useRef<HTMLDivElement>(null);

    const handleNodeInserted = useCallback((e: any) => {
        const { currentTarget: target } = e;

        target.scroll({
            top: target.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const updateMessages = useCallback((newMessages: IMessage[]) => {
        setMessages((prevMessage) => [
            ...prevMessage,
            ...newMessages
        ]);
    }, [setMessages]);

    const handleSubmit = async (content: string) => {
        const message = {
            content,
            type: MessageType.USER,
            loading: false
        };

        updateMessages([message]);

        await parseMessageContent(content, updateMessages);
    };

    useEffect(() => {
        const currentTarget = contentRef.current;
        if (currentTarget) {
            currentTarget.addEventListener('DOMNodeInserted', handleNodeInserted);
        }

        return () => {
            if (currentTarget) {
                currentTarget.removeEventListener('DOMNodeInserted', handleNodeInserted);
            }
        };
    }, [contentRef, handleNodeInserted]);
    
    return (
        <div className="chatbot">
            <div className="chatbot-container">
                <Header title={props.headerTitle} />

                <div className="chatbot-content" ref={contentRef}>
                    {messages.map((message, index) => <Message key={index} {...message} />)}
                </div>

                <Footer
                    placeholder="Enter your request..."
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
