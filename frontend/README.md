# ⚔️ War Game Frontend

React, TypeScript ve modern web teknolojileri ile geliştirilmiş etkileşimli savaş oyunu arayüzü. Kullanıcı dostu tasarım ve smooth animasyonlarla unutulmaz oyun deneyimi sunar.

## 🛠 Teknolojiler

- **React 19** - Modern UI kütüphanesi
- **TypeScript** - Type-safe geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **Jotai** - Atomic state management
- **Framer Motion** - Fluid animasyonlar
- **Howler.js** - Web audio API
- **Axios** - HTTP client
- **React Testing Library** - Component testing

## 🎨 Tasarım Özellikleri

- **🌟 Modern Gradient UI** - Göz alıcı gradient arka planlar
- **📱 Responsive Design** - Tüm cihazlarda uyumlu
- **🎭 Smooth Animations** - Framer Motion ile akıcı geçişler
- **🎵 Sound Effects** - Immersive ses deneyimi
- **⚡ Fast Loading** - Optimized bundle ve lazy loading
- **🎮 Game-themed Design** - Savaş temalı UI elementleri

## 📁 Proje Yapısı

```
src/
├── components/         # React bileşenleri
│   ├── Energy.tsx           # Energy bar component
│   ├── GameLoading.tsx      # Loading screen
│   ├── ItemCard.tsx         # Item card component
│   ├── Items.tsx            # Items grid
│   ├── LevelUpAnimation.tsx # Level up animation
│   ├── Login.tsx            # Login/register form
│   ├── TabButton.tsx        # Tab navigation button
│   └── Tabs.tsx             # Tab navigation
├── store/              # State management
│   ├── authStore.ts         # Authentication state
│   ├── gameStore.ts         # Game state
│   └── store.ts             # Store configuration
├── services/           # API services
│   └── api.ts               # HTTP API calls
├── types/              # TypeScript definitions
│   ├── animations.ts        # Animation types
│   ├── item.ts              # Item interfaces
│   ├── levels.ts            # Level definitions
│   ├── tab.ts               # Tab types
│   └── user.ts              # User interfaces
├── assets/             # Static assets
│   └── fonts/               # Custom fonts
├── audio.ts            # Audio manager
├── fonts.css           # Font definitions
├── index.css           # Global styles
└── App.tsx             # Ana uygulama
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ veya 20+
- Yarn package manager
- Running backend API (port 3001)

### 1. Bağımlılıkları Yükleyin
```bash
yarn install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
yarn start
```

Frontend şu adreste çalışacak: `http://localhost:3000`

### 3. Backend Bağlantısı
Frontend otomatik olarak `http://localhost:3001` adresindeki backend API'ye bağlanır. Backend'in çalıştığından emin olun.

## 🔧 Kullanılabilir Komutlar

```bash
yarn start          # Development server başlat
yarn build          # Production build oluştur
yarn test           # Test suite çalıştır
yarn test:watch     # Watch mode ile test
yarn eject          # React scripts eject (dikkatli!)
yarn lint           # BiomeJS linting
yarn lint:fix       # BiomeJS linting düzelt
yarn format         # BiomeJS formatting
```

## 🎮 Oyun Bileşenleri

### 🔐 Authentication (Login.tsx)
```typescript
// Giriş ve kayıt formu
- Kullanıcı girişi
- Yeni hesap oluşturma  
- Form validasyonu
- Error handling
- Smooth transitions
```

### ⚡ Energy System (Energy.tsx)
```typescript
// Energy yönetimi
- Mevcut energy gösterimi
- Energy bar animasyonu
- Reload countdown timer
- Manual reload button
- Real-time updates
```

### 🗡️ Item Management (Items.tsx, ItemCard.tsx)
```typescript
// Eşya sistemi
- Grid layout
- Item cards
- Progress tracking
- Level up animations
- Click interactions
- Sound effects
```

### 🎯 Tab Navigation (Tabs.tsx, TabButton.tsx)
```typescript
// Kategori gezinmesi
- Weapon categories
- Active tab highlighting
- Smooth transitions
- Item filtering
```

### 🎬 Loading Screen (GameLoading.tsx)
```typescript
// Oyun yükleme ekranı
- Progress bar
- Loading tasks
- Brand identity
- Smooth transitions
```

## 📊 State Management (Jotai)

### Authentication Store
```typescript
// authStore.ts
userAtom              // Current user data
isAuthenticatedAtom   // Auth status
authTokenAtom         // JWT token
loginAtom             // Login action
logoutAtom            // Logout action
initAuthAtom          // Initialize auth
```

