#!/bin/bash

# Script de configuration PostgreSQL pour le portfolio
# Usage: ./scripts/setup-postgres.sh

echo "🚀 Configuration PostgreSQL pour le Portfolio"
echo "=============================================="
echo ""

# Vérifier si DATABASE_URL est défini
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erreur: DATABASE_URL n'est pas défini"
    echo ""
    echo "Veuillez définir DATABASE_URL dans votre fichier .env:"
    echo "DATABASE_URL=\"postgresql://user:password@host:5432/database?schema=public\""
    echo ""
    exit 1
fi

echo "✅ DATABASE_URL est défini"
echo ""

# Générer le client Prisma
echo "📦 Génération du client Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la génération du client Prisma"
    exit 1
fi

echo "✅ Client Prisma généré"
echo ""

# Créer les migrations
echo "🗄️  Création des migrations..."
npx prisma migrate dev --name init_postgres

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la création des migrations"
    exit 1
fi

echo "✅ Migrations créées et appliquées"
echo ""

# Vérifier la connexion
echo "🔍 Vérification de la connexion à la base de données..."
npx prisma db pull --force

if [ $? -eq 0 ]; then
    echo "✅ Connexion à la base de données réussie!"
    echo ""
    echo "🎉 Configuration terminée avec succès!"
    echo ""
    echo "Pour ouvrir Prisma Studio et voir vos données:"
    echo "  npx prisma studio"
    echo ""
else
    echo "⚠️  Impossible de vérifier la connexion, mais les migrations ont été créées"
    echo ""
fi

