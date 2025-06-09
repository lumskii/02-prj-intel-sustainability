// Intel Sustainability Timeline - JavaScript
// This script handles all interactive functionality for the website

// Timeline data with Intel's sustainability milestones (9 key milestones)
const timelineData = [
    {
        year: '1968',
        title: 'Intel Founded',
        description: 'Robert Noyce and Gordon Moore rename NM Electronics to Intel Corporation, laying the foundation for decades of innovation.',
        image: 'img/1.jpg',
        tags: ['Innovation', 'Foundation', 'Technology']
    },
    {
        year: '1971',
        title: 'First Microprocessor',
        description: 'Intel debuts the 4004—the world\'s first commercial microprocessor—igniting the revolution.',
        image: 'img/2.jpg',
        tags: ['Microprocessor', 'Innovation', 'Digital Revolution']
    },
    {
        year: '1978',
        title: '8086 Processor',
        description: 'Launch of the 8086 processor, establishing the x86 architecture that powers countless PCs.',
        image: 'img/3.jpg',
        tags: ['Environment', 'Leadership', 'Manufacturing']
    },
    {
        year: '1985',
        title: '386 Processor',
        description: 'Intel introduces the 32-bit 386 processor, ushering in new performance and multitasking.',
        image: 'img/4.jpg',
        tags: ['Green Building', 'Sustainable Design', 'Architecture']
    },
    {
        year: '2006',
        title: 'Peak GHG Emissions',
        description: 'Intel\'s highest Scope 1+2 emissions; following years focus on abatement and renewables.',
        image: 'img/peak.png',
        tags: ['Carbon Neutral', 'Renewable Energy', 'Efficiency']
    },
    {
        year: '2020',
        title: 'RISE Strategy',
        description: 'Intel launches RISE 2030 goals for climate action, water stewardship, and waste reduction.',
        image: 'img/rise.png',
        tags: ['Ethical Sourcing', 'Supply Chain', 'Social Responsibility']
    },
    {
        year: '2022',
        title: 'Net-Zero by 2040',
        description: 'Intel commits to net-zero Scope 1+2 emissions across global operations by 2040.',
        image: 'img/net-zero.png',
        tags: ['Water Conservation', 'Restoration', 'Neutrality']
    },
    {
        year: '2023',
        title: '99 % Renewable Electricity',
        description: 'Achieves 99 % renewable electricity worldwide, drastically lowering emissions.',
        image: 'img/electric.png',
        tags: ['Goals 2030', 'Water Impact', 'Zero Waste']
    },
    {
        year: '2024',
        title: 'Sustainability Summit',
        description: 'First Intel Sustainability Summit unites suppliers, officials, and industry leaders.',
        image: 'img/summit.png',
        tags: ['Climate Action', 'Net Zero', 'Global Operations']
    }
];

// Current timeline position for mobile
let currentTimelineIndex = 0;

// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all website functionality
    initializeMobileNavigation();
    initializeTimeline();
    initializeLucideIcons();
    setCurrentYear();
    
    console.log('Intel Sustainability Timeline initialized successfully!');
});

