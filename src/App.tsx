import './App.css';
import { ChatBot } from './components/ChatBot';
import { MessageType } from './types';

function App() {
  return (
    <div className="App">
      <ChatBot
        headerTitle="Irish Rail Chatbot"
        messages={[{
          content: `
            Hello there. Welcome to Irish Rail! I'm here to provide you with an estimation of DART train times. 
            Below are a few examples you can try.
          `,
          type: MessageType.BOT
        }, {
          htmlContent: '<strong><i>"list of stations"</i></strong> to request the list of all possible DART stations.',
          type: MessageType.BOT
        }, {
          htmlContent: `
            <strong><i>"tell me the train times for [station name]"</i></strong> to request DART train times for that station. 
            Examples are:<br><strong>1. tell me the train times for Bayside.</strong><br><strong>2. train times for BYSDE.</strong><br>
            <strong>3. kbrck train times.</strong> e.t.c.
          `,
          type: MessageType.BOT
        }]}
      />
    </div>
  );
}

export default App;
