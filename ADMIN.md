# Admin Dashboard - Documentation

## Accès au Dashboard

L'admin dashboard est accessible à l'adresse : `/admin/dashboard`

### Identifiants par défaut

- **Username** : `admin`
- **Password** : `admin123`

⚠️ **Important** : Changez ces identifiants en production en définissant les variables d'environnement suivantes dans votre fichier `.env` :

```env
ADMIN_USERNAME=votre_nom_utilisateur
ADMIN_PASSWORD=votre_mot_de_passe_securise
NEXTAUTH_SECRET=votre_secret_key_aleatoire
```

## Configuration

### Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env` :

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials (optionnel, utilise les valeurs par défaut si non définies)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

### Générer un secret NextAuth

Pour générer un secret sécurisé pour NextAuth, vous pouvez utiliser :

```bash
openssl rand -base64 32
```

Ou en ligne de commande Node.js :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Fonctionnalités

### Dashboard

Le dashboard affiche :

1. **Statistiques** :
   - Total des contacts
   - Total des projets
   - Total des soumissions
   - Statistiques de la semaine dernière

2. **Tableaux de données** :
   - **Onglet Contacts** : Affiche tous les messages de contact
   - **Onglet Projects** : Affiche toutes les soumissions de projets

3. **Actions** :
   - Bouton Refresh pour actualiser les données
   - Bouton Logout pour se déconnecter

### Sécurité

- Authentification requise pour accéder au dashboard
- Les API routes sont protégées par NextAuth
- Session JWT avec expiration de 30 jours
- Redirection automatique vers la page de login si non authentifié

## API Routes

### GET /api/admin/stats
Retourne les statistiques globales (nécessite authentification)

### GET /api/admin/contacts
Retourne tous les contacts (nécessite authentification)

### GET /api/admin/projects
Retourne tous les projets (nécessite authentification)

## Personnalisation

### Changer les identifiants

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez :
   ```env
   ADMIN_USERNAME=votre_username
   ADMIN_PASSWORD=votre_password
   NEXTAUTH_SECRET=votre_secret
   ```
3. Redémarrez le serveur

### Améliorer la sécurité

Pour la production, considérez :
- Utiliser bcrypt pour hasher les mots de passe
- Implémenter un système de rôles/permissions
- Ajouter un rate limiting
- Utiliser HTTPS uniquement
- Ajouter une authentification à deux facteurs (2FA)

## Dépannage

### Problème de connexion

1. Vérifiez que les variables d'environnement sont correctement définies
2. Vérifiez que `NEXTAUTH_SECRET` est défini
3. Vérifiez que la base de données est accessible
4. Consultez les logs du serveur pour les erreurs

### Session expirée

Si votre session expire, vous serez automatiquement redirigé vers la page de login.

