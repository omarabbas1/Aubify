import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginSignup/>}/>
        </Routes>
    </Router>
  );
}

export default App;