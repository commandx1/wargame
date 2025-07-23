# WarGame Backend

NestJS, Mongoose, and BiomeJS ile oluşturulmuş backend projesi.

## Teknolojiler

- **NestJS** - Modern Node.js framework
- **Mongoose** - MongoDB object modeling
- **BiomeJS** - Linting ve formatting
- **TypeScript** - Type-safe JavaScript

## Kurulum

```bash
# Dependencies kurulumu
npm install

# Development server başlatma
npm run start:dev

# Production build
npm run build
npm start
```

## Scripts

- `npm run start:dev` - Development server (watch mode)
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - BiomeJS linting
- `npm run lint:fix` - BiomeJS linting (auto-fix)
- `npm run format` - BiomeJS formatting
- `npm run check` - BiomeJS check (lint + format)
- `npm run check:fix` - BiomeJS check (auto-fix)
- `npm test` - Jest tests
- `npm run test:e2e` - E2E tests

## API Endpoints

### Base
- `GET /` - Hello World endpoint

### Authentication
- `POST /auth/login` - Kullanıcı girişi (JWT token döndürür)
- `POST /auth/register` - Yeni kullanıcı kaydı (JWT token döndürür)

### Users (🔒 Protected)
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/:id` - ID ile kullanıcı getir
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı güncelle
- `DELETE /users/:id` - Kullanıcı sil

### Items (🔒 Protected)
- `GET /items` - Tüm item'ları listele
- `GET /items?level=1` - Level'a göre item filtrele
- `GET /items/:id` - ID ile item getir
- `POST /items` - Yeni item oluştur
- `PUT /items/:id` - Item güncelle
- `DELETE /items/:id` - Item sil

## Development

Backend server default olarak `http://localhost:3000` adresinde çalışır.

## Database Schemas

### User Schema
```typescript
{
  name: string,           // Kullanıcı adı
  email: string,          // Email (unique)
  password: string,       // Şifre (min 6 karakter)
  energy_reload_time: number // Energy yenileme zamanı
}
```

### Item Schema
```typescript
{
  level: number,          // Item level (min 1)
  title: string,          // Item başlığı
  description: string,    // Item açıklaması
  percentage: number,     // Başarı yüzdesi (0-100)
  name: string           // Item unique adı
}
```

## Security Features

- ✅ JWT token authentication
- ✅ Bcrypt password hashing
- ✅ Protected routes with guards
- ✅ Password validation (min 6 characters)
- ✅ Automatic token refresh handling

## Frontend Features

- ✅ Oyun temalı login/register sayfası
- ✅ JWT token management
- ✅ Auto login/logout
- ✅ User interface entegrasyonu
- ✅ Error handling

## Sonraki Adımlar

1. ✅ MongoDB bağlantısı eklendi
2. ✅ User ve Item modülleri oluşturuldu
3. ✅ JWT Authentication sistemi kuruldu
4. ✅ Frontend login sayfası oluşturuldu
5. Game logic API endpoints eklenecek
6. WebSocket integration yapılacak
7. Role-based access control eklenecek
