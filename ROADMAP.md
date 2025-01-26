# ROADMAP Maison des Pains

## Backend (API)

### Phase 1 : Configuration API ✅
- [x] Configuration du backend NestJS
- [x] Mise en place de la base de données PostgreSQL
- [x] Configuration des tests unitaires
- [x] Configuration des tests e2e
- [ ] Configuration Docker

### Phase 2 : Authentification API ⚪️
- [x] Module Auth avec JWT
- [x] Module Users avec rôles
- [x] Guards et stratégies d'authentification
- [ ] Tests des endpoints Auth
- [ ] Tests des endpoints Users
- [ ] Documentation Swagger

### Phase 3 : Produits API ⚪️
- [x] Module Products
- [x] Entité Product et tests
- [ ] CRUD Produits complet
- [ ] Catégorisation des produits
- [ ] Gestion des images
- [ ] Tests des endpoints Products
- [ ] Documentation Swagger

### Phase 4 : Magasins API 🔵
- [ ] Module Stores
- [ ] Entité Store et tests
- [ ] CRUD Magasins
- [ ] Gestion des horaires
- [ ] Gestion des stocks
- [ ] Tests des endpoints Stores
- [ ] Documentation Swagger

### Phase 5 : Commandes API 🔵
- [ ] Module Orders
- [ ] Entité Order et tests
- [ ] CRUD Commandes
- [ ] Gestion des statuts
- [ ] Système de paiement
- [ ] Notifications email
- [ ] Tests des endpoints Orders
- [ ] Documentation Swagger

### Phase 6 : Marketing API 🟡
- [ ] Module Marketing
- [ ] Gestion Newsletter
- [ ] Gestion Promotions
- [ ] Système de fidélité
- [ ] Tests des endpoints Marketing
- [ ] Documentation Swagger

## Frontend (React)

### Phase 1 : Configuration Frontend ✅
- [x] Configuration React/Vite
- [x] Configuration TypeScript
- [x] Configuration Tailwind CSS
- [ ] Configuration des tests
- [ ] Configuration des routes

### Phase 2 : Authentification Frontend ⚪️
- [ ] Page de connexion
- [ ] Page d'inscription
- [ ] Gestion du profil
- [ ] Récupération de mot de passe
- [ ] Tests des composants Auth
- [ ] Intégration avec l'API Auth

### Phase 3 : Interface Client ⚪️
- [ ] Layout principal
- [ ] Page d'accueil
  - [ ] Bannière principale
  - [ ] Produits populaires
  - [ ] Actualités
  - [ ] Témoignages
- [ ] Tests des composants
- [ ] Intégration avec l'API

### Phase 4 : Catalogue Produits 🔵
- [ ] Liste des produits
- [ ] Filtres et recherche
- [ ] Détail produit
- [ ] Panier d'achat
- [ ] Tests des composants
- [ ] Intégration avec l'API Products

### Phase 5 : Gestion Magasins 🔵
- [ ] Liste des magasins
- [ ] Détail magasin
- [ ] Carte interactive
- [ ] Sélection magasin
- [ ] Tests des composants
- [ ] Intégration avec l'API Stores

### Phase 6 : Système de Commande 🟡
- [ ] Processus de commande
- [ ] Sélection créneau
- [ ] Paiement
- [ ] Historique commandes
- [ ] Tests des composants
- [ ] Intégration avec l'API Orders

### Phase 7 : Interface Administration 🟡
- [ ] Dashboard admin
- [ ] Gestion produits
- [ ] Gestion stocks
- [ ] Gestion commandes
- [ ] Statistiques
- [ ] Tests des composants
- [ ] Intégration avec les APIs

### Phase 8 : Optimisation 🟢
- [ ] SEO
- [ ] Performance
- [ ] Responsive design
- [ ] PWA
- [ ] Tests de performance

Légende :
- ⚪️ En cours
- 🔵 Priorité haute
- 🟡 Priorité moyenne
- 🟢 Priorité basse
- ✅ Terminé