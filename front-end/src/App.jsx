import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home'
import ForgotPassword from './pages/ForgetPassword/ForgetPassword';
import PackageSelection from './pages/Package/PackageSelection';
import UserProfile from './pages/UserProfile/UserProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
function App() {
    return (
      <UserProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/select-package' element={<PackageSelection />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

        </Routes>
      </BrowserRouter>
      </UserProvider>
    );
  }
  
  export default App;