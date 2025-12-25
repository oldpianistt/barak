#!/bin/bash

# STL Stone Gallery - Add Mock Marble Data
# This script adds sample marble products to the backend

API_URL="http://localhost:8081/api/admin/marble-images"

echo "🚀 Adding mock marble data to STL Stone Gallery backend..."
echo ""

# Create a temporary directory for images
TEMP_DIR="/tmp/stl_marbles"
mkdir -p "$TEMP_DIR"

# Function to download image and create marble
add_marble() {
  local title="$1"
  local description="$2"
  local colorTone="$3"
  local origin="$4"
  local category="$5"
  local stock="$6"
  local imageUrl="$7"
  
  # Download image
  local imagePath="$TEMP_DIR/${title// /_}.jpg"
  curl -s "$imageUrl" -o "$imagePath"
  
  # Create FormData and POST
  curl -X POST "$API_URL" \
    -F "title=$title" \
    -F "description=$description" \
    -F "colorTone=$colorTone" \
    -F "originCountry=$origin" \
    -F "category=$category" \
    -F "stockQuantity=$stock" \
    -F "isVisible=true" \
    -F "technicalSpecs={\"density\":\"2.7 g/cm³\",\"waterAbsorption\":\"0.2%\",\"compressiveStrength\":\"120 MPa\",\"flexuralStrength\":\"15 MPa\"}" \
    -F "imageFile=@$imagePath" \
    -s -o /dev/null -w "Status: %{http_code}\n"
  
  echo "✅ Added: $title"
  sleep 1
}

# Add marbles
add_marble \
  "Calacatta Gold" \
  "Luxurious Italian marble featuring dramatic gold and grey veining on a pristine white background. Perfect for high-end residential and commercial projects." \
  "White & Gold" \
  "Italy" \
  "Premium White" \
  "150" \
  "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80"

add_marble \
  "Emperador Dark" \
  "Rich chocolate brown marble with delicate white veining. A timeless choice for sophisticated interiors and statement pieces." \
  "Dark Brown" \
  "Spain" \
  "Dark Marble" \
  "200" \
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"

add_marble \
  "Nero Marquina" \
  "Elegant black marble with distinctive white veining. A bold choice for contemporary and classic design schemes." \
  "Black & White" \
  "Spain" \
  "Black Marble" \
  "180" \
  "https://images.unsplash.com/photo-1634141510639-d691f07db12e?w=800&q=80"

add_marble \
  "Carrara Bianco" \
  "Classic Italian white marble with subtle grey veining. The most recognizable marble in the world, used by Renaissance masters." \
  "White" \
  "Italy" \
  "Classic White" \
  "250" \
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80"

add_marble \
  "Verde Guatemala" \
  "Stunning green marble with natural patterns and white veining. A rare and exotic choice for distinctive projects." \
  "Green" \
  "Guatemala" \
  "Exotic" \
  "75" \
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"

add_marble \
  "Crema Marfil" \
  "Soft cream marble with subtle beige undertones. A versatile choice for warm, inviting interiors." \
  "Cream" \
  "Spain" \
  "Beige Marble" \
  "220" \
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"

echo ""
echo "✨ Done! Mock data has been added to the backend."
echo "🌐 Visit http://localhost:3000 to see your marble collection!"

# Cleanup
rm -rf "$TEMP_DIR"
