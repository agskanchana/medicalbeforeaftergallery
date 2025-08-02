document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Before After Sliders
    initializeBeforeAfterSliders();

    // Initialize Demo Tabs
    initializeDemoTabs();

    // Initialize Comparison Tables
    initializeComparisonTables();

    // Add fixed header on scroll
    handleStickyHeader();

    // Add animations on scroll
    initializeScrollAnimations();

    // Initialize scroll to top button
    initScrollToTop();

    // Initialize pricing toggle
    initPricingToggle();
});

// Before After Slider functionality
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterContainer = slider.querySelector('.after-container');
        let isResizing = false;

        // Handle mouse events
        handle.addEventListener('mousedown', startResize);
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);

        // Handle touch events for mobile
        handle.addEventListener('touchstart', startResize);
        window.addEventListener('touchmove', resize);
        window.addEventListener('touchend', stopResize);

        // Set initial position
        positionAfterImage(50);

        function startResize(e) {
            e.preventDefault();
            isResizing = true;
        }

        function stopResize() {
            isResizing = false;
        }

        function resize(e) {
            if (!isResizing) return;

            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }

            const sliderRect = slider.getBoundingClientRect();
            const percentage = ((clientX - sliderRect.left) / sliderRect.width) * 100;

            positionAfterImage(percentage);
        }

        function positionAfterImage(percentage) {
            // Clamp percentage between 0 and 100
            const clampedPercentage = Math.min(100, Math.max(0, percentage));

            afterContainer.style.width = `${clampedPercentage}%`;
            handle.style.left = `${clampedPercentage}%`;
        }
    });
}

// Demo Tabs functionality
function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all panels
            const panels = document.querySelectorAll('.demo-panel');
            panels.forEach(panel => panel.classList.remove('active'));

            // Show target panel
            const targetId = this.dataset.tab;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Re-initialize before after slider in this panel
                const slider = targetPanel.querySelector('.before-after-slider');
                if (slider) {
                    const afterContainer = slider.querySelector('.after-container');
                    const handle = slider.querySelector('.slider-handle');
                    afterContainer.style.width = '50%';
                    handle.style.left = '50%';
                }
            }
        });
    });
}

// Comparison Tables functionality
function initializeComparisonTables() {
    const comparisonTables = document.querySelectorAll('.comparison-table');

    comparisonTables.forEach(tableContainer => {
        // Add highlighting effect when hovering over rows
        const rows = tableContainer.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(60, 136, 253, 0.05)';
            });

            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });

        // Add sorting functionality if available
        const headers = tableContainer.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const sortDirection = this.getAttribute('data-direction') || 'asc';
                const sortBy = this.getAttribute('data-sort');
                const tbody = tableContainer.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));

                // Sort the rows
                rows.sort((a, b) => {
                    const cellA = a.querySelector(`td:nth-child(${getColumnIndex(sortBy) + 1})`).textContent.trim();
                    const cellB = b.querySelector(`td:nth-child(${getColumnIndex(sortBy) + 1})`).textContent.trim();

                    if (sortDirection === 'asc') {
                        return cellA.localeCompare(cellB);
                    } else {
                        return cellB.localeCompare(cellA);
                    }
                });

                // Update sort direction for next click
                this.setAttribute('data-direction', sortDirection === 'asc' ? 'desc' : 'asc');

                // Update visual indicator
                headers.forEach(h => h.classList.remove('sorting-asc', 'sorting-desc'));
                this.classList.add(sortDirection === 'asc' ? 'sorting-asc' : 'sorting-desc');

                // Reappend rows in the sorted order
                rows.forEach(row => tbody.appendChild(row));
            });
        });

        function getColumnIndex(columnName) {
            const headers = Array.from(tableContainer.querySelectorAll('th'));
            return headers.findIndex(header => header.getAttribute('data-sort') === columnName);
        }
    });

    // Add filter functionality if available
    const filterSelects = document.querySelectorAll('.comparison-filter select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const category = this.getAttribute('data-filter');
            const value = this.value;
            const tableId = this.getAttribute('data-table');
            const table = document.getElementById(tableId);

            if (!table) return;

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                if (value === 'all') {
                    row.style.display = '';
                } else {
                    const cell = row.querySelector(`td[data-category="${category}"]`);
                    if (cell && cell.textContent.trim() === value) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add highlight feature buttons
    const highlightButtons = document.querySelectorAll('.comparison-highlight-btn');
    highlightButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            const tableId = this.getAttribute('data-table');
            const table = document.getElementById(tableId);

            if (!table) return;

            // Remove highlighting from all rows
            const allRows = table.querySelectorAll('tbody tr');
            allRows.forEach(row => row.classList.remove('highlighted'));

            // Highlight rows with the specified feature
            const featureRows = table.querySelectorAll(`tbody tr[data-feature="${feature}"]`);
            featureRows.forEach(row => row.classList.add('highlighted'));

            // Update active state on buttons
            const buttons = document.querySelectorAll(`.comparison-highlight-btn[data-table="${tableId}"]`);
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Sticky header functionality
function handleStickyHeader() {
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        lastScrollTop = scrollTop;
    });
}

