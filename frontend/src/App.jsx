import './App.css'
import { Routes, Route } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './Components/Home'
import Offer from './Components/Offer'
import NewFeatured from './Components/NewFeatured'
import Splurge from './Components/Splurge'
import Magazine from './Components/Magazine'
import EliteOffers from './Components/EliteOffers'
import SingleProductPage from './Components/SingleProductPage';
import AddToCart from './Components/AddToCart';
import SearchPage from './Components/SearchPage';
import UserProfile from './Components/UserProfile';
import MyOrders from './Components/MyOrders';
import EditProfile from './Components/EditProfile';
import MyAddressForm from './Components/MyAddressForm';

function App() {
  return (
    <>
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/new' element={<NewFeatured />} />
          <Route path='/splurge' element={<Splurge />} />
          <Route path='/magazine' element={<Magazine />} />
          <Route path='/eliteoffers' element={<EliteOffers />} />
          <Route path='/singleProductPage/:id' element={<SingleProductPage />} />
          <Route path='/addToCart' element={<AddToCart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/userProfile/editProfile" element={<EditProfile />} />
          <Route path="/userProfile/myAddressForm" element={<MyAddressForm />} />
      </Routes>
      
    </>
  )
}

export default App;
