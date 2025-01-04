# Idea - proje fikir paylaşma platformu

**Idea**, kullanıcıların alışveriş listelerini yönetmelerine yardımcı olan bir web uygulamasıdır. Kullanıcılar, alınacak ürünleri ekleyebilir, tamamlanan ürünleri işaretleyebilir ve listelerini düzenleyebilirler. Proje, React.js ile oluşturulmuş bir istemci tarafı ve Node.js/Express.js ile oluşturulmuş bir sunucu tarafı içerir.

## Kullanılan Teknolojiler

- **Vite** - Vite ile inşa edilmiştir.
 
Bu proje, MERN yığını kullanılarak inşa edilmiştir:

- **MongoDB** - Verilerin saklandığı belge tabanlı veritabanı.
- **Express.js** - Node.js üzerinde çalışan arka uç web uygulaması çatısı.
- **React** - Kullanıcı arayüzlerini oluşturmak için kullanılan bir JavaScript kütüphanesi.
- **Node.js** - Web tarayıcısı dışında JavaScript kodu çalıştıran JavaScript çalışma ortamı.

## Proje Yapısı
/proje-kök
/client # İstemci tarafı uygulaması (React)
/server # Sunucu tarafı uygulaması (Node/Express)


### İstemci Bağımlılıkları

- Yönlendirme için `react-router-dom`
- HTTP istekleri için `axios`,

### Sunucu Bağımlılıkları

- İstekleri işlemek için `express`
- MongoDB nesne modellemesi için `mongoose`
- Güvenlik için `bcryptjs` ve `jsonwebtoken`
- Çapraz kaynak istekleri için `cors`
- Ortam değişkenleri yönetimi için `dotenv`
- HTTP istek kaydı için `morgan`

## Başlarken

Verilerinizi depoladığınız mongodb veya benzer bir veritabanı aracınız olmalı.

### Gereksinimler

- Node.js
- npm
```bash
npm install npm@latest -g
```
## 1. Depoyu klonlayın
git clone https://github.com/muratokur3/nalsak.git

## 2. .env dosyasını ayarlayın
Uygulamanın düzgün çalışabilmesi için, veritabanı aracınızın bilgilerini içeren .env dosyası oluşturmanız gerekmektedir. Aşağıdaki değişkenleri server klasörünüzdeki .env dosyanıza ekleyin:
```bash
MONGO_CONNECTION_STRING =[your-connection-string]
SECRET_KEY=[your-secret-key]
```

## 3. Hem istemci hem de sunucu için NPM paketlerini yükleyin
```bash
cd server
npm install
```

```bash
cd client
npm install
```

## 4. Uygulamayı Çalıştır
```bash
cd server
npm run dev
```
```bash
cd client
npm run dev
```
