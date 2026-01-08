# Base de Données - Documentation

Ce projet utilise Prisma avec SQLite pour stocker les données des formulaires.

## Structure de la Base de Données

### ContactMessage
Stocke les messages du formulaire de contact :
- `id` : Identifiant unique
- `name` : Nom complet (requis)
- `email` : Email (requis)
- `phone` : Numéro de téléphone (optionnel)
- `subject` : Sujet (optionnel)
- `message` : Message (requis)
- `createdAt` : Date de création

### ProjectSubmission
Stocke les soumissions de projets :
- `id` : Identifiant unique
- `fullName` : Nom complet (requis)
- `email` : Email (requis)
- `phone` : Numéro de téléphone (optionnel)
- `company` : Entreprise/Organisation (optionnel)
- `projectType` : Type de projet (requis)
- `projectTitle` : Titre du projet (requis)
- `projectDescription` : Description du projet (requis)
- `budget` : Budget estimé (optionnel)
- `timeline` : Délai préféré (optionnel)
- `features` : Fonctionnalités clés (optionnel)
- `technologies` : Technologies préférées (optionnel)
- `reference` : Référence/Inspiration (optionnel)
- `additionalInfo` : Informations supplémentaires (optionnel)
- `createdAt` : Date de création

## Configuration

Le fichier `.env` contient la configuration de la base de données :
```
DATABASE_URL="file:./dev.db"
```

## Commandes Prisma

### Générer le client Prisma
```bash
npx prisma generate
```

### Créer une migration
```bash
npx prisma migrate dev --name nom_de_la_migration
```

### Appliquer les migrations
```bash
npx prisma migrate deploy
```

### Ouvrir Prisma Studio (interface graphique)
```bash
npx prisma studio
```

## API Routes

### POST /api/contact
Reçoit les données du formulaire de contact.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Question",
  "message": "Votre message ici"
}
```

### POST /api/project
Reçoit les données du formulaire de soumission de projet.

**Body:**
```json
{
  "full-name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Company Name",
  "project-type": "web-development",
  "project-title": "Mon Projet",
  "project-description": "Description du projet",
  "budget": "10k-25k",
  "timeline": "2-3-months",
  "features": "Feature 1, Feature 2",
  "technologies": "React, Node.js",
  "reference": "https://example.com",
  "additional-info": "Informations supplémentaires"
}
```

## Visualisation des Données

Pour visualiser et gérer les données dans la base de données, utilisez Prisma Studio :

```bash
npx prisma studio
```

Cela ouvrira une interface web sur `http://localhost:5555` où vous pourrez voir et modifier les données.

## Migration vers une autre Base de Données

Pour migrer vers PostgreSQL, MySQL, ou une autre base de données :

1. Modifiez le `provider` dans `prisma/schema.prisma`
2. Mettez à jour `DATABASE_URL` dans `.env`
3. Exécutez `npx prisma migrate dev`

