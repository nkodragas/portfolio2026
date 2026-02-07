// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Font Modal Functionality
const fontModal = document.getElementById('fontModal');
const modalClose = document.getElementById('modalClose');
const fontItems = document.querySelectorAll('.font-item');
const previewInput = document.getElementById('previewInput');
const previewOutput = document.getElementById('previewOutput');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const modalFontName = document.getElementById('modalFontName');
const characterSet = document.getElementById('characterSet');

let currentFontFamily = '';

// Open modal when clicking on a font item
fontItems.forEach(item => {
    item.addEventListener('click', function() {
        const fontName = this.dataset.font;
        const fontFamily = this.dataset.family;
        currentFontFamily = fontFamily;

        // Update modal
        modalFontName.textContent = fontName;
        previewOutput.style.fontFamily = fontFamily;
        characterSet.style.fontFamily = fontFamily;

        // Show modal
        fontModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    fontModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

fontModal.addEventListener('click', function(e) {
    if (e.target === fontModal) {
        closeModal();
    }
});

// Escape key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fontModal.classList.contains('active')) {
        closeModal();
    }
});

// Update preview text
previewInput.addEventListener('input', function() {
    previewOutput.textContent = this.value || 'Type something...';
});

// Update font size
fontSizeSlider.addEventListener('input', function() {
    const size = this.value;
    fontSizeValue.textContent = size + 'px';
    previewOutput.style.fontSize = size + 'px';
});

// Gallery hover effects
document.querySelectorAll('.gallery-item, .gallery-main').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Gallery Modal Functionality
const galleryModal = document.getElementById('galleryModal');
const galleryModalClose = document.getElementById('galleryModalClose');
const galleryModalImage = document.getElementById('galleryModalImage');
const galleryNavPrev = document.getElementById('galleryNavPrev');
const galleryNavNext = document.getElementById('galleryNavNext');
const galleryCurrentImage = document.getElementById('galleryCurrentImage');
const galleryTotalImages = document.getElementById('galleryTotalImages');

let currentGalleryImages = [];
let currentImageIndex = 0;

// Open modal when clicking on gallery images
document.querySelectorAll('.gallery-item img, .gallery-main img').forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Get all images from the same project gallery
        const gallery = this.closest('.project-gallery');
        const galleryImages = Array.from(gallery.querySelectorAll('img')).map(img => img.src);
        
        currentGalleryImages = galleryImages;
        currentImageIndex = galleryImages.indexOf(this.src);
        
        openGalleryModal();
    });
});

function openGalleryModal() {
    galleryModalImage.src = currentGalleryImages[currentImageIndex];
    galleryCurrentImage.textContent = currentImageIndex + 1;
    galleryTotalImages.textContent = currentGalleryImages.length;
    
    updateNavigationButtons();
    
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateNavigationButtons() {
    galleryNavPrev.disabled = currentImageIndex === 0;
    galleryNavNext.disabled = currentImageIndex === currentGalleryImages.length - 1;
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        galleryModalImage.src = currentGalleryImages[currentImageIndex];
        galleryCurrentImage.textContent = currentImageIndex + 1;
        updateNavigationButtons();
    }
}

function showNextImage() {
    if (currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
        galleryModalImage.src = currentGalleryImages[currentImageIndex];
        galleryCurrentImage.textContent = currentImageIndex + 1;
        updateNavigationButtons();
    }
}

// Gallery modal controls
galleryModalClose.addEventListener('click', closeGalleryModal);

galleryNavPrev.addEventListener('click', showPreviousImage);
galleryNavNext.addEventListener('click', showNextImage);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeGalleryModal();
    } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// Close modal when clicking outside the image
galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

// Social links interaction
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Social link clicked:', btn.getAttribute('aria-label'));
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to accent box
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const accentBox = document.querySelector('.accent-box');
            if (accentBox) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                accentBox.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});
// Drawing Canvas Feature
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const customCursor = document.getElementById('customCursor');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isScrolled = false;
let lastAngle = 0;
let mouseX = 0;
let mouseY = 0;

// Track scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (!isScrolled) {
            isScrolled = true;
            canvas.classList.add('fade-out');
            customCursor.style.opacity = '0';
            document.body.style.cursor = 'auto'; // Show system cursor
            // Clear canvas after fade
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.classList.remove('fade-out');
            }, 300);
        }
    } else {
        isScrolled = false;
        canvas.classList.remove('fade-out');
        document.body.style.cursor = 'none'; // Hide system cursor
    }
});

