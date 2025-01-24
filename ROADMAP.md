# Roadmap Boulangerie Maison des Pains (API)

![NestJS](https://img.shields.io/badge/NestJS-11.0.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## État d'Avancement Global

- **🟢 Terminé**  
- **⚪️ Non commencé**  
- **🟡 En cours**  
- **🔵 Prêt à démarrer**

*(Pour l’instant, toutes les tâches sont non commencées, donc ⚪️ partout.)*

---

## Version 0.x.x (MVP – Site de Commande en Ligne)

## Phase 1 – Mise en place de l’environnement et de la structure du projet

1. **Initialisation du projet**  
   - [x] Créer l’application (NestJS, Laravel, Symfony, ou autre)  
   - [ ] Configurer le **système de versions** (Git) et la **CI/CD** (GitHub Actions, GitLab CI…)  
   - [ ] Mettre en place un **Docker Compose** (si nécessaire) pour la base de données + application  

2. **Configuration de la base de données**  
   - [ ] Choisir la DB (PostgreSQL, MySQL, etc.)  
   - [ ] Écrire la config de connexion (fichiers `.env`)  
   - [ ] Lancer une migration initiale (ex. table `users`)  

3. **Gestion de l’authentification** (côté client ET côté boulangerie/admin)  
   - [ ] Créer un **module Auth** (JWT, sessions…)  
   - [ ] Créer la table `users` avec rôles (CLIENT, BOULANGER, ADMIN)  
   - [ ] Endpoints d’inscription / connexion (si besoin d’accès client protégé)  
   - [ ] Tests unitaires et E2E de base  

---

## Phase 2 – Catalogue de produits & Front-end client

1. **Modèle `Product`**  
   - [ ] Propriétés : `id`, `name`, `description`, `price`, `imageURL`, etc.  
   - [ ] Migrations & validations (prix > 0, nom obligatoire, etc.)  
   - [ ] Créer un **service** / **repository** pour le CRUD des produits  

2. **Endpoints pour la liste des produits**  
   - [ ] `GET /products` : renvoie la liste de tous les produits  
   - [ ] `GET /products/:id` : détails d’un produit  
   - [ ] (Pour l’admin/boulanger) `POST /products`, `PATCH /products/:id`, `DELETE /products/:id`  

3. **Front-end (ou API) pour l’affichage**  
   - [ ] Page vitrine principale : liste des produits, pagination éventuelle  
   - [ ] Page détail d’un produit : description, prix, photo  
   - [ ] Tests E2E pour vérifier l’affichage et la récupération des produits  

4. **Gestion des images** (optionnel ou plus tard)  
   - [ ] Endpoint d’upload d’image de produit  
   - [ ] Stockage local ou sur un service externe (S3, etc.)  

---

## Phase 3 – Panier (Shopping Cart)

1. **Structure du panier**  
   - [ ] Décider où stocker le panier (en session, en DB, en local storage côté front)  
   - [ ] Créer un **service** Cart qui gère :  
     - Ajout d’un produit  
     - Retrait d’un produit  
     - Modification de la quantité  

2. **Calcul du montant total**  
   - [ ] Dans le service Cart, recalculer le total à chaque ajout/retrait  
   - [ ] Vérifier la synchronisation des stocks (si nécessaire)  

3. **Endpoints dédiés**  
   - [ ] `POST /cart/add` : ajouter un produit avec une quantité  
   - [ ] `POST /cart/remove` : retirer un produit ou diminuer la quantité  
   - [ ] `GET /cart` : lister le contenu du panier + montant total  

4. **Front-end panier**  
   - [ ] Afficher les éléments du panier  
   - [ ] Boutons + / - pour ajuster la quantité  
   - [ ] Afficher le montant actualisé en temps réel  

5. **Tests**  
   - [ ] Tests unitaires (service Cart, vérification du total)  
   - [ ] Tests E2E (ajout d’un produit, vérification du montant)  

---

## Phase 4 – Commandes et Interface côté Boulangerie

### 4.1 – Création d’une commande

1. **Modèle `Order` et `OrderItem`**  
   - [ ] `Order` : `id`, `userId` (ou info client), `totalPrice`, `status` (`EN_ATTENTE`, `ACCEPTEE`, `PRETE`, `TERMINEE`…)  
   - [ ] `OrderItem` : `id`, `orderId`, `productId`, `quantity`, `price` (pris au moment de la commande)  
   - [ ] Migrations & validations  

2. **Endpoint création de commande**  
   - [ ] `POST /orders` : à partir du panier, créer la commande  
   - [ ] Sauvegarder chaque `OrderItem` lié à l’`Order`  
   - [ ] Mettre à jour le stock si nécessaire  

3. **Service commande**  
   - [ ] Logique pour calculer le total (sommes des `price * quantity`)  
   - [ ] Assigner un statut initial (`EN_ATTENTE`, par exemple)  
   - [ ] Éventuellement associer la commande à l’utilisateur ou mettre info contact + téléphone (si pas de compte)  

4. **Tests**  
   - [ ] Tests unitaires création de commande  
   - [ ] Tests E2E (depuis le panier → commande)  

### 4.2 – Interface Boulangerie / Application mobile dédiée

1. **Modèle utilisateur pour la boulangerie**  
   - [ ] Rôle `BOULANGER` ou `ADMIN`  
   - [ ] Authentification (token JWT ou autre) pour accéder au back-office / appli mobile  

2. **Endpoints de gestion des commandes**  
   - [ ] `GET /orders` : liste de toutes les commandes (filtrer par statut)  
   - [ ] `GET /orders/:id` : détails d’une commande  
   - [ ] `PATCH /orders/:id` : changer le statut (accepté, prêt, etc.)  

3. **Interface mobile / back-office**  
   - [ ] Page “Commandes en attente”  
   - [ ] Bouton pour accepter la commande (`EN_ATTENTE` → `ACCEPTEE`)  
   - [ ] Bouton pour marquer comme prête (`ACCEPTEE` → `PRETE`)  
   - [ ] Bouton pour terminer la commande (`PRETE` → `TERMINEE`)  
   - [ ] Affichage du numéro de téléphone du client pour contact (optionnel)

4. **Tests**  
   - [ ] Tests E2E : modification de statut (de `EN_ATTENTE` à `ACCEPTEE`, etc.)  
   - [ ] Tests unitaires logic business (vérifier transitions autorisées)

---

## Phase 5 – Notifications / SMS

1. **Envoi d’email ou de SMS**  
   - [ ] Choisir un service d’envoi (Twilio, Mailgun, OVH SMS, etc.)  
   - [ ] Configurer la clé API dans le back-end  
   - [ ] Quand la commande est **validée** par le client (ou payée, si besoin) → Envoyer mail/SMS de confirmation  
   - [ ] Quand le boulanger **accepte** la commande → Envoyer notification au client (“Votre commande est en préparation”)  
   - [ ] Quand la commande est **prête** → Envoyer notification (“Venez chercher votre commande”)  

2. **Gestion des statuts côté client**  
   - [ ] `GET /orders/:id` permet de voir le statut en temps réel  
   - [ ] (Optionnel) Système de WebSocket pour une mise à jour en direct sur la page  

3. **Personnalisation du message**  
   - [ ] Templating (nom de la boulangerie, numéro de commande, instructions de retrait)  
   - [ ] Tests d’envoi en sandbox  

4. **Tests**  
   - [ ] Tests unitaires d’envoi de SMS (mock)  
   - [ ] Tests E2E : transition de statut → envoi effectif  

---

## Phase 6 – Paiement en Ligne (optionnel)

1. **Intégration Stripe/PayPal**  
   - [ ] Configuration du secret et Webhook  
   - [ ] `POST /payments/create` → initier un paiement  
   - [ ] Retour du paiement → MàJ du statut commande si tout est OK  

2. **Tests**  
   - [ ] Tests E2E flux de paiement (sandbox)  
   - [ ] Validation du total avec la commande  

---

## Phase 7 – Mise en Production & Maintenance

1. **Infrastructure**  
   - [ ] Configurer un hébergement (server VPS, Docker, etc.)  
   - [ ] Mettre en place un reverse proxy (Nginx ou autre) + HTTPS (Let’s Encrypt)  

2. **CI/CD**  
   - [ ] Automatiser le déploiement (GitHub Actions, scripts Docker, etc.)  
   - [ ] Vérifier la bonne exécution des tests avant chaque mise en prod  

3. **Monitoring & Logs**  
   - [ ] Mettre en place un système de logs (Winston, pino, etc.)  
   - [ ] Système d’alerte si l’application tombe  

4. **Maintenance continue**  
   - [ ] Mises à jour de sécurité (npm/yarn audit)  
   - [ ] Vérification des modules et dépendances  

---

## Récapitulatif des actions à coder

- **Base de données & Authentification**  
  1. Créer la DB & modèles `User`  
  2. Mettre en place le `AuthModule` (JWT, mots de passe hachés)  
- **Catalogue produits**  
  1. CRUD `Product` (entité, service, controller)  
  2. Gestion éventuelle des images  
- **Panier**  
  1. Service pour ajouter/enlever produits, calculer le total  
  2. Endpoints /cart et tests E2E  
- **Commandes**  
  1. Entités `Order` & `OrderItem`  
  2. Endpoints de création `POST /orders`  
  3. Statuts & transitions (`EN_ATTENTE` → `ACCEPTEE` → `PRETE` → `TERMINEE`)  
- **Interface Boulangerie / Admin**  
  1. Endpoints pour lister et modifier le statut des commandes  
  2. Application mobile ou back-office web minimal  
- **Notifications**  
  1. Intégration SMS/Email  
  2. Envoi automatique lors des changements de statut  
- **Déploiement**  
  1. Dockerfiles, CI/CD, scripts Nginx  
  2. Monitoring et logs  

À la fin, on aura :  
- Un **site vitrine** permettant de lister les produits.  
- Une **section e-commerce** pour ajouter des produits au panier, passer commande, et recevoir des notifications.  
- Une **application (ou interface) Boulangerie** pour gérer les commandes en temps réel, avec les statuts et l’envoi de confirmations (SMS/Email).