// ========== MOBILE NAVIGATION ========== //
function initializeMobileNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Check if elements exist before adding event listeners
    if (menuToggle && mobileMenu) {
        // Toggle mobile menu when hamburger button is clicked
        menuToggle.addEventListener('click', function() {
            // Toggle the active class to show/hide menu
            mobileMenu.classList.toggle('nav__mobile--active');
            
            // Change hamburger icon to X when menu is open
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('nav__mobile--active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            
            // Refresh Lucide icons to show the change
            lucide.createIcons();
        });
        
        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('.nav__mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('nav__mobile--active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// ========== TIMELINE FUNCTIONALITY ========== //
function initializeTimeline() {
    createTimelineCards();
    setupTimelineNavigation();
    setupMobileTimelineNavigation();
    initializeScrollSnapObserver();
    
    // Update mobile timeline display
    updateMobileTimeline();
}

// Create timeline cards for both desktop and mobile
function createTimelineCards() {
    const desktopTrack = document.getElementById('timeline-track');
    const mobileCards = document.getElementById('mobile-cards');
    
    if (desktopTrack && mobileCards) {
        // Clear existing content
        desktopTrack.innerHTML = '';
        mobileCards.innerHTML = '';
        
        // Create cards for each timeline milestone
        timelineData.forEach((milestone, index) => {
            // Create desktop card
            const desktopCard = createMilestoneCard(milestone, index);
            desktopTrack.appendChild(desktopCard);
            
            // Create mobile card (show all cards for vertical scrolling)
            const mobileCard = createMilestoneCard(milestone, index);
            mobileCard.classList.add('mobile-timeline-card');
            mobileCards.appendChild(mobileCard);
        });
        
        // Create navigation dots for mobile (now used for scroll-to functionality)
        createTimelineDots();
        
        // Initialize mobile vertical scroll observer
        initializeMobileScrollObserver();
    }
}

// Create individual milestone card
function createMilestoneCard(milestone, index) {
    // Create main card container
    const card = document.createElement('div');
    card.className = 'milestone-card';
    card.setAttribute('data-index', index);
    
    // Add hover effect for desktop cards
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
    
    // Build card HTML structure with initial blue overlay
    card.innerHTML = `
        <img src="${milestone.image}" alt="${milestone.title}" class="milestone-card__image">
        
        <!-- Blue overlay that appears over the image initially -->
        <div class="milestone-card__overlay">
            <span class="milestone-card__year">${milestone.year}</span>
            <h3 class="milestone-card__title">${milestone.title}</h3>
        </div>
        
        <!-- Content area that appears on hover with white background -->
        <div class="milestone-card__content">
            <span class="milestone-card__year">${milestone.year}</span>
            <h3 class="milestone-card__title">${milestone.title}</h3>
            <p class="milestone-card__description">${milestone.description}</p>
            <div class="milestone-card__tags">
                ${milestone.tags.map(tag => `<span class="milestone-card__tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Create navigation dots for mobile timeline
function createTimelineDots() {
    const dotsContainer = document.getElementById('timeline-dots');
    
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        
        // Create one dot for each timeline item
        timelineData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'timeline__dot';
            
            // Add click event to scroll to specific timeline item in mobile
            dot.addEventListener('click', function() {
                scrollToMobileCard(index);
            });
            
            dotsContainer.appendChild(dot);
        });
    }
}

// Scroll to specific card in mobile vertical timeline
function scrollToMobileCard(index) {
    const mobileCards = document.getElementById('mobile-cards');
    if (mobileCards) {
        const cards = mobileCards.querySelectorAll('.milestone-card');
        if (cards[index]) {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Setup desktop timeline navigation (horizontal scroll)
function setupTimelineNavigation() {
    const track = document.getElementById('timeline-track');
    const prevBtn = document.getElementById('timeline-prev');
    const nextBtn = document.getElementById('timeline-next');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cardWidth = 380; // Card width + gap
        
        // Create progress indicator elements
        createProgressIndicator();
        
        // Scroll left when previous button is clicked
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToCard(currentIndex);
            }
        });
        
        // Scroll right when next button is clicked
        nextBtn.addEventListener('click', function() {
            if (currentIndex < timelineData.length - 1) {
                currentIndex++;
                scrollToCard(currentIndex);
            }
        });
        
        // Function to scroll to specific card with smooth animation
        function scrollToCard(index) {
            const targetScroll = index * cardWidth;
            track.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
            updateNavigationState(index);
            updateProgressBar(index);
        }
        
        // Update button states and progress
        function updateNavigationState(index) {
            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === timelineData.length - 1;
            
            // Update position indicator
            const positionElement = document.getElementById('timeline-position');
            if (positionElement) {
                positionElement.textContent = `${index + 1} / ${timelineData.length}`;
            }
            
            // Update visual feedback for current card
            updateVisibleCard(index);
        }
        
        // Listen to scroll events for manual scrolling
        track.addEventListener('scroll', function() {
            const scrollLeft = track.scrollLeft;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateNavigationState(currentIndex);
                updateProgressBar(currentIndex);
            }
        });
        
        // Initialize navigation state
        updateNavigationState(0);
        updateProgressBar(0);
        
        // Keyboard navigation support
        track.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                scrollToCard(currentIndex);
                e.preventDefault();
            } else if (e.key === 'ArrowRight' && currentIndex < timelineData.length - 1) {
                currentIndex++;
                scrollToCard(currentIndex);
                e.preventDefault();
            }
        });
        
        // Make timeline focusable for keyboard navigation
        track.setAttribute('tabindex', '0');
    }
}