### Game Store
```typescript
// gameStore.ts
itemsAtom             // User items
gameInitializedAtom   // Game init status
gameLoadingAtom       // Loading state
loadingCompleteAtom   // Loading completion
fetchItemsAtom        // Fetch items action
initializeGameAtom    // Initialize game
```

## 🎵 Ses Sistemi

### Ses Dosyaları
```
public/sounds/
├── item-click.mp3      # Eşya tıklama sesi
├── level-up-1.mp3      # Level up sesi (variant 1)
├── level-up-2.mp3      # Level up sesi (variant 2)
├── level-up.mp3        # Genel level up sesi
└── menu-click.mp3      # Menü navigasyon sesi
```

### Ses Kontrolü
```typescript
// audio.ts
playItemClickSound()    // Eşya tıklandığında
playLevelUpSound()      // Seviye atlandığında
playMenuClickSound()    // Menü tıklandığında
```

## 🎨 Stil ve Animasyonlar

### Tailwind CSS Classes
```css
/* Ana gradient arka plan */
bg-gradient-to-b from-neutral-900 to-zinc-700

/* Kart tasarımı */
bg-gradient-to-br from-slate-800 to-slate-900

/* Button hover efektleri */
hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500

/* Loading animasyonları */
animate-pulse, animate-bounce
```

### Framer Motion Animasyonları
```typescript
// Fade in animation
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Scale animation
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Level up animation
initial={{ scale: 0, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
```

## 🎯 Component API'leri

### ItemCard Component
```typescript
interface ItemCardProps {
  item: Item;           // Item data
  onItemClick: (item: Item) => void;  // Click handler
  isClickable: boolean; // Can be clicked?
  progress?: number;    // Override progress
}
```

### Energy Component
```typescript
// Auto-updating energy display
- Displays current energy level
- Shows reload countdown
- Handles manual reload
- Smooth progress bar
```

### LevelUpAnimation Component
```typescript
interface LevelUpAnimationProps {
  show: boolean;        // Show animation?
  onComplete: () => void; // Completion callback
  itemName: string;     // Item name for display
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
Default:    Mobile (< 640px)
sm:         Tablet (≥ 640px)  
md:         Small desktop (≥ 768px)
lg:         Desktop (≥ 1024px)
xl:         Large desktop (≥ 1280px)
```

### Responsive Features
- ✅ **Mobile**: Single column, touch-friendly
- ✅ **Tablet**: Grid layout, optimized spacing
- ✅ **Desktop**: Full grid, hover effects

## 🧪 Testing

### Test Yapısı
```bash
src/
├── App.test.js           # App component test
├── setupTests.js         # Test configuration
└── components/
    └── __tests__/        # Component tests
```

### Test Çalıştırma
```bash
# Tüm testler
yarn test

# Watch mode
yarn test --watch

# Coverage report
yarn test --coverage
```

## 🚀 Production Build

### 1. Build Oluşturma
```bash
yarn build
```

### 2. Build Output
```
build/
├── static/
│   ├── css/              # Minified CSS
│   ├── js/               # Minified JavaScript
│   └── media/            # Assets
├── index.html            # Entry point
└── asset-manifest.json   # Asset mapping
```

### 3. Deployment
```bash
# Static file server
serve -s build

# Veya herhangi bir web server'a deploy edin
# Nginx, Apache, Vercel, Netlify vs.
```

## 🔧 Konfigürasyon

### Environment Variables
```env
# .env.local dosyası oluşturun
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

### Proxy Configuration
```json
// package.json
"proxy": "http://localhost:3001"
```

## ⚡ Performance Optimizasyonları

- ✅ **Code Splitting**: React.lazy ile component splitting
- ✅ **Image Optimization**: WebP format kullanımı
- ✅ **Bundle Analysis**: webpack-bundle-analyzer
- ✅ **Memory Management**: Proper cleanup
- ✅ **State Optimization**: Jotai atomic updates

### Bundle Analysis
```bash
yarn build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🐛 Hata Ayıklama

### Yaygın Sorunlar

1. **API Bağlantı Hatası**
   ```
   Error: Network Error
   ```
   **Çözüm**: Backend'in çalıştığından emin olun

2. **Ses Çalmıyor**
   ```
   Error: Audio context not allowed
   ```
   **Çözüm**: Kullanıcı etkileşiminden sonra ses çalar

3. **Build Hatası**
   ```
   Error: out of memory
   ```
   **Çözüm**: `NODE_OPTIONS=--max_old_space_size=4096 yarn build`

### Debug Modları
```typescript
// Development mode
localStorage.setItem('debug', 'true');

// Audio debug
localStorage.setItem('debug-audio', 'true');
```

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full |
| Firefox | 85+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 88+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 88+ | ✅ Full |

**🎨 Güzel arayüz ile efsanevi oyun deneyimi! ⚔️**
