import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
    withCredentials: true, // Garante que cookies de sessão sejam enviados
});

// Interceptor para adicionar o token CSRF e o token de autenticação
axiosClient.interceptors.request.use(async (config) => {
    // Garante que o CSRF token seja atualizado antes da requisição
    await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/sanctum/csrf-cookie`,
        {
            withCredentials: true,
        }
    );

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor para lidar com respostas e erros
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        try {
            const { response } = error;
            if (response && response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            console.error(err);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
