document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.top-nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
    }

    if (closeDrawer && mobileDrawer) {
        closeDrawer.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    }

    // Close drawer when clicking a link
    const drawerLinks = document.querySelectorAll('.drawer-links a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // 2. Fade-up Animations on Scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    const checkFade = () => {
        const triggerBottom = window.innerHeight * 0.85;
        fadeElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', checkFade);
    checkFade(); // check on load

    // 3. Smooth Scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll if it's a hash link and not just "#"
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    
                    if (this.classList.contains('nav-item')) {
                        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            }
        });
    });

    // 4. WhatsApp Booking Integration
    const WHATSAPP_NUMBER = "918919999178"; 

    // Hero Widget Booking
    const quickBookBtn = document.getElementById('quick-book-btn');
    const resultArea = document.getElementById('booking-result');
    const resultText = document.getElementById('result-text');
    const waBtn = document.getElementById('wa-redirect-btn');
    let currentWaUrl = "";

    const carPrices = {
        'Mahindra Thar': 4500,
        'Hyundai Creta': 3000,
        'Kia Sonet': 3000,
        'Toyota Glanza': 2500,
        'Maruti Baleno': 2500,
        'Maruti Ertiga': 3500,
        'BMW Series': 6000,
        'Swift Dzire': 2200
    };

    if (quickBookBtn) {
        quickBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const car = document.getElementById('car-select').value;
            const pickup = document.getElementById('pickup-date').value;
            const returnDate = document.getElementById('return-date').value;
            
            if(!car || !pickup || !returnDate) {
                alert("Please select a vehicle and dates to check availability.");
                return;
            }

            const pricePerDay = carPrices[car] || 0;
            const d1 = new Date(pickup);
            const d2 = new Date(returnDate);
            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            const total = pricePerDay * diffDays;

            resultText.innerText = `Total Price: ₹${total.toLocaleString()}`;
            resultArea.style.display = 'block';

            const message = `Elite Rentals Inquiry:\n\nVehicle: *${car}*\nPick-up: ${pickup}\nReturn: ${returnDate}\nTotal Estimated: ₹${total.toLocaleString()}\n\nPlease confirm availability.`;
            currentWaUrl = `https://wa.me/918919999178?text=${encodeURIComponent(message)}`;
            
            if (waBtn) waBtn.href = currentWaUrl;
            
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    if (waBtn) {
        waBtn.addEventListener('click', (e) => {
            if (currentWaUrl) {
                e.preventDefault();
                window.open(currentWaUrl, '_blank');
            }
        });
    }

    // Card Reserve Buttons
    const bookButtons = document.querySelectorAll('.book-car-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const carName = btn.getAttribute('data-car');
            const message = `Elite Rentals Inquiry: I am interested in reserving the *${carName}*. Is this vehicle available?`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });

});
