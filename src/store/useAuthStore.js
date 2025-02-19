import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post('/auth/register', formData);
            console.log("res", res);
        } catch (error) {
            console.log("Error in signup", error)
        } finally {
            set({ isSigningUp: false })
        }
    }
}));

export default useAuthStore;