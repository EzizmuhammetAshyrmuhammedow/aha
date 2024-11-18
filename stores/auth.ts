import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        email: '',
        password: '',
        errorMessage: null as string | null,
        successMessage: null as string | null,
        userData: null as any | null, // To store user data
    }),
    actions: {
        async login() {
            try {
                const user = await pb.collection('users').authWithPassword(this.email, this.password);
                this.userData = user; // Store user data in the store
                localStorage.setItem('user', JSON.stringify(user)); // Save user data to local storage
                this.successMessage = 'Login successful!';
                this.errorMessage = null;
                // Return true for successful login
                return true;
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessage = error.message || 'An unexpected error occurred.';
                } else {
                    this.errorMessage = 'An unknown error occurred.';
                }
                this.successMessage = null; // Clear any previous success messages
                return false; // Return false for failed login
            }
        },
        async loginWithGoogle() {
            try {
                const user = await pb.collection('users').authWithOAuth2({ provider: 'google' });
                this.userData = user; // Store user data in the store
                localStorage.setItem('user', JSON.stringify(user)); // Save user data to local storage
                this.successMessage = 'Login successful!';
                this.errorMessage = null;
                // Return true for successful login
                return true;
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessage = error.message || 'An unexpected error occurred.';
                } else {
                    this.errorMessage = 'An unknown error occurred.';
                }
                this.successMessage = null; // Clear any previous success messages
                return false; // Return false for failed login
            }
        },
        logout() {
            // Clear user data from local storage and reset state
            localStorage.removeItem('user');
            this.userData = null;
            this.successMessage = null;
            this.errorMessage = null;
        },
        loadUserFromLocalStorage() {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                this.userData = JSON.parse(storedUser); // Load user data from local storage
            }
        },
    },
});
