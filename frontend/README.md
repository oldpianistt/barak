# STL Stone Gallery 🏛️

Premium marble gallery website with ultra-modern design, featuring a white-beige-black color palette inspired by senlermarble.com. Built with React, TypeScript, TailwindCSS, and advanced animations.

## ✨ Features

- 🎨 **Ultra-modern premium design** with glassmorphism effects
- 🌐 **Multi-language support** (English/Spanish)
- 📱 **Fully responsive** (Desktop & Mobile)
- 🔄 **Smart fallback system** - Works standalone with mock data or connects to Spring Boot backend
- 🛠️ **Admin panel** with full CRUD operations
- ⚡ **Advanced animations** with Motion (Framer Motion)
- 🖼️ **Large hero sections** with parallax effects
- 🎯 **Clean minimal luxury aesthetic**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173`

## 📦 Mock Data vs Backend

**By default, the app works perfectly with mock data - no backend needed!**

### Mock Data Mode (Default)
- ✅ No backend required
- ✅ 12 luxury marble products pre-loaded
- ✅ Perfect for frontend development and demo
- ✅ All features work (view-only in admin panel)

When you see this in console:
```
ℹ️ Backend not available - using mock data fallback
📦 Using mock data (12 luxury marble products)
```
**This is normal and expected!** The app is working correctly.

### Connect to Backend (Optional)
To enable full CRUD operations with a real database:

1. **Start your Spring Boot backend** at `http://localhost:8081`
2. **Configure environment** (optional):
   ```env
   VITE_API_BASE_URL=http://localhost:8081/api/admin
   VITE_USE_MOCK_DATA=false
   ```
3. **Restart the dev server**

## 🛠️ Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8081/api/admin

# Set to 'true' to force mock data even if backend is available
VITE_USE_MOCK_DATA=false
```

**Note:** You don't need a `.env` file for mock data mode!

## 📁 Project Structure

```
/
├── src/
│   ├── api/              # API services
│   │   ├── axios.ts      # Axios configuration
│   │   └── marbleService.ts
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MarbleCard.tsx
│   ├── data/            # Mock data
│   │   └── mockMarbles.ts
│   ├── hooks/           # Custom hooks
│   │   └── useMarbles.ts
│   ├── i18n/            # Multi-language
│   │   ├── i18n.ts
│   │   └── locales/
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── MarbleDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── admin/
│   │       ├── AdminMarbleList.tsx
│   │       └── AdminMarbleForm.tsx
│   └── types/           # TypeScript types
│       └── marble.ts
├── styles/
│   └── globals.css      # Global CSS + Tailwind
├── App.tsx              # Main application
├── main.tsx            # Entry point
└── vite.config.ts      # Vite configuration
```

## 🎨 Special Features

### Animations
- Parallax scrolling effects
- Hover animations
- Page transition animations
- Loading animations

### Filters (Gallery)
- Color tone based filtering
- Country based filtering
- Category based filtering
- Grid size (3-4 columns)

### Admin Panel
- Product list (grid/list view)
- Add new product
- Edit product
- Delete product
- Image upload

## 🌐 Multi-language Support

Supported languages:
- 🇬🇧 English (EN)
- 🇪🇸 Spanish (ES)

Language files: `/src/i18n/locales/`

## 📱 Responsive Design

- **Desktop:** 1600px+ (4 columns grid)
- **Tablet:** 768px-1599px (2-3 columns grid)
- **Mobile:** <768px (1 column)

## 🔧 Build

To create a production build:

```bash
npm run build
```

Build files will be created in the `/dist` folder.

Preview:
```bash
npm run preview
```

## 📝 Technologies

- React 18.3.1
- TypeScript 5.7.2
- Vite 6.0.5
- Tailwind CSS 4.0
- React Router 7.1.3
- React Query 5.62.7
- Motion (Framer Motion) 11.14.4
- Axios 1.7.9
- i18next 24.2.0
- React Hook Form 7.55.0
- Lucide React (icons)

## 🎯 Demo Mode

When not connected to the backend:
- ✅ All pages work
- ✅ 12 sample products are displayed
- ✅ Filters work
- ✅ Detail pages work
- ⚠️ Admin panel is in simulation mode (changes are not saved)

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License

## 👨‍💻 Developer

Premium Marble Gallery - 2024

---

**Note:** This project is a production-ready template. When the backend connection is established, it will automatically start using real data.