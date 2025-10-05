
import React from 'react';
import type { Prompt } from '../types';
import PromptItem from './PromptItem';

interface PromptListProps {
    prompts: Prompt[];
    onEdit: (prompt: Prompt) => void;
    onDelete: (id: string) => void;
}

const PromptList: React.FC<PromptListProps> = ({ prompts, onEdit, onDelete }) => {
    if (prompts.length === 0) {
        return (
            <div className="text-center py-12 px-6 bg-neutral rounded-lg">
                <h3 className="text-xl font-semibold text-white">Aucun prompt trouvé</h3>
                <p className="mt-2 text-gray-400">Essayez de changer vos filtres ou d'ajouter un nouveau prompt.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map(prompt => (
                <PromptItem
                    key={prompt.id}
                    prompt={prompt}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default PromptList;
