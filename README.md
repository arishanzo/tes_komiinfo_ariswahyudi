# Tes Kominfo Ariswahyudi

Aplikasi full-stack dengan Laravel backend dan React frontend untuk tes Kominfo.

## Struktur Proyek

```
tes_komiinfo_ariswahyudi/
├── backend/     # Laravel API
└── frontend/    # React Application
```

## Persyaratan Sistem

### Backend (Laravel)
- PHP >= 8.1
- Composer
- MySQL/MariaDB
- Node.js & NPM (untuk asset compilation)

### Frontend (React)
- Node.js >= 16
- NPM atau Yarn

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd tes_komiinfo_ariswahyudi
```

### 2. Setup Backend (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Setup database (edit .env file first)
# Update DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env

# Run migrations
php artisan migrate

# Create storage link
php artisan storage:link

# Set permissions (if needed)
chmod -R 775 storage bootstrap/cache
```

### 3. Setup Frontend (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file (if exists)
copy .env.example .env
```

## Konfigurasi Database

Edit file `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tes_kominfo_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

Buat database MySQL:
```sql
CREATE DATABASE tes_kominfo_db;
```

## Menjalankan Aplikasi

### Development Mode

#### Terminal 1 - Backend Laravel
```bash
cd backend
php artisan serve
```
Backend akan berjalan di: http://localhost:8000

#### Terminal 2 - Frontend React
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di: http://localhost:5173

### Production Mode

#### Backend
```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Frontend
```bash
cd frontend
npm run build
```

## API Endpoints

### Pokemon API
- `GET /api/pokemons` - Get all pokemons
- `POST /api/pokemons` - Create/Update pokemon
- `DELETE /api/pokemons/{id}` - Delete pokemon
- `GET /api/photos/{path}` - Get pokemon image

## Fitur Utama

- **Pokemon Management**: CRUD operations untuk data Pokemon
- **Image Upload**: Upload dan resize gambar Pokemon
- **Authentication**: Sistem login/register
- **Responsive Design**: UI yang responsive dengan Tailwind CSS
- **Real-time Updates**: Menggunakan Laravel Echo dan Pusher

## Teknologi yang Digunakan

### Backend
- Laravel 10
- Laravel Sanctum (Authentication)
- Intervention Image (Image processing)
- Pusher (Real-time)
- Midtrans (Payment gateway)

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- React Router
- Framer Motion
- React Hot Toast

## Troubleshooting

### Common Issues

1. **Permission Error**
   ```bash
   chmod -R 775 backend/storage backend/bootstrap/cache
   ```

2. **Database Connection Error**
   - Pastikan MySQL service berjalan
   - Periksa kredensial database di `.env`

3. **Composer Install Error**
   ```bash
   composer install --ignore-platform-reqs
   ```

4. **NPM Install Error**
   ```bash
   npm cache clean --force
   npm install
   ```

## Development

### Backend Commands
```bash
# Run tests
php artisan test

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Database operations
php artisan migrate:fresh --seed
```

### Frontend Commands
```bash
# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

MIT License