export async function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    return fetch(url, {
        ...options,
        headers
    });
}