# Plateforme de Streaming

Une application web moderne pour découvrir et explorer des films et séries TV, avec un système d'authentification utilisateur.

## 🚀 Fonctionnalités

- **Découverte de contenu** : Films populaires et séries TV
- **Recherche** : Rechercher des films et séries par titre
- **Genres** : Explorer le contenu par genres
- **Détails complets** : Informations détaillées sur chaque film/série
- **Authentification** : Inscription et connexion utilisateur
- **Profil utilisateur** : Gestion du profil personnel
- **Responsive** : Interface adaptée mobile et desktop

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Routage côté client
- **ESLint** - Linting du code

### Backend
- **PHP 8** - Langage serveur
- **MySQL** - Base de données
- **Firebase JWT** - Authentification par tokens
- **Composer** - Gestionnaire de dépendances PHP

### API externes
- **TMDB (The Movie Database)** - Source de données pour films et séries

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure) - [Télécharger](https://nodejs.org/)
- **PHP** (version 8.0 ou supérieure) - Inclus dans WampServer/XAMPP
- **MySQL** - Inclus dans WampServer/XAMPP
- **Composer** - [Télécharger](https://getcomposer.org/)
- **Git** - [Télécharger](https://git-scm.com/)

## 🔧 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/plateforme-streaming.git
cd plateforme-streaming
```

### 2. Configuration du Backend

#### Installation des dépendances PHP
```bash
cd backend
composer install
```

#### Configuration de la base de données
1. Créez une base de données MySQL nommée `plateforme-streaming`
2. Importez le schéma de base de données :
   ```bash
   mysql -u root -p plateforme-streaming < database/schema.sql
   ```
3. Modifiez le fichier `backend/config/db.php` avec vos informations de base de données :
   ```php
   $host = 'localhost';
   $dbname = 'plateforme-streaming';
   $username = 'root'; // Votre nom d'utilisateur MySQL
   $password = ''; // Votre mot de passe MySQL
   ```

### 3. Configuration du Frontend

#### Installation des dépendances
```bash
cd ../frontend
npm install
```

#### Obtention de la clé API TMDB

**Pour les débutants : Suivez ces étapes simples**

1. **Créer un compte TMDB** :
   - Allez sur [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Cliquez sur "Sign Up" (S'inscrire)
   - Remplissez le formulaire avec votre email, nom d'utilisateur et mot de passe
   - Confirmez votre email

2. **Accéder aux paramètres API** :
   - Connectez-vous à votre compte TMDB
   - Cliquez sur votre avatar en haut à droite
   - Sélectionnez "Settings" (Paramètres)

3. **Créer une clé API** :
   - Dans le menu de gauche, cliquez sur "API"
   - Cliquez sur "Create" (Créer) ou "Request an API Key"
   - Choisissez "Developer" (Développeur)
   - Acceptez les termes d'utilisation
   - Remplissez le formulaire :
     - **Type of use** : Personal (Personnel)
     - **Application Name** : "Ma Plateforme Streaming" (ou ce que vous voulez)
     - **Application URL** : `http://localhost` (pour le développement local)
     - **Application Summary** : "Application de streaming personnelle pour découvrir des films et séries"

4. **Récupérer votre clé API** :
   - Après validation, allez dans "API" > "Your API Key"
   - Copiez la **v4 auth (bearer token)** ou la **API Key (v3 auth)**

#### Création du fichier .env

1. **Copier le fichier exemple** :
   ```bash
   cp .env.example .env
   ```

2. **Modifier le fichier .env** :
   Ouvrez le fichier `.env` avec un éditeur de texte et configurez :
   ```env
   VITE_TMDB_API_KEY=votre_cle_api_tmdb_ici
   VITE_API_BASE_URL=
   ```

   **Exemple** :
   ```env
   VITE_TMDB_API_KEY=8b8fdjkdj57862138408787a999v86fd
   VITE_API_BASE_URL=
   ```

   ⚠️ **Important** : 
   - Ne partagez jamais votre clé API TMDB publiquement !
   - `VITE_API_BASE_URL=` permet d'utiliser le proxy Vite en développement pour éviter les problèmes CORS.

## 🚀 Lancement du projet

### Démarrage du backend
```bash
# Depuis le dossier backend
php -S localhost:8000
```

### Démarrage du frontend
```bash
# Depuis le dossier frontend
npm run dev
```

Votre application sera accessible sur :
- **Frontend** : http://localhost:5173 (par défaut avec Vite)
- **Backend** : http://localhost:8000

## 📁 Structure du projet

```
plateforme-streaming/
├── backend/                    # API PHP
│   ├── auth/                   # Authentification (login/signup)
│   ├── config/                 # Configuration base de données
│   ├── database/               # Schéma SQL
│   ├── vendor/                 # Dépendances Composer
│   └── middleware.php          # Middleware JWT
├── frontend/                   # Application React
│   ├── public/                 # Assets statiques
│   ├── src/
│   │   ├── components/         # Composants React
│   │   ├── hook/               # Hooks personnalisés
│   │   ├── assets/             # Images et styles
│   │   └── css/                # Styles CSS
│   ├── .env.example            # Exemple de configuration
│   └── package.json            # Dépendances Node.js
└── README.md                   # Ce fichier
```

## 🔍 Dépannage

### Erreur "API Key invalid"
- Vérifiez que votre clé TMDB est correcte dans `.env`
- Assurez-vous que votre compte TMDB est validé

### Erreur de connexion base de données
- Vérifiez les credentials dans `backend/config/db.php`
- Assurez-vous que MySQL est démarré (WampServer vert)

### Problèmes de CORS
- En développement, `VITE_API_BASE_URL=` utilise le proxy Vite pour éviter les erreurs CORS.
- En production, assurez-vous que `VITE_API_BASE_URL` pointe vers l'URL correcte de votre hébergement.

### Le frontend ne se lance pas
```bash
cd frontend
npm install  # Réinstaller les dépendances
npm run dev  # Relancer le serveur
```

## 📝 Scripts disponibles

### Frontend
```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build pour la production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification du code
```

### Backend
```bash
composer install  # Installation des dépendances
php -S localhost:8000  # Démarrage du serveur PHP
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Reporter des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests


## 🙏 Remerciements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) pour l'API
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [React](https://reactjs.org/) pour le framework frontend

---

**Note pour les débutants** : Si vous rencontrez des difficultés, consultez la documentation officielle de chaque technologie. Bonne découverte du monde du développement web !