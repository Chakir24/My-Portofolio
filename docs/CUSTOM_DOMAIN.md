# Configuration d'un Domaine Personnalisé Vercel

Ce guide vous explique comment configurer un domaine personnalisé `chakir-dev.vercel.app` (ou tout autre sous-domaine Vercel) pour votre portfolio.

## 🌐 Configuration du Domaine Personnalisé

### Étape 1 : Accéder aux Paramètres du Projet

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet `My-Portofolio`
4. Cliquez sur **Settings** dans le menu supérieur
5. Cliquez sur **Domains** dans le menu latéral

### Étape 2 : Ajouter le Domaine Personnalisé

1. Dans la section **Domains**, vous verrez votre domaine actuel (ex: `my-portofolio-xxx.vercel.app`)
2. Cliquez sur **Add** ou **Add Domain**
3. Entrez votre nouveau domaine : `chakir-dev.vercel.app`
4. Cliquez sur **Add**

### Étape 3 : Vérifier la Disponibilité

- Si le domaine est disponible, Vercel l'ajoutera automatiquement
- Si le domaine est déjà pris, vous devrez choisir un autre nom
- Les sous-domaines Vercel sont gratuits et disponibles immédiatement

### Étape 4 : Mettre à Jour les Variables d'Environnement

**Important** : Vous devez mettre à jour `NEXTAUTH_URL` pour qu'il corresponde à votre nouveau domaine.

1. Dans Vercel → Settings → **Environment Variables**
2. Trouvez la variable `NEXTAUTH_URL`
3. Modifiez-la pour utiliser votre nouveau domaine :
   ```
   NEXTAUTH_URL=https://chakir-dev.vercel.app
   ```
4. Cliquez sur **Save**

### Étape 5 : Redéployer (si nécessaire)

1. Allez dans l'onglet **Deployments**
2. Cliquez sur les trois points (⋯) du dernier déploiement
3. Sélectionnez **Redeploy**
4. Ou poussez un nouveau commit sur GitHub pour déclencher un nouveau déploiement

## ✅ Vérification

Une fois configuré, votre site sera accessible à :
- **Nouveau domaine** : `https://chakir-dev.vercel.app`
- **Ancien domaine** : `https://my-portofolio-xxx.vercel.app` (toujours actif)

Les deux URLs pointeront vers le même site.

## 🔧 Configuration Alternative via CLI

Si vous préférez utiliser la ligne de commande :

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Se connecter
vercel login

# Ajouter le domaine
vercel domains add chakir-dev.vercel.app

# Mettre à jour NEXTAUTH_URL
vercel env add NEXTAUTH_URL production
# Entrez: https://chakir-dev.vercel.app

# Redéployer
vercel --prod
```

## ⚠️ Notes Importantes

1. **NEXTAUTH_URL** : Doit absolument correspondre à votre domaine pour que l'authentification fonctionne
2. **HTTPS** : Vercel fournit automatiquement un certificat SSL gratuit
3. **Propagation DNS** : Les changements peuvent prendre quelques minutes
4. **Domaine Principal** : Vous pouvez définir un domaine comme principal dans les paramètres

## 🎯 Domaine Personnalisé Externe

Si vous souhaitez utiliser un domaine externe (ex: `chakir-dev.com`) :

1. Suivez les mêmes étapes mais entrez votre domaine externe
2. Vercel vous donnera des enregistrements DNS à configurer
3. Configurez ces enregistrements chez votre registrar DNS
4. Attendez la propagation DNS (peut prendre jusqu'à 48h)

## 🗑️ Supprimer un Ancien Domaine

Si vous souhaitez supprimer l'ancien domaine Vercel (ex: `my-portofolio-xxx.vercel.app`) :

### Méthode 1 : Via l'Interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet `My-Portofolio`
3. Cliquez sur **Settings** → **Domains**
4. Dans la liste des domaines, trouvez l'ancien domaine à supprimer
5. Cliquez sur les trois points (⋯) à côté du domaine
6. Sélectionnez **Remove** ou **Delete**
7. Confirmez la suppression

### Méthode 2 : Via CLI

```bash
# Lister les domaines
vercel domains ls

# Supprimer un domaine spécifique
vercel domains rm my-portofolio-xxx.vercel.app
```

### ⚠️ Important avant de supprimer

1. **Vérifiez que le nouveau domaine fonctionne** : Assurez-vous que `chakir-dev.vercel.app` est bien configuré et fonctionne
2. **Mettez à jour NEXTAUTH_URL** : Si vous supprimez l'ancien domaine, assurez-vous que `NEXTAUTH_URL` pointe vers le nouveau domaine
3. **Sauvegardez les liens** : Si vous avez partagé l'ancien domaine, notez-le avant de le supprimer

### 🔄 Alternative : Garder les deux domaines

Vous pouvez garder les deux domaines actifs :
- L'ancien domaine continuera de fonctionner
- Le nouveau domaine sera également actif
- Les deux pointeront vers le même site

C'est souvent la meilleure option pour éviter de casser des liens existants.

## 📚 Ressources

- [Documentation Vercel - Domaines](https://vercel.com/docs/concepts/projects/domains)
- [Configuration DNS Vercel](https://vercel.com/docs/concepts/projects/domains/add-a-domain)
- [Supprimer un domaine Vercel](https://vercel.com/docs/concepts/projects/domains/remove-a-domain)

