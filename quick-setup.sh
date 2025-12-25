#!/bin/bash

# Barak Marble Gallery - Hızlı Sunucu Kurulumu
# Bu script Ubuntu 22.04 LTS için hazırlanmıştır

set -e  # Hata durumunda dur

echo "🚀 Barak Marble Gallery Kurulumu Başlıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Sistem Güncellemesi
echo -e "${GREEN}[1/6] Sistem güncelleniyor...${NC}"
sudo apt update
sudo apt upgrade -y

# 2. Docker Kurulumu
echo -e "${GREEN}[2/6] Docker kuruluyor...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${YELLOW}Docker kuruldu. Değişikliklerin geçerli olması için logout/login yapın.${NC}"
else
    echo "Docker zaten kurulu."
fi

# 3. Docker Compose Kontrolü
echo -e "${GREEN}[3/6] Docker Compose kontrol ediliyor...${NC}"
if docker compose version &> /dev/null; then
    echo "Docker Compose kurulu: $(docker compose version)"
else
    echo -e "${RED}Docker Compose bulunamadı!${NC}"
    exit 1
fi

# 4. Proje Klasörü Oluştur
echo -e "${GREEN}[4/6] Proje klasörü hazırlanıyor...${NC}"
PROJECT_DIR="$HOME/barak"

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}Proje klasörü zaten mevcut: $PROJECT_DIR${NC}"
    read -p "Devam etmek istiyor musunuz? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    mkdir -p "$PROJECT_DIR"
fi

# 5. Environment Dosyası Oluştur
echo -e "${GREEN}[5/6] Environment dosyası hazırlanıyor...${NC}"
cd "$PROJECT_DIR"

if [ ! -f ".env" ]; then
    echo "# Database Configuration" > .env
    echo "DB_NAME=mermer_gallery" >> .env
    echo "DB_USERNAME=postgres" >> .env
    
    # Güvenli şifre oluştur
    DB_PASS=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-20)
    echo "DB_PASSWORD=$DB_PASS" >> .env
    echo "DB_PORT=5432" >> .env
    echo "" >> .env
    
    echo "# Backend Configuration" >> .env
    echo "BACKEND_PORT=8081" >> .env
    echo "MAX_FILE_SIZE=10MB" >> .env
    echo "MAX_REQUEST_SIZE=10MB" >> .env
    echo "" >> .env
    
    echo "# JPA Configuration" >> .env
    echo "DDL_AUTO=update" >> .env
    echo "SHOW_SQL=false" >> .env
    echo "FORMAT_SQL=false" >> .env
    echo "" >> .env
    
    echo "# Frontend Configuration" >> .env
    echo "FRONTEND_PORT=80" >> .env
    
    echo -e "${GREEN}✅ .env dosyası oluşturuldu. Database şifresi: $DB_PASS${NC}"
else
    echo ".env dosyası zaten mevcut, kullanılıyor."
fi

# 6. Bilgilendirme
echo ""
echo -e "${GREEN}[6/6] Kurulum tamamlandı! 🎉${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}ÖNEMLİ BİLGİLER:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Proje Dizini: $PROJECT_DIR"
echo "🔐 Database Şifresi: $DB_PASS (kaydedildi: .env)"
echo ""
echo -e "${YELLOW}SONRAKİ ADIMLAR:${NC}"
echo ""
echo "1. Proje dosyalarını sunucuya yükle:"
echo "   scp -r /path/to/barak/* root@sunucu-ip:$PROJECT_DIR/"
echo ""
echo "2. Projeyi başlat:"
echo "   cd $PROJECT_DIR"
echo "   docker compose up -d"
echo ""
echo "3. Logları izle:"
echo "   docker compose logs -f"
echo ""
echo "4. Container durumunu kontrol et:"
echo "   docker compose ps"
echo ""
echo -e "${YELLOW}ERİŞİM BİLGİLERİ:${NC}"
echo "• Frontend: http://SUNUCU_IP"
echo "• Admin Panel: http://SUNUCU_IP/admin"
echo "• API: http://SUNUCU_IP/api"
echo ""
echo -e "${YELLOW}ADMİN GİRİŞ BİLGİLERİ:${NC}"
echo "• Kullanıcı Adı: STLStoneGalleryAdmin"
echo "• Şifre: rM8!Z@4QvP#2^xE7L9K$"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
