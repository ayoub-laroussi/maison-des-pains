# Maison des Pains

Application web pour la gestion d'une boulangerie artisanale.

## Technologies Utilisées

### Frontend
- React avec Vite
- TypeScript
- Tailwind CSS
- PostCSS

### Backend
- NestJS
- TypeScript
- PostgreSQL

## Prérequis

- Node.js (v18 ou supérieur)
- npm
- PostgreSQL

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

## Structure du Projet

```
maison-des-pains/
├── frontend/          # Application React
│   ├── src/          # Code source frontend
│   └── public/       # Fichiers statiques
└── backend/          # API NestJS
    └── src/          # Code source backend
```

## Scripts Disponibles

### Frontend

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production

### Backend

- `npm run start:dev` : Lance le serveur en mode développement
- `npm run build` : Compile l'application
- `npm run start:prod` : Lance le serveur en mode production

## Contribution

1. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
2. Committez vos changements (`git commit -m 'feat: ajout de ma fonctionnalite'`)
3. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
4. Ouvrez une Pull Request

## License

MIT