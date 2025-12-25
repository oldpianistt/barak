# Barak Marble Gallery - Production Deployment Guide

Bu rehber, Barak (STL Stone Gallery) projesinin Docker ile production ortamına deploy edilmesi için gereken tüm adımları içermektedir.

## İçindekiler

- [Gereksinimler](#gereksinimler)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Detaylı Kurulum](#detaylı-kurulum)
- [Environment Variables](#environment-variables)
- [Production Best Practices](#production-best-practices)
- [Bakım ve Monitoring](#bakım-ve-monitoring)
- [Troubleshooting](#troubleshooting)
- [Backup ve Restore](#backup-ve-restore)

## Gereksinimler

- **Docker**: 24.0 veya üzeri
- **Docker Compose**: 2.20 veya üzeri
- **Minimum Sistem Gereksinimleri**:
  - 2 CPU Core
  - 4GB RAM
  - 20GB Disk Space

### Kurulum Kontrolü

```bash
docker --version
docker compose version
```

## Hızlı Başlangıç

### 1. Environment Konfigürasyonu

```bash
# .env dosyasını oluştur
cp .env.example .env

# .env dosyasını düzenle (özellikle DB_PASSWORD'u değiştir)
nano .env
```

### 2. Uygulamayı Başlat

```bash
# Tüm servisleri ayağa kaldır
docker compose up -d

# Logları takip et
docker compose logs -f
```

### 3. Erişim

- **Frontend**: http://localhost
- **Admin Panel**: http://localhost/admin
- **Backend API**: http://localhost/api
- **Database**: localhost:5432

## Detaylı Kurulum

### Adım 1: Projeyi Hazırla

```bash
# Proje dizinine git
cd /path/to/barak

# .env dosyasını oluştur ve düzenle
cp .env.example .env
```

### Adım 2: Environment Variables'ı Yapılandır

`.env` dosyasını aç ve aşağıdaki değerleri düzenle:

```env
# Database - GÜVENLİ BİR ŞİFRE KULLAN!
DB_PASSWORD=your_secure_password_here

# Production için önerilen JPA ayarları
DDL_AUTO=validate  # veya 'none' (migration tool kullanıyorsan)
SHOW_SQL=false
FORMAT_SQL=false
```

### Adım 3: İlk Deployment

```bash
# Container'ları build et ve başlat
docker compose up -d --build

# Servislerin durumunu kontrol et
docker compose ps

# Tüm servisler 'healthy' durumuna gelene kadar bekle
watch -n 2 docker compose ps
```

### Adım 4: Database'i Başlat

İlk deployment'ta database boş olacaktır. Eğer mevcut bir backup'ınız varsa:

```bash
# Backup'ı restore et (backup.sql dosyanız varsa)
docker compose exec -T db psql -U postgres -d mermer_gallery < backup.sql
```

Veya mock data kullanmak için:

```bash
# Mock data script'ini çalıştır (varsa)
chmod +x add-mock-data.sh
./add-mock-data.sh
```

## Environment Variables

### Database Configuration

| Variable | Varsayılan | Açıklama |
|----------|------------|----------|
| `DB_NAME` | `mermer_gallery` | PostgreSQL database adı |
| `DB_USERNAME` | `postgres` | Database kullanıcı adı |
| `DB_PASSWORD` | `password` | Database şifresi (**değiştirin!**) |
| `DB_PORT` | `5432` | Database port |

### Backend Configuration

| Variable | Varsayılan | Açıklama |
|----------|------------|----------|
| `BACKEND_PORT` | `8081` | Backend API port |
| `MAX_FILE_SIZE` | `10MB` | Maksimum upload dosya boyutu |
| `MAX_REQUEST_SIZE` | `10MB` | Maksimum request boyutu |

### JPA Configuration

| Variable | Varsayılan (Dev) | Production Önerisi | Açıklama |
|----------|------------------|-------------------|----------|
| `DDL_AUTO` | `update` | `validate` veya `none` | Hibernate DDL stratejisi |
| `SHOW_SQL` | `false` | `false` | SQL loglarını göster |
| `FORMAT_SQL` | `false` | `false` | SQL loglarını formatla |

### Frontend Configuration

| Variable | Varsayılan | Açıklama |
|----------|------------|----------|
| `FRONTEND_PORT` | `80` | Frontend web server port |

## Production Best Practices

### 1. Güvenlik

#### Strong Passwords
```bash
# Güçlü şifre oluştur
openssl rand -base64 32
```

`.env` dosyasında kullan:
```env
DB_PASSWORD=<generated_password>
```

#### HTTPS Kurulumu (Nginx Proxy Manager veya Traefik ile)

Production'da mutlaka HTTPS kullanın. Let's Encrypt ile ücretsiz SSL sertifikası alabilirsiniz.

Örnek Nginx ters proxy konfigürasyonu:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Resource Limits

`docker-compose.yml` dosyasına resource limitleri ekleyin:

```yaml
services:
  backend:
    # ...
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### 3. Database Tuning

PostgreSQL performansını artırmak için:

```yaml
db:
  command:
    - "postgres"
    - "-c"
    - "max_connections=200"
    - "-c"
    - "shared_buffers=256MB"
    - "-c"
    - "effective_cache_size=1GB"
```

### 4. Logging

Production'da log rotation yapılandırın:

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Bakım ve Monitoring

### Logları İzleme

```bash
# Tüm servislerin logları
docker compose logs -f

# Sadece backend
docker compose logs -f backend

# Sadece son 100 satır
docker compose logs --tail=100 backend
```

### Container Durumunu Kontrol

```bash
# Tüm container'ların durumu
docker compose ps

# Resource kullanımı
docker stats

# Health check durumu
docker compose ps --format "table {{.Name}}\t{{.Status}}"
```

### Güncelleme

```bash
# Yeni kodu çek
git pull

# Container'ları yeniden build et ve başlat
docker compose up -d --build

# Eski image'leri temizle
docker image prune -f
```

### Yeniden Başlatma

```bash
# Tüm servisleri yeniden başlat
docker compose restart

# Sadece backend'i yeniden başlat
docker compose restart backend
```

### Durdurma ve Temizleme

```bash
# Servisleri durdur (data silinmez)
docker compose down

# Servisleri durdur ve volume'leri sil (DİKKAT: VERİLER SİLİNİR!)
docker compose down -v

# Kullanılmayan image'leri temizle
docker system prune -a
```

## Troubleshooting

### Backend Başlamıyor

**Problem**: Backend container sürekli yeniden başlıyor.

**Çözüm**:
```bash
# Logları kontrol et
docker compose logs backend

# Database bağlantısını kontrol et
docker compose exec backend ping db

# Database'in hazır olup olmadığını kontrol et
docker compose exec db psql -U postgres -d mermer_gallery -c "SELECT 1"
```

### Frontend API'ye Erişemiyor

**Problem**: Frontend yüklenmiyor veya API çağrıları başarısız.

**Çözüm**:
```bash
# Nginx konfigürasyonunu kontrol et
docker compose exec frontend cat /etc/nginx/conf.d/default.conf

# Backend'in çalıştığını doğrula
curl http://localhost:8081/actuator/health

# Network bağlantısını test et
docker compose exec frontend ping backend
```

### Database Bağlantı Hatası

**Problem**: `Connection refused` veya `could not connect to server` hatası.

**Çözüm**:
```bash
# Database container'ının çalıştığını doğrula
docker compose ps db

# Database loglarını kontrol et
docker compose logs db

# Database'e manuel bağlan
docker compose exec db psql -U postgres -d mermer_gallery
```

### Upload Dizini Sorunları

**Problem**: Resim upload edilemiyor veya gösterilmiyor.

**Çözüm**:
```bash
# Upload volume'unu kontrol et
docker compose exec backend ls -la /app/uploads

# İzinleri kontrol et
docker compose exec backend ls -ld /app/uploads

# Volume'u yeniden oluştur
docker compose down
docker volume rm barak_uploads_data
docker compose up -d
```

### Port Çakışması

**Problem**: `port is already allocated` hatası.

**Çözüm**:
```bash
# Kullanılan portları kontrol et
sudo lsof -i :80
sudo lsof -i :8081
sudo lsof -i :5432

# .env dosyasında farklı portlar kullan
FRONTEND_PORT=8080
BACKEND_PORT=8082
DB_PORT=5433
```

## Backup ve Restore

### Database Backup

#### Manuel Backup

```bash
# Backup oluştur
docker compose exec -T db pg_dump -U postgres mermer_gallery > backup_$(date +%Y%m%d_%H%M%S).sql

# Sıkıştırılmış backup
docker compose exec -T db pg_dump -U postgres mermer_gallery | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

#### Otomatik Backup (Cron)

Crontab'a ekle (`crontab -e`):

```bash
# Her gün saat 02:00'da backup al
0 2 * * * cd /path/to/barak && docker compose exec -T db pg_dump -U postgres mermer_gallery | gzip > /backup/db_$(date +\%Y\%m\%d).sql.gz
```

### Database Restore

```bash
# Restore from backup
docker compose exec -T db psql -U postgres -d mermer_gallery < backup.sql

# Sıkıştırılmış backup'tan restore
gunzip < backup.sql.gz | docker compose exec -T db psql -U postgres -d mermer_gallery
```

### Upload Dosyaları Backup

```bash
# Upload volume'unu backup al
docker run --rm -v barak_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads_backup_$(date +%Y%m%d).tar.gz -C /data .

# Restore
docker run --rm -v barak_uploads_data:/data -v $(pwd):/backup alpine tar xzf /backup/uploads_backup.tar.gz -C /data
```

### Tam Sistem Backup

```bash
#!/bin/bash
# full_backup.sh

BACKUP_DIR="/backup/barak/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

cd /path/to/barak

# Database backup
docker compose exec -T db pg_dump -U postgres mermer_gallery | gzip > $BACKUP_DIR/database.sql.gz

# Uploads backup
docker run --rm -v barak_uploads_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/uploads.tar.gz -C /data .

# .env dosyası
cp .env $BACKUP_DIR/env.backup

echo "Backup completed: $BACKUP_DIR"
```

## Monitoring ve Alerting

### Basic Health Check

Basit bir health check script'i:

```bash
#!/bin/bash
# health_check.sh

echo "Checking Barak services..."

# Frontend check
if curl -f http://localhost:80 > /dev/null 2>&1; then
    echo "✓ Frontend is healthy"
else
    echo "✗ Frontend is down!"
fi

# Backend check
if curl -f http://localhost:8081/actuator/health > /dev/null 2>&1; then
    echo "✓ Backend is healthy"
else
    echo "✗ Backend is down!"
fi

# Database check
if docker compose exec -T db psql -U postgres -d mermer_gallery -c "SELECT 1" > /dev/null 2>&1; then
    echo "✓ Database is healthy"
else
    echo "✗ Database is down!"
fi
```

Cron ile her 5 dakikada bir kontrol et:

```bash
*/5 * * * * /path/to/health_check.sh
```

## Production Checklist

Canlıya çıkmadan önce kontrol edin:

- [ ] `.env` dosyasında güçlü şifreler kullanıldı
- [ ] `DDL_AUTO=validate` veya `none` olarak ayarlandı
- [ ] `SHOW_SQL=false` olarak ayarlandı
- [ ] HTTPS yapılandırıldı (reverse proxy ile)
- [ ] Firewall kuralları yapılandırıldı (sadece 80/443 portları açık)
- [ ] Backup stratejisi oluşturuldu ve test edildi
- [ ] Monitoring ve alerting kuruldu
- [ ] Resource limits tanımlandı
- [ ] Log rotation yapılandırıldı
- [ ] Database performans ayarları yapıldı
- [ ] Tüm endpoint'ler test edildi
- [ ] Health check'ler çalışıyor

## Destek

Sorun yaşarsanız:

1. İlk olarak logları kontrol edin: `docker compose logs -f`
2. Health check durumunu kontrol edin: `docker compose ps`
3. Bu dokümandaki Troubleshooting bölümünü inceleyin

## Lisans

Bu deployment konfigürasyonu Barak (STL Stone Gallery) projesi için oluşturulmuştur.
