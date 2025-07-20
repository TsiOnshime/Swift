import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Landing from "./pages/Landing/Landing";
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home'
import ForgotPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import PackageSelection from './pages/Package/PackageSelection';
import UserProfile from './pages/UserProfile/UserProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import MapPage from './pages/Map/MapPage';
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Scanner from './pages/Scanner/Scanner';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import MyPackages from './pages/MyPackages/MyPackages';
import About from './pages/About/About';
import SendToken from "./pages/SendToken/SendToken";
import Redeem from "./pages/RedeemToken/Redeem";
import NotFound from "./pages/404/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/select-package" element={<PackageSelection />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/package-selection" element={<PackageSelection />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/my-packages" element={<MyPackages />} />
        <Route path="/send-tokens" element={<SendToken />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;