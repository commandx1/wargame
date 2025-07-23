# ⚔️ War Game - Efsanevi Savaş Oyunu

Modern web teknolojileri ile geliştirilmiş tam yığın (full-stack) savaş temalı oyun projesi. Kullanıcılar eşyalarını geliştirebilir, seviye atlayabilir ve energy sistemini kullanarak oyun deneyimi yaşayabilirler.

## 🎮 Oyun Özellikleri

- **🗡️ Eşya Sistemi**: 8 farklı silah türü (Kılıç, Balta, Asa, Kalkan, vs.)
- **📈 Seviye Sistemi**: Her eşya 3 seviyeye kadar geliştirilebilir
- **⚡ Energy Sistemi**: Eşya geliştirme için energy harcanır ve zamanla yenilenir
- **🎯 Progress Tracking**: Her eşyanın gelişim yüzdesi takip edilir
- **🏆 Level Up**: %100'e ulaşan eşyalar bir üst seviyeye geçer
- **🎵 Ses Efektleri**: Etkileşimler için özel ses efektleri

## 🛠 Teknoloji Yığını

### Backend
- **NestJS** - Modern Node.js framework
- **TypeScript** - Type-safe geliştirme
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **JWT** - Kimlik doğrulama
- **bcryptjs** - Şifre hashleme
- **BiomeJS** - Linting ve formatting

### Frontend
- **React** - Modern UI kütüphanesi
- **TypeScript** - Type-safe geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **Jotai** - State management
- **Framer Motion** - Animasyonlar
- **Howler.js** - Ses yönetimi
- **Axios** - HTTP client

## 📁 Proje Yapısı

```
wargame/
├── backend/           # NestJS Backend API
│   ├── src/
│   │   ├── auth/      # Kimlik doğrulama
│   │   ├── user/      # Kullanıcı yönetimi
│   │   ├── item/      # Eşya sistemi
│   │   └── config/    # Oyun konfigürasyonu
│   └── package.json
├── frontend/          # React Frontend
│   ├── src/
│   │   ├── components/# UI bileşenleri
│   │   ├── store/     # State management
│   │   ├── services/  # API servisleri
│   │   └── types/     # TypeScript tanımları
│   └── package.json
└── README.md          # Bu dosya
```

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ veya 20+
- MongoDB
- Yarn package manager

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd wargame
```

### 2. Backend Kurulumu
```bash
cd backend
yarn install
cp .env.example .env
# .env dosyasını MongoDB bağlantı bilgilerinizle düzenleyin
yarn start:dev
```

### 3. Frontend Kurulumu
```bash
cd ../frontend
yarn install
yarn start
```

### 4. Oyunu Açın
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🎯 Nasıl Oynanır?

1. **Kayıt Ol/Giriş Yap**: Ana sayfada hesap oluşturun veya mevcut hesabınızla giriş yapın
2. **Energy'nizi Kontrol Edin**: Üst kısımda energy seviyenizi görebilirsiniz
3. **Eşyalarınızı Görün**: Sekmelerde farklı silah türlerini keşfedin
4. **Eşya Geliştirin**: Eşyalara tıklayarak energy harcayıp progress kazanın
5. **Seviye Atlayın**: %100'e ulaşan eşyalar seviye atlar
6. **Energy Yenileyin**: Energy bittiğinde yenilenmesini bekleyin

## 🎨 Eşya Türleri

| Silah Türü | Açıklama |
|-----------|----------|
| 🗡️ Uzun Kılıç | Güçlü ve etkili savaş silahı |
| ⚔️ Kısa Kılıç | Hızlı ve çevik dövüş için |
| 🪓 Savaş Baltası | Ağır hasar veren silah |
| 🔨 Savaş Çekici | Zırh kıran güçlü silah |
| 🗡️ Eğri Kılıç | Özel teknikler için |
| 🛡️ Kalkan | Savunma ve koruma |
| 🪄 Büyü Asası | Sihirli güçler |
| 📖 Büyü Kitabı | Büyü bilgisi |

## 🔧 Geliştirme

### Backend Komutları
```bash
cd backend
yarn start:dev      # Development server
yarn build          # Production build
yarn test           # Tests
yarn lint           # Code linting
```

### Frontend Komutları
```bash
cd frontend
yarn start          # Development server
yarn build          # Production build
yarn test           # Tests
yarn lint           # Code linting
```

## 📊 API Endpoints

### Kimlik Doğrulama
- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/register` - Yeni kullanıcı kaydı

### Kullanıcı İşlemleri
- `POST /users/:userId/reload-energy` - Energy yenileme

### Eşya İşlemleri
- `GET /items?userId=:id` - Kullanıcı eşyalarını listele
- `PUT /items/:id/progress` - Eşya progress güncelle
- `PUT /items/:id/level-up` - Eşya seviye atlat

## 🎵 Ses Dosyaları

Oyun aşağıdaki ses efektlerini içerir:
- 🎵 **item-click.mp3** - Eşya tıklama sesi
- 🎵 **level-up.mp3** - Seviye atlama sesi
- 🎵 **menu-click.mp3** - Menü tıklama sesi

## 🎨 Özel Fontlar

Proje **Galano Grotesque** font ailesini kullanır:
- Regular, Bold, Medium varyantları
- Oyun temasına uygun modern tasarım

## 🔒 Güvenlik

- ✅ JWT token tabanlı kimlik doğrulama
- ✅ Bcrypt ile şifre hashleme
- ✅ Protected routes ve guards
- ✅ Input validation
- ✅ CORS konfigürasyonu

## 📱 Responsive Tasarım

- ✅ Mobil uyumlu arayüz
- ✅ Tablet ve desktop desteği
- ✅ Touch-friendly kontroller
- ✅ Modern gradient tasarımı

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
yarn build
yarn start

# Frontend
cd frontend
yarn build
# build/ klasörünü web server'ına deploy edin
```

**⚔️ Efsanevi macerana başla! ⚔️**
