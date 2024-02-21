import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninSignup from './components/SigninSignup/SigninSignup';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<SigninSignup/>}/>
        </Routes>
    </Router>
  );
}

export default App;