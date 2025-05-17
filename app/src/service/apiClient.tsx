import { BASE_URL } from "./config";
import { getAccessToken, getRefreshToken, setAccessToken } from './storage'
import axios from 'axios'

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Interceptor
apiClient.interceptors.request.use(
    async config => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

//Response Interceptor

apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 403) {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                return Promise.reject(error)
            }
            try {
                const { data } = await axios.post(`${BASE_URL}/user`, {
                    refreshToken
                })
                setAccessToken(data.token)
                error.config.headers.Authorization = `Bearer ${data.token}`
                return axios(error.config)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
);

export default apiClient;