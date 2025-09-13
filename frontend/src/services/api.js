import axios from 'axios';

// Hamare backend ka base URL
const API_BASE_URL = 'http://localhost:8090/api';

// Axios ka ek instance banate hain
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Yeh ek security guard ki tarah hai jo har request ke saath token check karega
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- PUBLIC APIS ---
export const getAllTrainers = () => apiClient.get('/public/trainers');
export const getTrainerById = (trainerId) => apiClient.get(`/public/trainers/${trainerId}`);
export const getPackagesByTrainerId = (trainerId) => apiClient.get(`/public/trainers/${trainerId}/packages`);


// --- AUTH APIS ---
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const registerUser = (userData) => apiClient.post('/auth/register', userData);


// --- CLIENT APIS ---
export const getMyBookings = () => apiClient.get('/client/my-bookings');
export const bookPackage = (packageId) => apiClient.post('/client/bookings', { packageId });


// --- TRAINER APIS ---
export const getMyClients = () => apiClient.get('/trainer/my-clients');

// YEH HAI NAYA FUNCTION
export const uploadPlan = (bookingId, planFile) => {
    const formData = new FormData();
    formData.append('planFile', planFile); // 'planFile' naam backend ke @RequestParam se match hona chahiye

    return apiClient.post(`/trainer/bookings/${bookingId}/upload-plan`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const getDashboardStats = () => apiClient.get('/admin/stats');
export const getRecentClients = () => apiClient.get('/admin/recent-clients');
export const getRecentBookings = () => apiClient.get('/admin/recent-bookings');
export const createTrainer = (trainerData) => apiClient.post('/admin/trainers', trainerData);
export const createPackage = (packageData) => apiClient.post('/admin/packages', packageData);