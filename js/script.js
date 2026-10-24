document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильное меню (Гамбургер)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    // Создаем затемнение фона для мобильного меню
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navContainer.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем прокрутку body при открытом меню
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // 2. Плавный скролл (если остались якорные ссылки)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Закрываем мобильное меню при клике на ссылку
                if (navContainer.classList.contains('active')) toggleMenu();
                
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 3. Карусель отзывов
    const track = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');
    
    if (track && nextBtn) {
        let current = 0;
        const totalSlides = track.children.length;
        
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % totalSlides; // Бесконечная прокрутка
            track.style.transform = `translateX(-${current * 100}%)`;
        });
    }
});
