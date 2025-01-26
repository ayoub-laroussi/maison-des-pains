#!/bin/bash

# Créer les dossiers nécessaires
mkdir -p ssl/live/maison-des-pains.fr
mkdir -p ssl/live/api.maison-des-pains.fr

# Générer les certificats pour le frontend
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/live/maison-des-pains.fr/privkey.pem \
    -out ssl/live/maison-des-pains.fr/fullchain.pem \
    -subj "/C=FR/ST=HDF/L=Lille/O=Maison des Pains/CN=maison-des-pains.fr"

# Générer les certificats pour l'API
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/live/api.maison-des-pains.fr/privkey.pem \
    -out ssl/live/api.maison-des-pains.fr/fullchain.pem \
    -subj "/C=FR/ST=HDF/L=Lille/O=Maison des Pains/CN=api.maison-des-pains.fr"

# Définir les permissions
chmod 600 ssl/live/maison-des-pains.fr/privkey.pem
chmod 600 ssl/live/api.maison-des-pains.fr/privkey.pem 