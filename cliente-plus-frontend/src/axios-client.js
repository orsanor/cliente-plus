import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
    withCredentials: true,
});

// Função para obter o CSRF token
const getCsrfToken = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/csrf-token`,
            {
                withCredentials: true,
            }
        );

        if (!response.data.csrf_token) {
            console.error("CSRF Token não encontrado na resposta");
            return null;
        }

        return response.data.csrf_token;
    } catch (error) {
        console.error("Erro ao obter CSRF token:", error.response || error);
        return null;
    }
};

axiosClient.interceptors.request.use(async (config) => {
    try {
        // Adiciona o CSRF token
        const csrfToken = await getCsrfToken();
        if (csrfToken) {
            config.headers["X-CSRF-TOKEN"] = csrfToken;
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    } catch (error) {
        console.error("Erro no interceptor:", error);
        return config;
    }
});

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