// Add irregular distressed stroke effect
function drawDistressedLine(fromX, fromY, toX, toY) {
    const distance = Math.hypot(toX - fromX, toY - fromY);
    const segments = Math.ceil(distance / 2);
    
    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const x = fromX + (toX - fromX) * t;
        const y = fromY + (toY - fromY) * t;
        
        // Add irregular distressed effect
        const offsetX = (Math.random() - 0.5) * 1.5;
        const offsetY = (Math.random() - 0.5) * 1.5;
        
        ctx.fillStyle = 'rgba(26, 26, 26, 0.6)';
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, Math.random() * 1.5 + 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Update custom cursor position and rotation
function updateCursor(x, y, angle) {
    customCursor.style.left = x + 'px';
    customCursor.style.top = y + 'px';
    customCursor.style.transform = `rotate(${angle}rad)`;
}

// Mouse move event
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    mouseX = x;
    mouseY = y;
    
    if (isScrolled) {
        customCursor.style.opacity = '0'; // Hide cursor while scrolling
        return; // Don't draw if scrolled
    }
    
    // Show cursor only when not scrolling
    customCursor.style.opacity = '1';
    
    if (!isDrawing) {
        isDrawing = true;
        lastX = x;
        lastY = y;
    } else {
        drawDistressedLine(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
    }
    
    // Calculate angle for cursor rotation based on movement direction
    if (isDrawing && (lastX !== x || lastY !== y)) {
        const angle = Math.atan2(y - lastY, x - lastX);
        lastAngle = angle;
    }
    
    // Update cursor position and rotation
    updateCursor(x, y, lastAngle);
});

// Mouse leave - stop drawing
document.addEventListener('mouseleave', () => {
    isDrawing = false;
    customCursor.style.opacity = '0';
});

// Reset on click
document.addEventListener('click', () => {
    if (!isScrolled) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isDrawing = false;
            customCursor.style.opacity = '0';
        }, 3000);
    }
});

// Snapshot functionality
const snapshotBtn = document.getElementById('snapshotBtn');

snapshotBtn.addEventListener('click', async () => {
    try {
        snapshotBtn.textContent = '⏳';
        snapshotBtn.disabled = true;
        
        // Get header element
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const headerWidth = header.offsetWidth;
        
        // Temporarily hide the button and canvas
        const originalDisplay = snapshotBtn.style.display;
        const originalCanvasDisplay = canvas.style.display;
        snapshotBtn.style.display = 'none';
        canvas.style.display = 'none';
        
        // Capture the header
        const headerCapture = await html2canvas(header, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            logging: false
        });
        
        // Restore button and canvas
        snapshotBtn.style.display = originalDisplay;
        canvas.style.display = originalCanvasDisplay;
        
        // Create a new canvas to combine header + drawing canvas
        const finalCanvas = document.createElement('canvas');
        const finalCtx = finalCanvas.getContext('2d');
        
        // Use the captured header dimensions
        finalCanvas.width = headerCapture.width;
        finalCanvas.height = headerCapture.height;
        
        // Draw the header first
        finalCtx.drawImage(headerCapture, 0, 0);
        
        // Draw the drawing canvas on top (just the header portion)
        finalCtx.drawImage(
            canvas,
            0, 0, 
            canvas.width, headerHeight,
            0, 0, 
            finalCanvas.width, finalCanvas.height
        );
        
        // Create download link
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.href = finalCanvas.toDataURL('image/png');
        link.download = `dragas-sketch-${timestamp}.png`;
        link.click();
                snapshotBtn.textContent = '✓';
        setTimeout(() => {
            snapshotBtn.textContent = '💾';
            snapshotBtn.disabled = false;
        }, 1500);
    } catch (error) {
        console.error('Snapshot failed:', error);
        snapshotBtn.textContent = '✗';
        snapshotBtn.disabled = false;
        setTimeout(() => {
            snapshotBtn.textContent = '💾';
        }, 1500);
    }
});

// Reset on page reload/refresh
window.addEventListener('load', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isScrolled = false;
    customCursor.style.opacity = '0';
});