import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import PropertyCard from '../../Components/PropertyCard'
import {apiFetch} from '../../api/api'
import Pagination from "../../Components/Pagination";

function Home({user}) {
    const [properties, setProperties] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentPageNum =
        Number(searchParams.get("page")) || 1;

    useEffect(() => {

        fetch(`http://localhost:8080/api/properties?page=${currentPageNum}&size=8`)
            .then((res) => res.json())
            .then(data => {

                setProperties(data.content);
                setTotalPages(data.totalPages);
            });
    }, [currentPageNum]);
    return (
        <div className="bg-blue-100 font-sans min-h-screen flex flex-col">
            <div className="flex flex-row justify-between items-center mb-6 mt-5">
                <div className="flex flex-row ml-8">
                    <div className="text-xl text-sky-950 font-bold tracking-wide ml-5">Welcome!</div>
                    <div className="text-xl text-sky-800 font-semibold ml-2">
                        {user?.role != null && (user.firstName)}
                    </div>
                </div>
                <h2 className="text-3xl text-sky-950 font-bold">
                    Available Homes
                </h2>
                <div className="w-1/7"></div>
            </div>
            <main className="content container mx-auto p-8">
                <ul className="grid grid-cols-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {properties.map(property => (
                        <li key={property.id}
                            className="rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-2.5">
                            <PropertyCard
                                property={property}
                                user={user}
                            />
                        </li>

                    ))}
                </ul>
            </main>
            <Pagination
                route={user ? "/homes" : "/"}
                currentPageNum={currentPageNum}
                totalPages={totalPages}
                limit={8}
            />

        </div>
    );
}

export default Home;