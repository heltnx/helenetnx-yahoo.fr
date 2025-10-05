import { supabase } from './supabaseClient';
import type { Prompt } from '../types';

// Helper pour gérer les erreurs Supabase de manière centralisée
const handleSupabaseError = ({ error, ...rest }: { error: any, [key: string]: any }) => {
    if (error) {
        console.error('Erreur Supabase:', error.message);
        throw error;
    }
    return rest;
};

export const dbService = {
    async getPrompts(): Promise<Prompt[]> {
        const { data } = handleSupabaseError(
            await supabase
                .from('prompts')
                .select('*')
                .order('created_at', { ascending: false })
        );
        return (data as Prompt[]) || [];
    },

    async addPrompt(promptData: Omit<Prompt, 'id' | 'created_at'>): Promise<Prompt> {
        const { data } = handleSupabaseError(
            await supabase.from('prompts').insert([promptData]).select()
        );
        if (!data || data.length === 0) {
            throw new Error("La création du prompt a échoué.");
        }
        return data[0] as Prompt;
    },

    async updatePrompt(id: string, promptData: Partial<Omit<Prompt, 'id' | 'created_at'>>): Promise<Prompt> {
        const { data } = handleSupabaseError(
            await supabase.from('prompts').update(promptData).eq('id', id).select()
        );
         if (!data || data.length === 0) {
            throw new Error("La mise à jour du prompt a échoué.");
        }
        return data[0] as Prompt;
    },

    async deletePrompt(id: string): Promise<void> {
        handleSupabaseError(await supabase.from('prompts').delete().eq('id', id));
    },
};
