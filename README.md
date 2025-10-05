# Configuration de Supabase pour le Gestionnaire de Prompts IA

Ce projet utilise Supabase comme base de données backend. Suivez les étapes ci-dessous pour le configurer.

## 1. Créer un projet Supabase

Si vous n'en avez pas, créez un compte sur [supabase.com](https://supabase.com) et créez un nouveau projet.

## 2. Obtenir les clés d'API

Dans le tableau de bord de votre projet Supabase, allez dans `Project Settings` > `API`. Vous aurez besoin de :
- L'URL du projet (`Project URL`)
- La clé publique `anon` (`Project API Keys`)

## 3. Configurer le client Supabase

Ouvrez le fichier `services/supabaseClient.ts` et remplacez les placeholders `VOTRE_URL_SUPABASE` et `VOTRE_CLE_ANON_SUPABASE` par les informations que vous venez de récupérer.

```typescript
// services/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'VOTRE_URL_SUPABASE'; // Remplacez par votre URL
const supabaseAnonKey = 'VOTRE_CLE_ANON_SUPABASE'; // Remplacez par votre clé anon

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 4. Créer la table "prompts"

Allez dans `SQL Editor` dans le tableau de bord de votre projet Supabase et exécutez la requête SQL suivante pour créer la table nécessaire.

```sql
-- Création de la table pour stocker les prompts
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  keywords TEXT[]
);
```

## 5. (Optionnel) Insérer des données de démarrage

Pour commencer avec quelques prompts d'exemple, exécutez la requête SQL suivante dans l'éditeur SQL.

```sql
-- Insertion des données d'exemple
INSERT INTO prompts (title, content, category, keywords) VALUES
('Générateur de persona marketing', 'Agis comme un expert en marketing stratégique. Crée un persona marketing détaillé pour une entreprise qui vend [PRODUIT/SERVICE] à [CLIENTÈLE CIBLE]. Inclus des informations sur la démographie, les objectifs, les défis, les motivations et les canaux de communication préférés. Le persona doit s''appeler [NOM DU PERSONA].', 'Marketing', '{"persona", "marketing", "stratégie"}'),
('Correcteur de code Python', 'Tu es un développeur Python senior et un expert en relecture de code. Analyse le bloc de code Python suivant, identifie les bugs potentiels, les problèmes de performance et les améliorations de style. Fournis une version corrigée et optimisée du code avec des commentaires expliquant tes changements.\n\nCode à analyser :\n```python\n[COLLER LE CODE ICI]\n```', 'Développement', '{"python", "code", "debug", "review"}'),
('Créateur d''idées de contenu', 'Génère 5 idées de contenu créatives (articles de blog, vidéos, posts sur les réseaux sociaux) sur le sujet de [SUJET PRINCIPAL]. Pour chaque idée, fournis un titre accrocheur, un bref résumé et 3 points clés à aborder.', 'Création de Contenu', '{"contenu", "idées", "blog", "réseaux sociaux"}');
```

Une fois ces étapes terminées, votre application devrait être connectée à votre base de données Supabase.