// Setup mobile timeline navigation
function setupMobileTimelineNavigation() {
    // For vertical scroll, we don't need touch swipe navigation
    // The native scroll behavior handles the vertical scrolling
    // Keep minimal touch feedback for better UX
    const mobileCards = document.getElementById('mobile-cards');
    
    if (mobileCards) {
        // Add scroll event listener for better visual feedback
        mobileCards.addEventListener('scroll', function() {
            updateMobileScrollIndicators();
        });
        
        // Smooth scroll behavior is handled by CSS
        // Touch gestures work naturally with vertical scroll
    }
}

// Initialize mobile scroll observer for visual feedback
function initializeMobileScrollObserver() {
    const mobileCards = document.getElementById('mobile-cards');
    if (mobileCards && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const index = parseInt(card.getAttribute('data-index'));
                const dot = document.querySelectorAll('.timeline__dot')[index];
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // Add active state to dot when card is prominently visible
                    if (dot) dot.classList.add('timeline__dot--active');
                } else {
                    // Remove active state when card is less visible
                    if (dot) dot.classList.remove('timeline__dot--active');
                }
            });
        }, {
            root: mobileCards,
            threshold: [0.3, 0.5, 0.7],
            rootMargin: '-20px 0px'
        });

        // Observe all mobile timeline cards
        const cards = mobileCards.querySelectorAll('.milestone-card');
        cards.forEach(card => observer.observe(card));
    }
}

// Update mobile scroll indicators (simplified for vertical scroll)
function updateMobileScrollIndicators() {
    // This function can be used for additional scroll-based feedback if needed
    // Currently, the intersection observer handles the dot updates
}

// Update mobile timeline display (simplified for vertical scroll)
function updateMobileTimeline() {
    // For vertical scroll, all cards are visible
    // This function is now mainly for backwards compatibility
    // The intersection observer handles the visual feedback
    
    const dots = document.querySelectorAll('.timeline__dot');
    
    // Reset all dots (they'll be updated by intersection observer)
    dots.forEach(dot => {
        dot.classList.remove('timeline__dot--active');
    });
    
    // The first card can be initially active
    if (dots[0]) {
        dots[0].classList.add('timeline__dot--active');
    }
}

// ========== TIMELINE PROGRESS FUNCTIONS ========== //

// Create progress indicator elements
function createProgressIndicator() {
    const controls = document.querySelector('.timeline__controls');
    if (controls) {
        // Check if progress elements already exist
        if (!document.getElementById('timeline-position')) {
            // Create position indicator
            const positionElement = document.createElement('span');
            positionElement.id = 'timeline-position';
            positionElement.className = 'timeline__position';
            positionElement.textContent = '1 / 9';
            
            // Create progress bar container
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'timeline__progress-bar';
            
            // Create progress fill element
            const progressFill = document.createElement('div');
            progressFill.id = 'timeline-progress-fill';
            progressFill.className = 'timeline__progress-fill';
            progressFill.style.width = '11.11%'; // Initial width for first item (1/9)
            
            progressBarContainer.appendChild(progressFill);
            
            // Insert elements in the controls
            const nextBtn = document.getElementById('timeline-next');
            if (nextBtn) {
                controls.insertBefore(positionElement, nextBtn);
                controls.insertBefore(progressBarContainer, nextBtn);
            }
        }
    }
}

