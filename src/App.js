
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main';



function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
