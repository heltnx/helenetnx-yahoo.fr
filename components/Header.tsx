
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-neutral shadow-lg">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                    <span role="img" aria-label="brain icon" className="mr-2">🧠</span>
                    Gestionnaire de Prompts IA
                </h1>
            </div>
        </header>
    );
};

export default Header;
