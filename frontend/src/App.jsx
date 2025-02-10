
import { BrowserRouter,Routes ,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import AboutUsPage from "./pages/AboutUsPage"
import ProfilePage from "./pages/ProfilePage"
import MyOrdersPage from "./pages/MyOrdersPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/product/:id" element = {<ProductDetailsPage/>} />
        <Route path="/myOrders" element={<MyOrdersPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
