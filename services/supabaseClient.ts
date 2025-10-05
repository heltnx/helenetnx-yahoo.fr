import { createClient, SupabaseClient } from '@supabase/supabase-js';

// IMPORTANT: Remplacez par vos propres URL et clé d'API Supabase.
// Vous pouvez les trouver dans les paramètres de votre projet Supabase : `Paramètres` > `API`.
// services/supabaseClient.ts
const supabaseUrl = 'https://rhqmtlwoeldcngwhdujs.supabase.co'; // Votre URL ici
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJocW10bHdvZWxkY25nd2hkdWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NzgwODAsImV4cCI6MjA3NTI1NDA4MH0.0-sI0jMHqYzwwa2ei6k6UT5T6wE6io6d4H6ths7WESg'; // Votre clé anon ici
let supabase: SupabaseClient;

if (supabaseUrl.startsWith('VOTRE_') || supabaseAnonKey.startsWith('VOTRE_')) {
    console.warn('Veuillez configurer vos identifiants Supabase dans services/supabaseClient.ts pour que l\'application fonctionne.');
    
    // Crée un client factice pour éviter le crash de l'application et guider le développeur.
    const createDummyClient = () => {
        const errorMessage = 'Configuration de Supabase requise. Veuillez suivre les instructions dans le README.md et configurer le fichier `services/supabaseClient.ts`.';
        
        const executeAndAlert = () => {
            alert(errorMessage);
            // Simule la structure de réponse d'erreur de Supabase pour être gérée correctement
            // par le `handleSupabaseError` dans dbService.
            return {
                error: new Error(errorMessage),
                data: null,
            };
        };

        // L'objet factice doit être "thenable" pour que `await` fonctionne
        // et les méthodes doivent être chaînables.
        const dummyChain = {
            select: function() { return this; },
            insert: function() { return this; },
            update: function() { return this; },
            delete: function() { return this; },
            order: function() { return this; },
            eq: function() { return this; },
            // La méthode `then` est ce qui rend un objet "awaitable".
            // Le runtime JS l'appelle lorsqu'on utilise `await` sur l'objet.
            then: function(resolve: (value: any) => void) {
                resolve(executeAndAlert());
            }
        };

        return {
            from: () => dummyChain,
        };
    };

    supabase = createDummyClient() as any;
} else {
    // Initialise le vrai client Supabase si les informations d'identification sont présentes.
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
