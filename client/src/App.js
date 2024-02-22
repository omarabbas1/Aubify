import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninSignup from './components/SigninSignup/SigninSignup';
import EmailVerification from './components/EmailVerification/EmailVerification';
import VerificationSuccess from './components/EmailVerification/VerificationSuccess';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/signin_signup' element={<SigninSignup/>}/>
          <Route path='/email_verification' element={<EmailVerification/>}/>
          <Route path='/verification_success' element={<VerificationSuccess/>}/>
        </Routes>
    </Router>
  );
}

export default App;