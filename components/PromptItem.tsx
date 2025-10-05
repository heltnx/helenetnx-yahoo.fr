
import React, { useState } from 'react';
import type { Prompt } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface PromptItemProps {
    prompt: Prompt;
    onEdit: (prompt: Prompt) => void;
    onDelete: (id: string) => void;
}

const PromptItem: React.FC<PromptItemProps> = ({ prompt, onEdit, onDelete }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-neutral rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white mb-2">{prompt.title}</h3>
                    <span className="bg-accent/20 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">{prompt.category}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-4">{prompt.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.keywords.map(kw => (
                        <span key={kw} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded">
                            #{kw}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-gray-800 p-3 flex justify-between items-center">
                 <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${copied ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
                    title="Copier le prompt"
                >
                    <ClipboardIcon />
                    {copied ? 'Copié!' : 'Copier'}
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(prompt)}
                        className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                        title="Modifier"
                    >
                       <EditIcon />
                    </button>
                    <button
                        onClick={() => onDelete(prompt.id)}
                        className="p-2 rounded-full text-gray-400 hover:bg-red-800 hover:text-red-300 transition-colors"
                        title="Supprimer"
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptItem;
