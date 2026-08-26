
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess({ setUser }) {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const token = searchParams.get("token");

        if (!token) {
            navigate("/Login");
            return;
        }

        localStorage.setItem("token", token);

        fetch("http://localhost:8080/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to authenticate");
                }

                return response.json();
            })
            .then(data => {

                setUser(data);

                navigate(
                    data.role === "OWNER"
                        ? "/host/homelistpage"
                        : "/homes"
                );
            })
            .catch(error => {

                console.error(
                    "OAuth authentication failed:",
                    error
                );

                localStorage.removeItem("token");
                navigate("/Login");
            });

    }, [navigate, searchParams, setUser]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Signing you in...</p>
        </div>
    );
}

export default OAuthSuccess;