// Scroll Animation functionality
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial, .hero-content, .hero-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
        element.classList.add('will-animate');
    });

    // Add necessary CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .will-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card.will-animate,
        .pricing-card.will-animate,
        .testimonial.will-animate {
            transition-delay: calc(var(--animation-order) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Set animation order for grid items
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.setProperty('--animation-order', index);
    });
}

// Add mobile menu styles
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .main-nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--bg-color);
                box-shadow: var(--shadow);
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .main-nav.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .main-nav ul {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }

            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            .site-header.sticky {
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call the mobile menu styles function
addMobileMenuStyles();

// Add sticky header styles
function addStickyHeaderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .site-header.sticky {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 0.75rem 0;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Call the sticky header styles function
addStickyHeaderStyles();

// Add comparison table styles
function addComparisonTableStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .comparison-table table {
            transition: all 0.3s ease;
        }

        .comparison-table th.sorting-asc::after {
            content: "↑";
            margin-left: 5px;
        }

        .comparison-table th.sorting-desc::after {
            content: "↓";
            margin-left: 5px;
        }

        .comparison-table th[data-sort] {
            cursor: pointer;
        }

        .comparison-table th[data-sort]:hover {
            background: rgba(31, 41, 55, 0.8);
        }

        .comparison-table tr.highlighted {
            background-color: rgba(60, 136, 253, 0.1) !important;
            font-weight: 500;
        }

        .comparison-filter {
            margin-bottom: 1rem;
        }

        .comparison-filter select {
            padding: 0.5rem;
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            font-family: 'Poppins', sans-serif;
            margin-right: 0.5rem;
        }

        .comparison-feature-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .comparison-highlight-btn {
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
        }

        .comparison-highlight-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        @media (max-width: 768px) {
            .comparison-feature-buttons {
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call the comparison table styles function
addComparisonTableStyles();

// Scroll to top button functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) return;

    // Show button when scrolling down 300px from the top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const savings = document.querySelectorAll('.savings');

    if (!toggle) return;

    toggle.addEventListener('change', function() {
        const isAnnual = this.checked;

        monthlyPrices.forEach(price => {
            price.classList.toggle('active', !isAnnual);
        });

        annualPrices.forEach(price => {
            price.classList.toggle('active', isAnnual);
        });

        savings.forEach(saving => {
            saving.classList.toggle('show', isAnnual);
        });
    });

    // Initialize Freemius checkout
    initFreemiusCheckout();
}

// Freemius checkout functionality
function initFreemiusCheckout() {
    // Check if Freemius script is loaded
    if (typeof FS === 'undefined') {
        console.error('Freemius checkout script not loaded');
        return;
    }

    // Initialize handler using the working configuration
    const handler = new FS.Checkout({
        product_id: '20099',
        plan_id: '33353',
        public_key: 'pk_6303cf40cc7629d8361bc8762da77',
        image: 'https://your-plugin-site.com/logo-100x100.png'
    });

    // Get Pro button
    const proButton = document.getElementById('get_pro');
    if (proButton) {
        proButton.addEventListener('click', (e) => {
            e.preventDefault();

            const isAnnual = document.getElementById('pricing-toggle').checked;
            const planName = isAnnual ? 'MBA Gallery Pro (Annual)' : 'MBA Gallery Pro (Monthly)';

            handler.open({
                name: planName,
                licenses: 1, // Single site for Pro
                purchaseCompleted: (response) => {
                    console.log('Purchase completed:', response);
                    console.log('User email:', response.user.email);
                    console.log('License key:', response.license.key);

                    // Show success message
                    showPurchaseSuccess(response, 'Pro');
                },
                success: (response) => {
                    console.log('Checkout closed after successful purchase:', response);
                    console.log('User email:', response.user.email);
                    console.log('License key:', response.license.key);

                    // Handle purchase success
                    handlePurchaseSuccess(response, 'Pro');
                }
            });
        });
    }

    // Get Agency button
    const agencyButton = document.getElementById('get_agency');
    if (agencyButton) {
        agencyButton.addEventListener('click', (e) => {
            e.preventDefault();

            const isAnnual = document.getElementById('pricing-toggle').checked;
            const planName = isAnnual ? 'MBA Gallery Agency (Annual)' : 'MBA Gallery Agency (Monthly)';

            handler.open({
                name: planName,
                licenses: 'unlimited', // Unlimited sites for Agency
                purchaseCompleted: (response) => {
                    console.log('Purchase completed:', response);
                    console.log('User email:', response.user.email);
                    console.log('License key:', response.license.key);

                    // Show success message
                    showPurchaseSuccess(response, 'Agency');
                },
                success: (response) => {
                    console.log('Checkout closed after successful purchase:', response);
                    console.log('User email:', response.user.email);
                    console.log('License key:', response.license.key);

                    // Handle purchase success
                    handlePurchaseSuccess(response, 'Agency');
                }
            });
        });
    }
}

// Handle purchase success
function handlePurchaseSuccess(response, planName) {
    // Create success modal or redirect to thank you page
    const successModal = createSuccessModal(response, planName);
    document.body.appendChild(successModal);
    successModal.style.display = 'flex';

    // Auto-hide after 10 seconds
    setTimeout(() => {
        successModal.remove();
    }, 10000);
}

// Show immediate purchase success message
function showPurchaseSuccess(response, planName) {
    // Show a quick success notification
    const notification = document.createElement('div');
    notification.className = 'purchase-notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Purchase successful! Processing your ${planName} license...</span>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Create success modal
function createSuccessModal(response, planName) {
    const modal = document.createElement('div');
    modal.className = 'purchase-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h2>Purchase Successful!</h2>
            </div>
            <div class="modal-body">
                <p>Thank you for purchasing <strong>MBA Gallery ${planName}</strong>!</p>
                <div class="purchase-details">
                    <div class="detail-item">
                        <strong>Email:</strong> ${response.user.email}
                    </div>
                    <div class="detail-item">
                        <strong>License Key:</strong>
                        <code>${response.license.key}</code>
                        <button class="copy-btn" onclick="copyToClipboard('${response.license.key}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="next-steps">
                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Check your email for download instructions</li>
                        <li>Download the plugin from your account</li>
                        <li>Install and activate using your license key</li>
                    </ol>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.purchase-success-modal').remove()">
                    Got it, thanks!
                </button>
                <a href="mailto:support@medicalbeforeaftergallery.com" class="btn btn-secondary">
                    Need Help?
                </a>
            </div>
        </div>
    `;

    return modal;
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show copied notification
        const notification = document.createElement('div');
        notification.className = 'purchase-notification info';
        notification.innerHTML = `
            <i class="fas fa-check"></i>
            <span>License key copied to clipboard!</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}