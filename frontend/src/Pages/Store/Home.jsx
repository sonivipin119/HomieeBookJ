import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import PropertyCard from '../../Components/PropertyCard'
import { apiFetch } from '../../api/api'
function Home({user}){
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{

        apiFetch("http://localhost:8080/api/properties")
            .then((res) => res.json())
            .then(data => setProperties(data));
    },[]);
    return(
        <div className="bg-blue-100 font-sans min-h-screen flex flex-col">
                <div className="flex flex-row justify-between items-center mb-6 mt-5">
                    <div className="flex flex-row ml-8">
                        <div className="text-xl text-sky-950 font-bold tracking-wide ml-5">Welcome!</div>
                        <div className="text-xl text-sky-800 font-semibold ml-2">
                            {user?.role!=null && (  user.firstName )}
                        </div>
                    </div>
                    <h2 className="text-3xl text-sky-950 font-bold">
                        Available Homes
                    </h2>
                    <div className="w-1/7"></div>
                </div>
                <PropertyCard user = {user} />

        </div>
    );
}

export default Home;