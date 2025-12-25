import axios from 'axios';

const mockMarbles = [
    {
        title: 'Calacatta Gold',
        description: 'Luxurious Italian marble featuring dramatic gold and grey veining on a pristine white background. Perfect for high-end residential and commercial projects.',
        colorTone: 'White & Gold',
        originCountry: 'Italy',
        category: 'Premium White',
        stockQuantity: 150,
        isVisible: true,
        technicalSpecs: {
            density: '2.7 g/cm³',
            waterAbsorption: '0.2%',
            compressiveStrength: '120 MPa',
            flexuralStrength: '15 MPa'
        }
    },
    {
        title: 'Emperador Dark',
        description: 'Rich chocolate brown marble with delicate white veining. A timeless choice for sophisticated interiors and statement pieces.',
        colorTone: 'Dark Brown',
        originCountry: 'Spain',
        category: 'Dark Marble',
        stockQuantity: 200,
        isVisible: true,
        technicalSpecs: {
            density: '2.6 g/cm³',
            waterAbsorption: '0.3%',
            compressiveStrength: '110 MPa',
            flexuralStrength: '14 MPa'
        }
    },
    {
        title: 'Statuario Venato',
        description: 'Prestigious white marble with bold grey veining, reminiscent of classical Roman sculptures. Ideal for luxury applications.',
        colorTone: 'White & Grey',
        originCountry: 'Italy',
        category: 'Premium White',
        stockQuantity: 100,
        isVisible: true,
        technicalSpecs: {
            density: '2.7 g/cm³',
            waterAbsorption: '0.2%',
            compressiveStrength: '125 MPa',
            flexuralStrength: '16 MPa'
        }
    },
    {
        title: 'Nero Marquina',
        description: 'Elegant black marble with distinctive white veining. A bold choice for contemporary and classic design schemes.',
        colorTone: 'Black & White',
        originCountry: 'Spain',
        category: 'Black Marble',
        stockQuantity: 180,
        isVisible: true,
        technicalSpecs: {
            density: '2.8 g/cm³',
            waterAbsorption: '0.2%',
            compressiveStrength: '130 MPa',
            flexuralStrength: '17 MPa'
        }
    },
    {
        title: 'Carrara Bianco',
        description: 'Classic Italian white marble with subtle grey veining. The most recognizable marble in the world, used by Renaissance masters.',
        colorTone: 'White',
        originCountry: 'Italy',
        category: 'Classic White',
        stockQuantity: 250,
        isVisible: true,
        technicalSpecs: {
            density: '2.7 g/cm³',
            waterAbsorption: '0.2%',
            compressiveStrength: '118 MPa',
            flexuralStrength: '15 MPa'
        }
    },
    {
        title: 'Verde Guatemala',
        description: 'Stunning green marble with natural patterns and white veining. A rare and exotic choice for distinctive projects.',
        colorTone: 'Green',
        originCountry: 'Guatemala',
        category: 'Exotic',
        stockQuantity: 75,
        isVisible: true,
        technicalSpecs: {
            density: '2.7 g/cm³',
            waterAbsorption: '0.3%',
            compressiveStrength: '115 MPa',
            flexuralStrength: '14 MPa'
        }
    }
];

// Backend'e mock data'yı ekle
async function addMockData() {
    const API_BASE_URL = 'http://localhost:8081/api/admin';

    console.log('🚀 Starting to add mock marbles to backend...\n');

    for (let i = 0; i < mockMarbles.length; i++) {
        const marble = mockMarbles[i];

        try {
            // Download image from Unsplash
            const imageUrls = [
                'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
                'https://images.unsplash.com/photo-1634141510639-d691f07db12e?w=800&q=80',
                'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'
            ];

            const imageUrl = imageUrls[i % imageUrls.length];
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imageResponse.data);

            // Create FormData
            const FormData = require('form-data');
            const formData = new FormData();

            formData.append('title', marble.title);
            formData.append('description', marble.description);
            formData.append('colorTone', marble.colorTone);
            formData.append('originCountry', marble.originCountry);
            formData.append('category', marble.category);
            formData.append('stockQuantity', marble.stockQuantity.toString());
            formData.append('isVisible', marble.isVisible.toString());
            formData.append('technicalSpecs', JSON.stringify(marble.technicalSpecs));
            formData.append('imageFile', imageBuffer, {
                filename: `${marble.title.replace(/\s+/g, '_')}.jpg`,
                contentType: 'image/jpeg'
            });

            // Send to backend
            await axios.post(`${API_BASE_URL}/marble-images`, formData, {
                headers: formData.getHeaders()
            });

            console.log(`✅ Added: ${marble.title}`);

            // Wait a bit between requests
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            console.error(`❌ Failed to add ${marble.title}:`, error.message);
        }
    }

    console.log('\n✨ Done! Mock data has been added to the backend.');
}

addMockData();
