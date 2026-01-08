#!/usr/bin/env node

/**
 * Script pour résoudre les migrations échouées dans Prisma
 * Supprime l'entrée de la migration SQLite obsolète de la table _prisma_migrations
 */

const { PrismaClient } = require('@prisma/client');

async function resolveFailedMigration() {
  const prisma = new PrismaClient();
  
  try {
    // Supprimer l'entrée de la migration SQLite échouée
    const result = await prisma.$executeRaw`
      DELETE FROM "_prisma_migrations" 
      WHERE migration_name = '20260106203616_init'
    `;
    
    if (result > 0) {
      console.log(`✅ Migration échouée '20260106203616_init' supprimée de la base de données`);
    } else {
      console.log(`ℹ️  Aucune migration échouée trouvée (peut-être déjà résolue)`);
    }
  } catch (error) {
    // Si la table n'existe pas encore ou autre erreur, on continue quand même
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      console.log(`ℹ️  Table _prisma_migrations n'existe pas encore, aucune action nécessaire`);
    } else {
      console.error(`⚠️  Erreur lors de la résolution de la migration:`, error.message);
      // On continue quand même pour ne pas bloquer le build
    }
  } finally {
    await prisma.$disconnect();
  }
}

resolveFailedMigration()
  .then(() => process.exit(0))
  .catch(() => process.exit(0)); // Toujours sortir avec succès pour ne pas bloquer le build

