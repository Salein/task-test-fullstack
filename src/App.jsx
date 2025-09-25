import {BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/welcomePage/WelcomePage";
import SendMessagePage from "./components/sendMessagesPage/SendMessagePage";
import './index.css';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/sendMessage" element={<SendMessagePage />} />
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
