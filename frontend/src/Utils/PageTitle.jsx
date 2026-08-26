import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        // For a dynamic route, don't use the literal :id as the key
        if (path.startsWith("/host/edit-home/")) {
            document.title = "Edit Home | HomieeBook";
            return;
        }
        const titles = {
            "/": "HomieeBook",
            "/homes": "Homes | HomieeBook",
            "/favourite-list": "Favourites | HomieeBook",
            "/bookings": "Bookings | HomieeBook",
            "/contact": "Contact Us | HomieeBook",
            "/Login": "Login | HomieeBook",
            "/signUp": "Sign Up | HomieeBook",
            "/host/homelistpage": "My Homes | HomieeBook",
            "/host/add-home": "Add Home | HomieeBook",
        };

        document.title = titles[location.pathname] || "HomieeBook";

    }, [location.pathname]);

    return null;
}

export default PageTitle;