
import { BrowserRouter,Routes ,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AboutUsPage from "./pages/AboutUsPage"
import ProfilePage from "./pages/ProfilePage"
import MyOrdersPage from "./pages/MyOrdersPage"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage />} />
        <Route path="/myOrders" element={<MyOrdersPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
