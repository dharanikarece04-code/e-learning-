import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // --- SIGN IN ---
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    set({
                        user: data.user,
                        session: data.session,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (err) {
                    set({ isLoading: false, error: err.message });
                    return { success: false, error: err.message };
                }
            },

            // --- SIGN UP ---
            register: async (email, password, fullName) => {
                set({ isLoading: true, error: null });
                try {
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: { full_name: fullName },
                        },
                    });
                    if (error) throw error;
                    set({
                        user: data.user,
                        session: data.session,
                        isAuthenticated: !!data.session,
                        isLoading: false,
                    });
                    return { success: true, needsVerification: !data.session };
                } catch (err) {
                    set({ isLoading: false, error: err.message });
                    return { success: false, error: err.message };
                }
            },

            // --- SIGN OUT ---
            logout: async () => {
                await supabase.auth.signOut();
                set({ user: null, session: null, isAuthenticated: false, error: null });
            },

            // --- SYNC SESSION (called on app startup) ---
            initializeAuth: async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    set({ user: session.user, session, isAuthenticated: true });
                }

                // Listen to auth state changes (login/logout from other tabs, token refresh)
                supabase.auth.onAuthStateChange((_event, session) => {
                    if (session) {
                        set({ user: session.user, session, isAuthenticated: true });
                    } else {
                        set({ user: null, session: null, isAuthenticated: false });
                    }
                });
            },

            clearError: () => set({ error: null }),
            updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
