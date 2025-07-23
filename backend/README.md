# ⚔️ War Game Backend API

NestJS, MongoDB ve TypeScript kullanılarak geliştirilmiş modern backend API servisi. Oyun mantığı, kullanıcı yönetimi ve eşya sistemini yönetir.

## 🛠 Teknolojiler

- **NestJS** - Modern Node.js framework
- **TypeScript** - Type-safe geliştirme
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token kimlik doğrulama
- **bcryptjs** - Şifre hashleme
- **BiomeJS** - Linting ve formatting
- **Passport** - Kimlik doğrulama middleware

## 📁 Proje Yapısı

```
src/
├── auth/              # Kimlik doğrulama modülü
│   ├── auth.controller.ts    # Login/register endpoints
│   ├── auth.service.ts       # İş mantığı
│   ├── auth.module.ts        # Modül tanımı
│   └── jwt.strategy.ts       # JWT strateji
├── user/              # Kullanıcı yönetimi
│   ├── user.controller.ts    # User endpoints
│   ├── user.service.ts       # Kullanıcı işlemleri
│   ├── user.module.ts        # Modül tanımı
│   └── schemas/             
│       └── user.schema.ts    # MongoDB şeması
├── item/              # Eşya sistemi
│   ├── item.controller.ts    # Item endpoints
│   ├── item.service.ts       # Eşya işlemleri
│   ├── item.module.ts        # Modül tanımı
│   └── schemas/
│       └── item.schema.ts    # MongoDB şeması
├── config/            # Oyun konfigürasyonu
│   └── items.json           # Eşya tanımları
├── app.module.ts      # Ana modül
└── main.ts           # Uygulama başlatıcı
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ veya 20+
- MongoDB 5.0+
- Yarn package manager

### 1. Bağımlılıkları Yükleyin
```bash
yarn install
```

### 2. Environment Konfigürasyonu
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
# Veritabanı
MONGO_URI=mongodb://localhost:27017/wargame

# JWT
JWT_SECRET=warGameSecretKey

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
yarn start:dev
```

Backend API şu adreste çalışacak: `http://localhost:3001`

## 🔧 Kullanılabilir Komutlar

```bash
yarn start:dev      # Development server (watch mode)
yarn build          # Production build
yarn start          # Production server
yarn lint           # BiomeJS linting
yarn lint:fix       # BiomeJS linting (auto-fix)
yarn format         # BiomeJS formatting
yarn check          # BiomeJS check (lint + format)
yarn check:fix      # BiomeJS check (auto-fix)
yarn test           # Jest tests
yarn test:watch     # Jest watch mode
yarn test:cov       # Test coverage
yarn test:e2e       # E2E tests
```

## 📊 API Endpoints

### Kimlik Doğrulama
| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| `POST` | `/auth/login` | Kullanıcı girişi | ❌ |
| `POST` | `/auth/register` | Yeni kullanıcı kaydı | ❌ |

#### Login Request
```json
{
  "email": "player@example.com",
  "password": "password123"
}
```

#### Register Request
```json
{
  "name": "Oyuncu Adı",
  "email": "player@example.com", 
  "password": "password123"
}
```

