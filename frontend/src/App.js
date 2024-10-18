import logo from './logo.svg';
import './App.css';
import MessageBar from './MessageBar';
import MessageArea from './MessageArea';
function App() {
  return (
      <div id="body">
          <div className='dialog-window'>
          <MessageArea/>
          <MessageBar/>
          </div>
      </div>
  );
}

export default App;
