import { useState, useEffect, useCallback } from 'react';
import type { Prompt } from '../types';
import { dbService } from '../services/dbService';

export const usePrompts = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPrompts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await dbService.getPrompts();
            setPrompts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des prompts:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrompts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addPrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'created_at'>) => {
        const newPrompt = await dbService.addPrompt(promptData);
        setPrompts(prev => [newPrompt, ...prev]);
    }, []);

    const updatePrompt = useCallback(async (id: string, promptData: Partial<Prompt>) => {
        // Exclure les champs gérés par la base de données de la charge utile de mise à jour
        const { id: promptId, created_at, ...updateData } = promptData;
        const updatedPrompt = await dbService.updatePrompt(id, updateData);
        setPrompts(prev => prev.map(p => (p.id === id ? updatedPrompt : p)));
    }, []);

    const deletePrompt = useCallback(async (id: string) => {
        await dbService.deletePrompt(id);
        setPrompts(prev => prev.filter(p => p.id !== id));
    }, []);

    return { prompts, loading, addPrompt, updatePrompt, deletePrompt, fetchPrompts };
};
