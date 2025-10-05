import React, { useState, useEffect } from 'react';
import type { Prompt } from '../types';

interface PromptFormProps {
    prompt: Prompt | null;
    onSave: (prompt: Prompt) => void;
    onCancel: () => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');

    useEffect(() => {
        if (prompt) {
            setTitle(prompt.title);
            setContent(prompt.content);
            setCategory(prompt.category);
            setKeywords(prompt.keywords.join(', '));
        } else {
            setTitle('');
            setContent('');
            setCategory('');
            setKeywords('');
        }
    }, [prompt]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const keywordsArray = keywords.split(',').map(kw => kw.trim()).filter(Boolean);
        
        onSave({
            id: prompt ? prompt.id : '',
            title,
            content,
            category,
            keywords: keywordsArray,
            created_at: prompt ? prompt.created_at : new Date().toISOString(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-white mb-6">{prompt ? 'Modifier le Prompt' : 'Ajouter un Prompt'}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Titre</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Catégorie</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Prompt</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={8}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-1">Mots-clés (séparés par des virgules)</label>
                    <input
                        id="keywords"
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-colors"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    );
};

export default PromptForm;
