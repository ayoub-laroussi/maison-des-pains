# Configuration Nginx pour Maison des Pains

## Structure
```
nginx/
├── conf.d/
│   └── default.conf    # Configuration principale Nginx
├── ssl/
│   └── live/          # Certificats SSL
│       ├── maison-des-pains.fr/
│       └── api.maison-des-pains.fr/
├── generate-ssl.sh    # Script de génération des certificats
└── README.md         # Ce fichier
```

## Configuration SSL

### Production
Pour la production, utilisez Let's Encrypt pour générer des certificats valides :
```bash
certbot certonly --webroot -w /var/www/html -d maison-des-pains.fr -d api.maison-des-pains.fr
```

### Développement
Pour le développement, générez des certificats auto-signés :
```bash
chmod +x generate-ssl.sh
./generate-ssl.sh
```

## Sécurité
La configuration inclut :
- HTTPS forcé
- Headers de sécurité
- CORS configuré
- TLS 1.2/1.3 uniquement
- Ciphers modernes

## CORS
- Origine autorisée : https://maison-des-pains.fr
- Méthodes : GET, POST, OPTIONS, PUT, DELETE, PATCH
- Headers personnalisés autorisés

## Déploiement
1. Copiez les fichiers de configuration
2. Générez/installez les certificats SSL
3. Vérifiez la configuration : `nginx -t`
4. Redémarrez Nginx : `nginx -s reload` 