// Update progress bar based on current timeline position
function updateProgressBar(index) {
    const progressFill = document.getElementById('timeline-progress-fill');
    if (progressFill) {
        const percentage = ((index + 1) / timelineData.length) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Add visual feedback for currently visible card
function updateVisibleCard(index) {
    const track = document.getElementById('timeline-track');
    if (track) {
        const cards = track.querySelectorAll('.milestone-card');
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('in-view');
            } else {
                card.classList.remove('in-view');
            }
        });
    }
}

// Enhanced intersection observer for scroll snap feedback
function initializeScrollSnapObserver() {
    const track = document.getElementById('timeline-track');
    if (track && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // Add visual feedback for the card that's most in view
                    const index = parseInt(card.getAttribute('data-index'));
                    updateVisibleCard(index);
                }
            });
        }, {
            root: track,
            threshold: [0.3, 0.5, 0.7],
            rootMargin: '0px -20px'
        });

        // Observe all milestone cards
        const cards = track.querySelectorAll('.milestone-card');
        cards.forEach(card => observer.observe(card));
    }
}

// ========== UTILITY FUNCTIONS ========== //

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Calculate offset for fixed navbar
        const navbarHeight = document.querySelector('.nav').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// ========== RESPONSIVE HELPERS ========== //
// Handle window resize events
window.addEventListener('resize', function() {
    // Close mobile menu when switching to desktop
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (mobileMenu && menuToggle) {
            mobileMenu.classList.remove('nav__mobile--active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    }
    
    // Reinitialize mobile scroll observer when switching layouts
    if (window.innerWidth <= 768) {
        // Small delay to ensure layout has settled
        setTimeout(() => {
            initializeMobileScrollObserver();
        }, 300);
    }
});

// ========== INTERSECTION OBSERVER (SCROLL ANIMATIONS) ========== //
// Add scroll animations when elements come into view
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline cards for scroll animations
    const cards = document.querySelectorAll('.milestone-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe goals for scroll animations
    const goals = document.querySelectorAll('.goal');
    goals.forEach(goal => {
        goal.style.opacity = '0';
        goal.style.transform = 'translateY(30px)';
        goal.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(goal);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollAnimations, 500); // Delay to ensure layout is ready
});

// ========== ACCESSIBILITY IMPROVEMENTS ========== //
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate timeline with arrow keys when in mobile view
    if (window.innerWidth <= 768) {
        const mobileCards = document.getElementById('mobile-cards');
        if (mobileCards && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            
            // Get currently visible card index
            const cards = mobileCards.querySelectorAll('.milestone-card');
            let targetIndex = 0;
            
            // Find the first visible card
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const containerRect = mobileCards.getBoundingClientRect();
                if (rect.top >= containerRect.top && rect.top < containerRect.bottom) {
                    targetIndex = index;
                }
            });
            
            // Navigate up or down
            if (e.key === 'ArrowUp' && targetIndex > 0) {
                scrollToMobileCard(targetIndex - 1);
            } else if (e.key === 'ArrowDown' && targetIndex < cards.length - 1) {
                scrollToMobileCard(targetIndex + 1);
            }
        }
    }
});

// ========== ERROR HANDLING ========== //
// Global error handler for graceful degradation
window.addEventListener('error', function(e) {
    console.warn('Intel Timeline: Non-critical error occurred:', e.message);
    // Continue execution - don't break the user experience
});

// Log successful initialization
console.log('Intel Sustainability Timeline JavaScript loaded successfully!');
