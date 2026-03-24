# Firebase Setup Guide - ניצן משהו מתוק

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Create a project"** (or "Add project")
3. Name it: `baked-by-nitzan`
4. Disable Google Analytics (not needed) → Click **Create Project**
5. Wait for it to finish → Click **Continue**

## Step 2: Create Web App

1. On the project overview page, click the **Web icon** `</>`
2. App nickname: `baked-by-nitzan-web`
3. **Don't** check "Firebase Hosting"
4. Click **Register app**
5. You'll see a config object like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "baked-by-nitzan.firebaseapp.com",
  projectId: "baked-by-nitzan",
  storageBucket: "baked-by-nitzan.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```
6. **Copy these values** and paste them into `firebase-config.js` in the project

## Step 3: Enable Authentication

1. In Firebase Console sidebar → **Build** → **Authentication**
2. Click **Get started**
3. Click **Email/Password** provider
4. Enable **Email/Password** → Click **Save**
5. Go to **Users** tab → Click **Add user**
6. Enter the admin email & password (for Nitzan to log in)
   - Example: `nitzan@bakedbynitzan.com` / choose a strong password
   - **Remember these!** This is how she'll log into the admin panel

## Step 4: Create Firestore Database

1. In sidebar → **Build** → **Firestore Database**
2. Click **Create database**
3. Choose location: `europe-west1` (or nearest)
4. Start in **test mode** (we'll secure it later)
5. Click **Create**

## Step 5: Set Security Rules

1. In Firestore → **Rules** tab
2. Replace the content with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
3. Click **Publish**

This means: **anyone can read** products (customers), but only **logged-in users can edit** (Nitzan).

## Step 6: Enable Storage

1. In sidebar → **Build** → **Storage**
2. Click **Get started**
3. Start in **test mode** → Click **Next** → Choose location → **Done**
4. Go to **Rules** tab and replace with:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
5. Click **Publish**

## Step 7: Update firebase-config.js

Open `firebase-config.js` in the project and replace with your actual config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 8: Push to GitHub & Test

```bash
cd baked-by-nitzan
git add -A && git commit -m "Add Firebase admin panel" && git push origin main
```

Then go to: `https://ofekalfasi222-cloud.github.io/bakedbynitzan/admin.html`

Log in with the email/password from Step 3, and start adding products!

## How It Works

- **Customers** see the website at `/index.html` - they can only VIEW products
- **Nitzan** goes to `/admin.html` - logs in and can ADD/EDIT/DELETE products and upload images
- Changes are **instant** - as soon as she saves, the website updates
- The existing products will show as fallback until Firebase products are added
