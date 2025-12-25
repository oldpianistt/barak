import { useState, useEffect } from 'react';
import { LoginCredentials } from '../types/auth';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication status on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // Try to access a protected endpoint to check if authenticated
            const response = await fetch('http://localhost:8081/api/admin/hero-slides', {
                credentials: 'include',
            });
            setIsAuthenticated(response.ok);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            const response = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                credentials: 'include',
            });

            if (response.ok) {
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await fetch('http://localhost:8081/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsAuthenticated(false);
        }
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
    };
}
