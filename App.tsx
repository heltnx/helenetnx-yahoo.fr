import React, { useState, useMemo, useCallback } from 'react';
import type { Prompt } from './types';
import { usePrompts } from './hooks/usePrompts';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import PromptList from './components/PromptList';
import Modal from './components/Modal';
import PromptForm from './components/PromptForm';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
    const { prompts, addPrompt, updatePrompt, deletePrompt, loading } = usePrompts();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(prompts.map(p => p.category));
        return ['all', ...Array.from(uniqueCategories)];
    }, [prompts]);

    const filteredPrompts = useMemo(() => {
        return prompts
            .filter(prompt => selectedCategory === 'all' || prompt.category === selectedCategory)
            .filter(prompt =>
                prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prompt.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
            );
    }, [prompts, selectedCategory, searchTerm]);

    const handleAddPrompt = useCallback(() => {
        setEditingPrompt(null);
        setIsModalOpen(true);
    }, []);

    const handleEditPrompt = useCallback((prompt: Prompt) => {
        setEditingPrompt(prompt);
        setIsModalOpen(true);
    }, []);

    const handleDeletePrompt = useCallback(async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
            await deletePrompt(id);
        }
    }, [deletePrompt]);

    const handleSavePrompt = useCallback(async (prompt: Prompt) => {
        if (editingPrompt) {
            await updatePrompt(prompt.id, prompt);
        } else {
            const { id, created_at, ...promptData } = prompt;
            await addPrompt(promptData);
        }
        setIsModalOpen(false);
        setEditingPrompt(null);
    }, [editingPrompt, addPrompt, updatePrompt]);

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </aside>
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                            <button
                                onClick={handleAddPrompt}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                <PlusIcon />
                                Ajouter un Prompt
                            </button>
                        </div>
                        {loading ? (
                            <div className="text-center text-gray-400">Chargement des prompts...</div>
                        ) : (
                            <PromptList
                                prompts={filteredPrompts}
                                onEdit={handleEditPrompt}
                                onDelete={handleDeletePrompt}
                            />
                        )}
                    </div>
                </div>
            </main>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PromptForm
                    prompt={editingPrompt}
                    onSave={handleSavePrompt}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default App;
