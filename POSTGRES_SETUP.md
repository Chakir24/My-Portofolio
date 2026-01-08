# Configuration PostgreSQL

Ce guide vous explique comment configurer PostgreSQL pour votre portfolio.

## 🗄️ Options de Base de Données PostgreSQL

### Option 1 : Neon (Gratuit, Recommandé)

**Avantages** : Gratuit, serverless PostgreSQL, généreux, facile à utiliser

1. **Créer un compte**
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un compte gratuit

2. **Créer un projet**
   - Cliquez sur "Create a project"
   - Choisissez un nom et une région proche de vous
   - Cliquez sur "Create project"

3. **Récupérer la connection string**
   - Dans votre projet, allez dans **Connection Details**
   - Copiez la **Connection string** complète
   - Format : `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
   - Neon fournit automatiquement la connection string complète avec tous les paramètres

4. **Configurer dans Vercel**
   - Ajoutez la variable d'environnement `DATABASE_URL` avec la connection string

### Option 2 : Vercel Postgres (Recommandé pour Vercel)

**Avantages** : Intégré à Vercel, gratuit, facile à configurer

1. **Créer la base de données sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez ou ouvrez votre projet
   - Allez dans l'onglet **"Storage"**
   - Cliquez sur **"Create Database"** → **"Postgres"**
   - Vercel créera automatiquement la variable `POSTGRES_URL`

2. **Configurer la variable d'environnement**
   - Dans Vercel → Settings → Environment Variables
   - Ajoutez ou modifiez :
     ```
     DATABASE_URL=$POSTGRES_URL
     ```
   - Ou utilisez directement `POSTGRES_URL` si Vercel le fournit

### Option 3 : Supabase (Gratuit)

**Avantages** : Gratuit, généreux, interface web, facile à utiliser

1. **Créer un compte**
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un compte gratuit

2. **Créer un projet**
   - Cliquez sur "New Project"
   - Choisissez un nom et un mot de passe pour la base de données
   - Sélectionnez une région proche de vous
   - Cliquez sur "Create new project"

3. **Récupérer la connection string**
   - Allez dans **Settings** → **Database**
   - Trouvez la section **"Connection string"**
   - Copiez l'URI (format : `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)
   - Remplacez `[YOUR-PASSWORD]` par votre mot de passe

4. **Configurer dans Vercel**
   - Ajoutez la variable d'environnement `DATABASE_URL` avec la connection string

### Option 4 : Railway (Gratuit avec limites)

**Avantages** : Gratuit, facile à utiliser

1. Allez sur [railway.app](https://railway.app)
2. Créez un projet PostgreSQL
3. Récupérez la connection string
4. Ajoutez-la dans Vercel

### Option 5 : PostgreSQL Local (Pour le développement)

Si vous voulez tester localement avec PostgreSQL :

1. **Installer PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS (avec Homebrew)
   brew install postgresql
   
   # Windows
   # Téléchargez depuis https://www.postgresql.org/download/windows/
   ```

2. **Créer une base de données**
   ```bash
   # Se connecter à PostgreSQL
   sudo -u postgres psql
   
   # Créer une base de données
   CREATE DATABASE portfolio_db;
   
   # Créer un utilisateur
   CREATE USER portfolio_user WITH PASSWORD 'votre_password';
   
   # Donner les permissions
   GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
   \q
   ```

3. **Configurer .env local**
   ```
   DATABASE_URL="postgresql://portfolio_user:votre_password@localhost:5432/portfolio_db?schema=public"
   ```

## 🔧 Configuration du Projet

### 1. Le schéma Prisma est déjà configuré pour PostgreSQL

Le fichier `prisma/schema.prisma` utilise maintenant `provider = "postgresql"`.

### 2. Créer les migrations

Une fois que vous avez configuré votre `DATABASE_URL`, exécutez :

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer les migrations
npx prisma migrate dev --name init_postgres
```

### 3. Vérifier la connexion

```bash
# Ouvrir Prisma Studio pour voir vos données
npx prisma studio
```

## 📝 Variables d'Environnement

### Pour le développement local

Créez un fichier `.env` (ne sera pas commité) :

```env
# PostgreSQL Local ou Cloud
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre_secret_key_aleatoire"

# Admin
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

### Pour Vercel (Production)

Dans Vercel → Settings → Environment Variables, ajoutez :

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXTAUTH_URL=https://votre-site.vercel.app
NEXTAUTH_SECRET=votre_secret_key_aleatoire
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votre_password_securise
```

## 🚀 Migration depuis SQLite vers PostgreSQL

Si vous avez déjà des données dans SQLite :

1. **Exporter les données SQLite** (optionnel, si vous avez des données importantes)
   ```bash
   sqlite3 prisma/dev.db .dump > backup.sql
   ```

2. **Mettre à jour le schéma Prisma** (déjà fait)

3. **Créer les nouvelles migrations**
   ```bash
   npx prisma migrate dev --name init_postgres
   ```

4. **Importer les données** (si nécessaire)
   - Vous devrez adapter le format SQL pour PostgreSQL
   - Ou utiliser un outil de migration

## ✅ Vérification

1. **Tester la connexion**
   ```bash
   npx prisma db pull  # Vérifie la connexion
   ```

2. **Vérifier les tables**
   ```bash
   npx prisma studio  # Interface graphique
   ```

3. **Tester l'application**
   - Lancez `npm run dev`
   - Testez le formulaire de contact
   - Vérifiez que les données sont sauvegardées

## 🔐 Sécurité

- **Ne commitez jamais** votre fichier `.env`
- **Utilisez des mots de passe forts** pour la base de données
- **Générez un NEXTAUTH_SECRET sécurisé** :
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
- **Utilisez des variables d'environnement** dans Vercel, jamais de valeurs en dur

## 📚 Ressources

- [Prisma avec PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Documentation](https://supabase.com/docs)

