import { useEffect ,useState } from 'react'
import Home from './Pages/Store/Home'
import PropertyDetails from './Pages/Store/PropertyDetails'
import { Routes, Route, Link ,Navigate} from "react-router-dom";
import Navbar from './components/Navbar';
import AddProperty from './Pages/Host/AddProperty';
import Hosthomes from './Pages/Host/Hosthomes'
import Footer from './Components/footer.jsx'
import Login from './Pages/Auth/login'
import Signup from './Pages/Auth/SignUp'
import Contact from './Services/Contact'
import Favourites from './Pages/Store/FavouriteList'
import Bookings from './Pages/Store/Booking'
import Pagetitle from './Utils/PageTitle'
import { apiFetch } from './api/api';
import OAuthSuccess from "./Utils/OAuthSuccess";
import './App.css'

function App() {
    const [loadingUser, setLoadingUser] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setLoadingUser(false);
            return;
        }
        apiFetch("http://localhost:8080/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(!response.ok){
                throw new Error("Invalid Token!");
            }
            return response.json();
        })
        .then(data => {
            console.log("Authenticated user:", data);
            setUser(data);
        }).catch(error => {
                console.log("Authentication failed:", error);
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() =>{
                setLoadingUser(false);
            })
    }, []);
    // VERY IMPORTANT
    if (loadingUser) {
        return <div>Loading...</div>;
    }
  return (
    <>
        <Navbar user = {user} setUser={setUser} />
        <Pagetitle />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/signUp" element={<Signup />} />
            <Route
                path="/oauth-success"
                element={<OAuthSuccess setUser={setUser} />}
            />
            <Route path="/properties/:id" element={<PropertyDetails user={user} />} />
            {/*invalid path or unknown url go to "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />

            {user?.role === "USER" && (
                <>
                    <Route path="/homes" element={<Home user = {user} />} />
                    <Route path="/favourite-list" element={<Favourites user={user} />} />
                    <Route path="/bookings" element={ <Bookings user={user} /> } />
                    <Route path="/contact" element={<Contact />} />
                </>
            )}

            {user?.role === "OWNER" && (
                <>
                    <Route path="/host/homelistpage" element={<Hosthomes user = {user} />}/>
                    <Route path="/host/add-home" element={<AddProperty key="add" />}/>
                    <Route path="/host/edit-home/:id" element={<AddProperty key="edit" />}/>
                </>
            )}
        </Routes>
        <Footer />
    </>
  )
}

export default App
