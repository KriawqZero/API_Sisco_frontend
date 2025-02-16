import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('auth') === 'true'
  }),
  actions: {
    login(username: string, password: string) {
      if (username === 'admin' && password === 'admin') {
        this.isAuthenticated = true;
        localStorage.setItem('auth', 'true');
        return true;
      }
      return false;
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('auth');
    }
  }
});