#### Auth Response
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Oyuncu Adı",
    "email": "player@example.com",
    "energy": 100,
    "energy_reload_time": 1641234567890
  },
  "items": [...]
}
```

### Kullanıcı İşlemleri
| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| `POST` | `/users/:userId/reload-energy` | Energy yenileme | ✅ |

### Eşya İşlemleri  
| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| `GET` | `/items?userId=:id` | Kullanıcı eşyalarını listele | ✅ |
| `PUT` | `/items/:id/progress` | Eşya progress güncelle | ✅ |
| `PUT` | `/items/:id/level-up` | Eşya seviye atlat | ✅ |

#### Progress Update Request
```json
{
  "userId": "user_id",
  "percentage": 75,
  "energy": 80
}
```

#### Level Up Request
```json
{
  "energy": 50
}
```

## 🗄️ Veritabanı Şemaları

### User Schema
```typescript
{
  name: string,                 // Kullanıcı adı
  email: string,                // Email (unique)
  password: string,             // Hashlenmiş şifre (min 6 karakter)
  energy: number,               // Mevcut energy (default: 100)
  energy_reload_time: number,   // Energy yenileme zamanı (timestamp)
  createdAt: Date,              // Oluşturulma tarihi
  updatedAt: Date               // Güncellenme tarihi
}
```

### Item Schema
```typescript
{
  level: number,                // Eşya seviyesi (1-3)
  title: string,                // Eşya başlığı ("Uzun Kılıç")
  description: string,          // Eşya açıklaması
  percentage: number,           // İlerleme yüzdesi (0-100)
  name: string,                 // Eşya resim adı ("uzun_kilic_1")
  userId: ObjectId,             // Sahip kullanıcı ID'si
  createdAt: Date,              // Oluşturulma tarihi
  updatedAt: Date               // Güncellenme tarihi
}
```

## 🎮 Oyun Mantığı

### Energy Sistemi
- Her kullanıcı 100 energy ile başlar
- Energy 30 saniyede bir 50 puan yenilenir
- Maksimum energy 100'dür

### Eşya Geliştirme
1. Kullanıcı eşyaya tıklar
2. 1 energy harcanır
3. Progress her tıklamada %2 artar
4. %100'e ulaşan eşyalar energy harcamadan seviye atlar
5. Level 3 eşyalar maksimum seviyededir

### Seviye Atlama
- Level 1 → Level 2: Progress %0'a sıfırlanır
- Level 2 → Level 3: Progress %100'de kalır (maksimum)
- Her seviyede eşya görünümü ve açıklaması değişir

## 🔒 Güvenlik Özellikleri

- ✅ **JWT Authentication**: Token tabanlı kimlik doğrulama
- ✅ **Password Hashing**: bcrypt ile güvenli şifre saklama
- ✅ **Protected Routes**: JWT guard ile korumalı endpoint'ler
- ✅ **Input Validation**: class-validator ile giriş doğrulama
- ✅ **CORS Configuration**: Frontend erişimi için CORS ayarları
- ✅ **Environment Variables**: Hassas bilgiler .env dosyasında

## 🧪 Test

```bash
# Unit testler
yarn test

# Watch mode
yarn test:watch

# Test coverage
yarn test:cov

# E2E testler  
yarn test:e2e
```

## 📝 Linting ve Formatting

Proje BiomeJS kullanır:

```bash
# Linting kontrolü
yarn lint

# Linting düzeltme
yarn lint:fix

# Formatting
yarn format

# Tümünü kontrol et
yarn check

# Tümünü düzelt
yarn check:fix
```

## 🚀 Production Deployment

### 1. Build
```bash
yarn build
```

### 2. Environment Variables
Production ortamında `.env` dosyasını uygun değerlerle güncelleyin:
```env
MONGO_URI=mongodb://production-host:27017/wargame
JWT_SECRET=super_secure_production_secret
PORT=3001
FRONTEND_URL=https://yourdomain.com || http://localhost:3000
```

### 3. Çalıştırma
```bash
yarn start
```

## 📊 API Kullanım Örnekleri

### 1. Kullanıcı Kaydı
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Oyuncu",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### 2. Giriş Yapma
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "password": "123456"
  }'
```

### 3. Eşya Progress Güncelleme
```bash
curl -X PUT http://localhost:3001/items/{itemId}/progress \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "percentage": 85,
    "energy": 70
  }'
```

## 🐛 Hata Ayıklama

### Yaygın Sorunlar

1. **MongoDB Bağlantı Hatası**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   **Çözüm**: MongoDB servisinin çalıştığından emin olun

2. **JWT Secret Eksik**
   ```
   Error: JWT secret not provided
   ```
   **Çözüm**: `.env` dosyasında `JWT_SECRET` değerini tanımlayın

3. **Port Kullanımda**
   ```
   Error: listen EADDRINUSE :::3001
   ```
   **Çözüm**: Farklı port kullanın veya çalışan servisi durdurun

**🏗️ Güçlü bir backend ile efsanevi oyun deneyimi! ⚔️**
