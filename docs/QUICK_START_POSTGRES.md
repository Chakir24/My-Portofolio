# 🚀 Démarrage Rapide - PostgreSQL

## Configuration en 3 étapes

### 1️⃣ Choisir une base de données PostgreSQL

**Option recommandée : Neon (Gratuit)**

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte et un nouveau projet
3. Allez dans votre projet → **Connection Details**
4. Copiez la **Connection string** (URI)
   - Format : `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
   - Neon fournit automatiquement la connection string complète

### 2️⃣ Configurer les variables d'environnement

**Pour le développement local :**

Créez un fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générez_une_clé_secrète_ici"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

**Générer NEXTAUTH_SECRET :**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Pour Vercel (Production) :**

Dans Vercel → Settings → Environment Variables, ajoutez les mêmes variables.

### 3️⃣ Initialiser la base de données

```bash
# Option 1 : Utiliser le script automatique
./scripts/setup-postgres.sh

# Option 2 : Commandes manuelles
npm run db:setup
```

C'est tout ! 🎉

## ✅ Vérification

```bash
# Ouvrir Prisma Studio pour voir vos données
npm run db:studio

# Lancer l'application
npm run dev
```

## 📚 Plus d'informations

Consultez `POSTGRES_SETUP.md` pour un guide complet avec toutes les options.

## 🔧 Commandes utiles

```bash
npm run db:setup    # Générer Prisma Client et créer les migrations
npm run db:studio   # Ouvrir Prisma Studio (interface graphique)
npm run db:push     # Pousser le schéma sans créer de migration
npx prisma migrate dev  # Créer une nouvelle migration
npx prisma generate  # Régénérer le client Prisma
```

