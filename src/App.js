import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninSignup from './components/SigninSignup/SigninSignup';
import EmailVerification from './components/EmailVerification/EmailVerification';
import VerificationSuccess from './components/EmailVerification/VerificationSuccess';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<SigninSignup/>}/>
          <Route path='/email_verification' element={<EmailVerification/>}/>
          <Route path='/verification_success' element={<VerificationSuccess/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
        </Routes>
    </Router>
  );
}

export default App;