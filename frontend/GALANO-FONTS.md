# Galano Grotesque Font Usage Guide

Bu dokümantasyon, projede Galano Grotesque fontlarının nasıl kullanılacağını açıklar.

## 📁 Font Dosyaları

Font dosyaları `public/fonts/galano-grotesque-alt/` klasöründe bulunur:

### Galano Grotesque (Normal)
- GalanoGrotesqueThin.otf (100)
- GalanoGrotesqueExtraLight.otf (200)  
- GalanoGrotesqueLight.otf (300)
- GalanoGrotesqueRegular.otf (400)
- GalanoGrotesqueMedium.otf (500)
- GalanoGrotesqueSemiBold.otf (600)
- GalanoGrotesqueBold.otf (700)
- GalanoGrotesqueExtraBold.otf (800)
- GalanoGrotesqueBlack.otf (900)
- GalanoGrotesqueHeavy.otf (950)

### Galano Grotesque Alt
- GalanoGrotesqueAltThin.otf (100)
- GalanoGrotesqueAltExtraLight.otf (200)
- GalanoGrotesqueAltLight.otf (300)
- GalanoGrotesqueAltRegular.otf (400)
- GalanoGrotesqueAltMedium.otf (500)
- GalanoGrotesqueAltSemiBold.otf (600)
- GalanoGrotesqueAltBold.otf (700)
- GalanoGrotesqueAltExtraBold.otf (800)
- GalanoGrotesqueAltBlack.otf (900)
- GalanoGrotesqueAltHeavy.otf (950)

Her ağırlığın italic versiyonu da mevcuttur.

## 🎨 CSS Kullanımı

### 1. TailwindCSS Sınıfları

```tsx
// Galano Grotesque normal
<div className="font-galano">Metin</div>

// Galano Grotesque Alt versiyonu
<div className="font-galano-alt">Metin</div>

// Eski kod uyumluluğu için
<div className="font-['Galano_Grotesque']">Enerji</div>
```

### 2. Font Ağırlıkları

```tsx
<div className="font-galano font-thin">Thin (100)</div>
<div className="font-galano font-light">Light (300)</div>
<div className="font-galano font-normal">Regular (400)</div>
<div className="font-galano font-medium">Medium (500)</div>
<div className="font-galano font-semibold">SemiBold (600)</div>
<div className="font-galano font-bold">Bold (700)</div>
<div className="font-galano font-extrabold">ExtraBold (800)</div>
<div className="font-galano font-black">Black (900)</div>
```

### 3. Italic Stileri

```tsx
<div className="font-galano italic">Italic text</div>
<div className="font-galano font-bold italic">Bold Italic</div>
```

### 4. Doğrudan CSS

```css
.my-element {
  font-family: 'Galano Grotesque', 'Galano Grotesque Alt', system-ui, sans-serif;
  font-weight: 500;
}

.my-alt-element {
  font-family: 'Galano Grotesque Alt', 'Galano Grotesque', system-ui, sans-serif;
}
```

## 🔧 Teknik Detaylar

### Font Face Tanımlamaları
Font tanımlamaları `src/fonts.css` dosyasında yapılmıştır ve `src/index.css` tarafından import edilir.

### TailwindCSS Konfigürasyonu
`tailwind.config.js` dosyasında özel font aileleri tanımlanmıştır:

```js
fontFamily: {
  'galano': ['Galano Grotesque', 'Galano Grotesque Alt', 'system-ui', 'sans-serif'],
  'galano-alt': ['Galano Grotesque Alt', 'Galano Grotesque', 'system-ui', 'sans-serif'],
  'galano-grotesque': ['Galano Grotesque', 'Galano Grotesque Alt', 'system-ui', 'sans-serif'],
}
```

### Fallback Fontları
Sistem fontları fallback olarak tanımlanmıştır:
- system-ui
- sans-serif

## 📋 Kullanım Örnekleri

### Başlıklar
```tsx
<h1 className="font-galano font-bold text-4xl">Ana Başlık</h1>
<h2 className="font-galano-alt font-semibold text-2xl">Alt Başlık</h2>
```

### UI Elemanları
```tsx
<button className="font-galano font-medium">Buton</button>
<div className="text-orange-300 text-xs font-bold font-['Galano_Grotesque']">Enerji</div>
```

### Paragraf Metinleri
```tsx
<p className="font-galano font-normal">Normal paragraf metni</p>
<p className="font-galano-alt font-light">Hafif ağırlıkta alt versiyon</p>
```

## 🚀 Performance

- Fontlar yerel olarak hosting edildiği için dış bağımlılık yoktur
- Gerekli font ağırlıkları lazy loading ile yüklenir  
- Browser cache'leme sayesinde ikinci ziyaretlerde hızlı yüklenir

## ✅ Browser Desteği

- Modern tarayıcıların tümü (.otf formatını destekler)
- Internet Explorer 9+
- Safari, Chrome, Firefox, Edge 