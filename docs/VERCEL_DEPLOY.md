# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer votre portfolio Next.js sur Vercel.

## 📋 Prérequis

1. Un compte GitHub (votre code doit être sur GitHub)
2. Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
3. Une base de données PostgreSQL (recommandé pour la production)

## 🚀 Déploiement Rapide

### Option 1 : Déploiement via l'Interface Vercel (Recommandé)

1. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

2. **Importez votre projet**
   - Cliquez sur "Add New Project"
   - Sélectionnez votre dépôt `My-Portofolio`
   - Vercel détectera automatiquement Next.js

3. **Configurez les variables d'environnement**
   - Dans "Environment Variables", ajoutez :
     ```
     DATABASE_URL=postgresql://user:password@host:port/database?schema=public
     NEXTAUTH_URL=https://votre-domaine.vercel.app
     NEXTAUTH_SECRET=votre_secret_key_aleatoire_ici
     ADMIN_USERNAME=votre_username
     ADMIN_PASSWORD=votre_password_securise
     ```
   - **Important** : Générez un `NEXTAUTH_SECRET` sécurisé :
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
     ```

4. **Configurez la base de données**
   - SQLite ne fonctionne pas bien sur Vercel (fichier système)
   - Utilisez une base de données PostgreSQL :
     - **Neon** (recommandé) : Gratuit, serverless PostgreSQL
     - **Vercel Postgres** : Gratuit, intégré à Vercel
     - **Supabase** : Gratuit, facile à configurer
     - **Railway** : Gratuit avec limites

5. **Déployez**
   - Cliquez sur "Deploy"
   - Vercel construira et déploiera automatiquement votre site

### Option 2 : Déploiement via CLI

1. **Installez Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Connectez-vous**
   ```bash
   vercel login
   ```

3. **Déployez**
   ```bash
   vercel
   ```

4. **Ajoutez les variables d'environnement**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add ADMIN_USERNAME
   vercel env add ADMIN_PASSWORD
   ```

5. **Déployez en production**
   ```bash
   vercel --prod
   ```

## 🗄️ Configuration de la Base de Données

### Option A : Neon (Recommandé)

1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet
3. Allez dans votre projet → **Connection Details**
4. Copiez la **Connection string** complète
   - Format : `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
5. Mettez à jour `prisma/schema.prisma` pour utiliser PostgreSQL (déjà fait)
6. Ajoutez `DATABASE_URL` dans Vercel avec la connection string de Neon

### Option B : Vercel Postgres

1. Dans votre projet Vercel, allez dans l'onglet "Storage"
2. Cliquez sur "Create Database" → "Postgres"
3. Vercel créera automatiquement la variable `POSTGRES_URL`
4. Mettez à jour votre `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Mettez à jour `DATABASE_URL` dans les variables d'environnement :
   ```
   DATABASE_URL=$POSTGRES_URL
   ```

### Option C : Supabase (Gratuit)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans "Settings" → "Database"
4. Copiez la "Connection string" (URI)
5. Mettez à jour `prisma/schema.prisma` pour utiliser PostgreSQL
6. Ajoutez `DATABASE_URL` dans Vercel avec la connection string

### Option C : Migration depuis SQLite vers PostgreSQL

1. Mettez à jour `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "postgresql"  // Changez de "sqlite" à "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Créez une nouvelle migration :
   ```bash
   npx prisma migrate dev --name init_postgres
   ```

3. Poussez les migrations :
   ```bash
   npx prisma migrate deploy
   ```

## 🔐 Variables d'Environnement Requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion à la base de données | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_URL` | URL de votre site déployé | `https://mon-portfolio.vercel.app` |
| `NEXTAUTH_SECRET` | Secret pour NextAuth (généré aléatoirement) | `votre_secret_64_caracteres` |
| `ADMIN_USERNAME` | Nom d'utilisateur admin | `admin` |
| `ADMIN_PASSWORD` | Mot de passe admin | `votre_password_securise` |

## 📝 Étapes Post-Déploiement

1. **Vérifiez que les migrations sont appliquées**
   - Vercel exécutera automatiquement `prisma migrate deploy` lors du build

2. **Testez votre site**
   - Visitez votre URL Vercel
   - Testez le formulaire de contact
   - Testez la connexion admin

3. **Configurez un domaine personnalisé (optionnel)**
   - Dans Vercel → Settings → Domains
   - Ajoutez votre domaine personnalisé (ex: `chakir-dev.vercel.app`)
   - **Important** : Mettez à jour `NEXTAUTH_URL` avec le nouveau domaine
   - Voir `docs/CUSTOM_DOMAIN.md` pour un guide détaillé

## ⚠️ Notes Importantes

- **SQLite ne fonctionne pas sur Vercel** : Utilisez PostgreSQL en production
- **NEXTAUTH_URL** : Doit correspondre à l'URL de votre site déployé
- **NEXTAUTH_SECRET** : Changez-le en production, ne le partagez jamais
- **Base de données** : Les données sont persistantes uniquement avec PostgreSQL

## 🔧 Dépannage

### Erreur : "Prisma Client not generated"
- Solution : Vercel exécute automatiquement `prisma generate` via le script `postinstall`

### Erreur : "Database connection failed"
- Vérifiez que `DATABASE_URL` est correctement configuré
- Vérifiez que votre base de données PostgreSQL est accessible

### Erreur : "NEXTAUTH_SECRET is missing"
- Ajoutez la variable d'environnement `NEXTAUTH_SECRET` dans Vercel
- Générez un nouveau secret avec la commande fournie ci-dessus

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma avec Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

