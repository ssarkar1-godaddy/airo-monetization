// Main JavaScript for GoDaddy Airo Prototype

document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
    initializeNavTabs();
    initializeChatInput();
    initializeResponsiveHandling();
    initializeUserMessageColorLogic();
});

// Navigation function for all clickable elements
function navigateToPage(pageId) {
    console.log(`Navigating to: ${pageId}`);
    
    // Detect if we're in a subdirectory (pages/)
    const isInSubdirectory = window.location.pathname.includes('/pages/');
    const pathPrefix = isInSubdirectory ? '../' : '';
    
    // Map page IDs to actual pages (where they exist) or descriptions
    const pageRoutes = {
        'index': { type: 'page', url: pathPrefix + 'index.html' },
        'home': { type: 'page', url: pathPrefix + 'index.html' },
        'upgrade': { type: 'alert', message: 'Airo Plus Upgrade Page' },
        'privacy-policy': { type: 'page', url: pathPrefix + 'pages/privacy-policy.html' },
        'generate-privacy-policy': { type: 'page', url: pathPrefix + 'pages/generate-privacy-policy.html' },
        'create-privacy-policy': { type: 'page', url: pathPrefix + 'pages/generate-privacy-policy.html' },
        'carpet-logo': { type: 'alert', message: 'Carpet Logo Design Chat' },
        'rug-warehouse': { type: 'alert', message: 'Rug Warehouse Images Chat' },
        'business-goals': { type: 'alert', message: 'Business Goals Setting Chat' },
        'set-up-llc': { type: 'alert', message: 'LLC Setup Chat' },
        'coming-soon': { type: 'alert', message: 'Coming Soon Page Chat' },
        'generate-images': { type: 'alert', message: 'Generate Images - Coming Soon!' },
        'generate-image': { type: 'alert', message: 'Generate Images - Coming Soon!' },
        'generate-logo': { type: 'page', url: pathPrefix + 'pages/generate-logo.html' },
        'marketing-consultant': { type: 'alert', message: 'Marketing Consultant Tool' },
        'connect-yelp': { type: 'alert', message: 'Yelp Integration Page' },
        'design-logo': { type: 'page', url: pathPrefix + 'pages/generate-logo.html' },
        'optimize-site': { type: 'alert', message: 'Website Optimization Tool' },
        'generate-images-create': { type: 'alert', message: 'Image Generation Tool' },
        'market-business': { type: 'alert', message: 'Business Marketing Tool' },
        'generate-marketing-strategy': { type: 'page', url: pathPrefix + 'pages/generate-marketing-strategy.html' },
        'setup-llc': { type: 'alert', message: 'LLC Setup Tool' },
        'domain-search': { type: 'page', url: pathPrefix + 'pages/domain-search.html' },
        'congratulations': { type: 'alert', message: 'Congratulations! Your Privacy Policy has been created successfully!' }
    };
    
    const route = pageRoutes[pageId];
    
    if (route) {
        if (route.type === 'page') {
            // Navigate to actual page
            window.location.href = route.url;
        } else {
            // Show notification for pages that don't exist yet
            showNotification(`Opening ${route.message}...`);
        }
    } else {
        showNotification(`Opening ${pageId}...`);
    }
}

// Function to detect privacy policy related text input
function detectPrivacyPolicyRequest(inputText) {
    const text = inputText.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Privacy policy related keywords and phrases
    const privacyPolicyKeywords = [
        'generate privacy policy',
        'create privacy policy',
        'make privacy policy',
        'privacy policy generator',
        'generate my privacy policy',
        'create my privacy policy',
        'make my privacy policy',
        'privacy policy',
        'generate privacypolicy',
        'create privacypolicy',
        'generateprivacypolicy',
        'createprivacypolicy'
    ];
    
    // Check if any of the keywords match
    return privacyPolicyKeywords.some(keyword => {
        const normalizedKeyword = keyword.replace(/\s+/g, '');
        const normalizedText = text.replace(/\s+/g, '');
        return normalizedText.includes(normalizedKeyword) || text.includes(keyword);
    });
}

// Function to detect marketing strategy related text input
function detectMarketingStrategyRequest(inputText) {
    const text = inputText.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Marketing strategy related keywords and phrases
    const marketingKeywords = [
        'market my business',
        'marketing strategy',
        'business marketing',
        'market business',
        'marketing plan',
        'create marketing strategy',
        'generate marketing strategy',
        'help market my business',
        'marketing consultant',
        'marketing advice',
        'grow my business',
        'business growth',
        'marketmybusiness',
        'marketingstrategy'
    ];
    
    return marketingKeywords.some(keyword => {
        const normalizedKeyword = keyword.replace(/\s+/g, '');
        const normalizedText = text.replace(/\s+/g, '');
        return normalizedText.includes(normalizedKeyword) || text.includes(keyword);
    });
}

// Function to detect image generation related text input
function detectImageGenerationRequest(inputText) {
    const text = inputText.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const imageKeywords = [
        'create image',
        'generate image',
        'make image',
        'create picture',
        'generate picture',
        'make picture',
        'design image',
        'image generation',
        'create graphic',
        'generate graphic',
        'make graphic',
        'createimage',
        'generateimage',
        'makeimage',
        'createpicture',
        'generatepicture',
        'makepicture'
    ];
    
    return imageKeywords.some(keyword => {
        const normalizedKeyword = keyword.replace(/\s+/g, '');
        const normalizedText = text.replace(/\s+/g, '');
        return normalizedText.includes(normalizedKeyword) || text.includes(keyword);
    });
}

// Function to detect logo design related text input
function detectLogoRequest(inputText) {
    const text = inputText.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const logoKeywords = [
        'design a logo',
        'design logo',
        'create a logo',
        'create logo',
        'make a logo',
        'make logo',
        'generate logo',
        'logo design',
        'logo creation',
        'design my logo',
        'create my logo',
        'new logo',
        'designlogo',
        'createlogo',
        'makelogo',
        'generatelogo'
    ];
    
    return logoKeywords.some(keyword => {
        const normalizedKeyword = keyword.replace(/\s+/g, '');
        const normalizedText = text.replace(/\s+/g, '');
        return normalizedText.includes(normalizedKeyword) || text.includes(keyword);
    });
}

// Universal phrase detection for global navigation
function detectGlobalNavigationPhrase(inputText) {
    const text = inputText.toLowerCase().trim();
    
    // Check for logo creation phrases
    if (text.includes('create a logo') || text.includes('generate a logo') || text.includes('make a logo')) {
        navigateToPage('generate-logo');
        return true;
    }
    
    // Check for privacy policy creation phrases
    if (text.includes('create a privacy policy') || text.includes('generate a privacy policy') || text.includes('make a privacy policy')) {
        navigateToPage('generate-privacy-policy');
        return true;
    }
    
    // Check for marketing plan creation phrases
    if (text.includes('create a marketing plan') || text.includes('generate a marketing plan') || text.includes('make a marketing plan')) {
        navigateToPage('generate-marketing-strategy');
        return true;
    }
    
    return false;
}

// Function to handle chat input submission
function handleChatSubmission(inputText) {
    if (!inputText || inputText.trim() === '') {
        showNotification('Please enter a message first');
        return;
    }
    
    // Check for global navigation phrases first
    if (detectGlobalNavigationPhrase(inputText)) {
        return true;
    }
    
    // Check if this is a privacy policy request
    if (detectPrivacyPolicyRequest(inputText)) {
        console.log('Privacy policy request detected:', inputText);
        showNotification('Opening Privacy Policy Generator...');
        setTimeout(() => {
            navigateToPage('generate-privacy-policy');
        }, 500);
        return true;
    }
    
    // Check if this is a marketing strategy request
    if (detectMarketingStrategyRequest(inputText)) {
        console.log('Marketing strategy request detected:', inputText);
        showNotification('Opening Marketing Strategy Generator...');
        setTimeout(() => {
            navigateToPage('generate-marketing-strategy');
        }, 500);
        return true;
    }
    
    // Check if this is an image generation request
    if (detectImageGenerationRequest(inputText)) {
        console.log('Image generation request detected:', inputText);
        showNotification('Opening Image Generator...');
        setTimeout(() => {
            navigateToPage('generate-image');
        }, 500);
        return true;
    }
    
    // Check if this is a logo design request
    if (detectLogoRequest(inputText)) {
        console.log('Logo design request detected:', inputText);
        showNotification('Opening Logo Generator...');
        setTimeout(() => {
            navigateToPage('generate-logo');
        }, 500);
        return true;
    }
    
    // Handle other types of input
    console.log(`Chat input: ${inputText}`);
    showNotification(`Processing: "${inputText}"`);
    return false;
}

// Show temporary notification
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #7B2CBF;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(123, 44, 191, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize dropdown functionality - robust version that works in all states
function initializeDropdowns() {
    // Airo Grid Panel (new functionality)
    const askAiroBtn = document.getElementById('askAiroBtn');
    const airoGridPanel = document.getElementById('airoGridPanel');
    
    // Recent Chats Dropdown (traditional dropdown)
    const recentChatsBtn = document.getElementById('recentChatsBtn');
    const recentChatsDropdown = document.getElementById('recentChatsDropdown');
    
    // Remove any existing event listeners to prevent duplicates
    if (askAiroBtn && askAiroBtn.hasAttribute('data-dropdown-initialized')) {
        return; // Already initialized
    }
    
    // Handle Ask Airo grid panel toggle
    if (askAiroBtn && airoGridPanel) {
        askAiroBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close recent chats dropdown if open
            if (recentChatsDropdown && recentChatsDropdown.classList.contains('show')) {
                recentChatsDropdown.classList.remove('show');
                recentChatsBtn.classList.remove('active');
            }
            
            // Toggle grid panel
            const isOpen = airoGridPanel.classList.contains('show');
            if (isOpen) {
                airoGridPanel.classList.remove('show');
                askAiroBtn.classList.remove('active');
            } else {
                airoGridPanel.classList.add('show');
                askAiroBtn.classList.add('active');
            }
        });
        
        // Close grid panel when clicking on a grid item
        airoGridPanel.addEventListener('click', function(e) {
            if (e.target.closest('.grid-item')) {
                airoGridPanel.classList.remove('show');
                askAiroBtn.classList.remove('active');
            }
        });
    }
    
    // Handle Recent Chats dropdown (traditional dropdown)
    if (recentChatsBtn && recentChatsDropdown) {
        recentChatsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close grid panel if open
            if (airoGridPanel && airoGridPanel.classList.contains('show')) {
                airoGridPanel.classList.remove('show');
                askAiroBtn.classList.remove('active');
            }
            
            // Toggle dropdown
            const isOpen = recentChatsDropdown.classList.contains('show');
            if (isOpen) {
                recentChatsDropdown.classList.remove('show');
                recentChatsBtn.classList.remove('active');
            } else {
                recentChatsDropdown.classList.add('show');
                recentChatsBtn.classList.add('active');
            }
        });
        
        // Close dropdown when clicking on a link
        recentChatsDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                recentChatsDropdown.classList.remove('show');
                recentChatsBtn.classList.remove('active');
            }
        });
    }
    
    // Close everything when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideAiro = askAiroBtn?.contains(e.target) || airoGridPanel?.contains(e.target);
        const isClickInsideChats = recentChatsBtn?.contains(e.target) || recentChatsDropdown?.contains(e.target);
        
        if (!isClickInsideAiro && !isClickInsideChats) {
            // Close grid panel
            if (airoGridPanel && airoGridPanel.classList.contains('show')) {
                airoGridPanel.classList.remove('show');
                askAiroBtn.classList.remove('active');
            }
            
            // Close dropdown
            if (recentChatsDropdown && recentChatsDropdown.classList.contains('show')) {
                recentChatsDropdown.classList.remove('show');
                recentChatsBtn.classList.remove('active');
            }
        }
    });
    
    // Close everything on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (airoGridPanel && airoGridPanel.classList.contains('show')) {
                airoGridPanel.classList.remove('show');
                askAiroBtn.classList.remove('active');
            }
            
            if (recentChatsDropdown && recentChatsDropdown.classList.contains('show')) {
                recentChatsDropdown.classList.remove('show');
                recentChatsBtn.classList.remove('active');
            }
        }
    });
    
    // Mark dropdowns as initialized to prevent duplicate initialization
    if (askAiroBtn) askAiroBtn.setAttribute('data-dropdown-initialized', 'true');
    if (recentChatsBtn) recentChatsBtn.setAttribute('data-dropdown-initialized', 'true');
}

// Force re-initialization of dropdowns (useful for dynamic content)
function forceDropdownReinitialization() {
    const askAiroBtn = document.getElementById('askAiroBtn');
    const recentChatsBtn = document.getElementById('recentChatsBtn');
    
    // Remove initialization markers
    if (askAiroBtn) askAiroBtn.removeAttribute('data-dropdown-initialized');
    if (recentChatsBtn) recentChatsBtn.removeAttribute('data-dropdown-initialized');
    
    // Re-initialize
    initializeDropdowns();
}

// Make functions globally available
window.initializeDropdowns = initializeDropdowns;
window.forceDropdownReinitialization = forceDropdownReinitialization;

// Initialize navigation tabs
function initializeNavTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab data
            const tabData = this.getAttribute('data-tab');
            console.log(`Switching to tab: ${tabData}`);
            
            // Show notification
            showNotification(`Switched to ${tabData.charAt(0).toUpperCase() + tabData.slice(1)} tab`);
            
            // In a real application, you would filter/show content based on the tab
            // For now, we'll just highlight the active tab
        });
    });
}

// Initialize chat input functionality
function initializeChatInput() {
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const attachBtn = document.querySelector('.attach-btn');
    
    if (chatInput && sendBtn) {
        // Handle send button click
        sendBtn.addEventListener('click', function() {
            const message = chatInput.value.trim();
            const handled = handleChatSubmission(message);
            if (handled) {
                chatInput.value = '';
            }
        });
        
        // Handle enter key press
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
        
        // Auto-resize chat input (optional enhancement)
        chatInput.addEventListener('input', function() {
            // This could be enhanced to auto-resize the input field
            // For now, we'll just ensure it doesn't exceed certain limits
        });
    }
    
    if (attachBtn) {
        attachBtn.addEventListener('click', function() {
            showNotification('File attachment feature would open here');
            console.log('Attach file clicked');
        });
    }
}

// Initialize responsive handling
function initializeResponsiveHandling() {
    let resizeTimeout;
    
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle any responsive adjustments needed
            const isMobile = window.innerWidth <= 768;
            const isSmallMobile = window.innerWidth <= 480;
            
            // Adjust dropdown positioning for mobile
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                if (isSmallMobile) {
                    menu.style.left = '0';
                    menu.style.right = '0';
                    menu.style.minWidth = 'auto';
                } else {
                    menu.style.left = '0';
                    menu.style.right = 'auto';
                    menu.style.minWidth = '200px';
                }
            });
            
            console.log(`Viewport resized: ${window.innerWidth}px (Mobile: ${isMobile})`);
        }, 150);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
}

// Utility function to add loading state to elements
function addLoadingState(element) {
    if (element) {
        element.classList.add('loading');
        const originalText = element.textContent;
        element.innerHTML = '<span class="spinner"></span> ' + originalText;
        
        return function removeLoading() {
            element.classList.remove('loading');
            element.textContent = originalText;
        };
    }
}

// Enhanced navigation with loading states
function navigateToPageWithLoading(pageId, element) {
    if (element) {
        const removeLoading = addLoadingState(element);
        
        setTimeout(() => {
            navigateToPage(pageId);
            removeLoading();
        }, 500);
    } else {
        navigateToPage(pageId);
    }
}

// Smooth scroll utility
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize tooltips (if needed)
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            // Create and show tooltip
            console.log(`Tooltip: ${tooltipText}`);
        });
        
        element.addEventListener('mouseleave', function() {
            // Hide tooltip
        });
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add keyboard navigation for dropdowns
    document.addEventListener('keydown', function(e) {
        const activeDropdown = document.querySelector('.dropdown-menu.show');
        
        if (activeDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            const links = activeDropdown.querySelectorAll('a');
            const currentFocus = document.activeElement;
            const currentIndex = Array.from(links).indexOf(currentFocus);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
            }
            
            links[nextIndex].focus();
        }
    });
    
    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent || button.getAttribute('title') || 'Button';
            button.setAttribute('aria-label', text.trim());
        }
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load performance:', {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    totalTime: perfData.loadEventEnd - perfData.fetchStart
                });
            }, 0);
        });
    }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializePerformanceMonitoring();
    initializeTooltips();
    
    console.log('GoDaddy Airo prototype initialized successfully');
});

// ==================== USER MESSAGE COLOR LOGIC ==================== //

// Initialize user message color logic on page load
function initializeUserMessageColorLogic() {
    // Mark all existing user messages as sent (grey) when page loads
    markAllExistingUserMessagesAsSent();
    
    // Set up observers for new user messages
    observeUserMessageChanges();
    
    // Set up universal button click handler for chat interfaces
    setupUniversalButtonClickHandler();
}

// Function to mark a user message as sent (grey)
function markUserMessageAsSent(userBubbleElement) {
    if (userBubbleElement && userBubbleElement.classList.contains('user-bubble')) {
        userBubbleElement.classList.remove('typing');
        userBubbleElement.classList.add('sent');
        console.log('✅ Marked user message as sent (grey)');
    }
}

// Function to mark a user message as typing (white)
function markUserMessageAsTyping(userBubbleElement) {
    if (userBubbleElement && userBubbleElement.classList.contains('user-bubble')) {
        userBubbleElement.classList.remove('sent');
        userBubbleElement.classList.add('typing');
        console.log('✅ Marked user message as typing (white)');
    }
}

// Function to mark a user message as CTA-triggered (grey immediately)
function markUserMessageAsCTATriggered(userBubbleElement) {
    if (userBubbleElement && userBubbleElement.classList.contains('user-bubble')) {
        userBubbleElement.classList.remove('sent', 'typing');
        userBubbleElement.classList.add('cta-triggered');
        
        // Add data attribute for CSS targeting
        const messageText = userBubbleElement.textContent.trim().toLowerCase();
        userBubbleElement.setAttribute('data-message', messageText);
        
        console.log('✅ Marked user message as CTA-triggered (grey):', messageText);
    }
}

// Function to mark all existing user messages as sent when page loads
function markAllExistingUserMessagesAsSent() {
    const userBubbles = document.querySelectorAll('.user-bubble');
    console.log(`🔍 Found ${userBubbles.length} user bubbles to mark as sent`);
    
    userBubbles.forEach(bubble => {
        if (!bubble.classList.contains('typing')) {
            bubble.classList.remove('typing');
            bubble.classList.add('sent');
            console.log('✅ Marked user bubble as sent:', bubble);
        }
    });
    
    console.log('✅ All existing user messages marked as sent');
    
    // Force a style recalculation to ensure changes take effect
    document.body.offsetHeight;
    
    // Also check for and mark any CTA messages that already exist
    markExistingCTAMessages();
}

// Function to find and mark existing CTA messages
function markExistingCTAMessages() {
    const userBubbles = document.querySelectorAll('.user-bubble');
    console.log(`🔍 Checking ${userBubbles.length} user bubbles for CTA messages`);
    
    userBubbles.forEach(bubble => {
        const isInChatInterface = bubble.closest('.chat-interface') || 
                                bubble.closest('.chat-messages') || 
                                bubble.closest('.main-content-wrapper');
        
        const isButtonGeneratedMessage = isInChatInterface && (
            // Original CTA patterns
            bubble.textContent.includes('Try ') ||
            bubble.textContent.includes('Start ') ||
            bubble.textContent.includes('Yes,') ||
            bubble.textContent.includes('Looks Good') ||
            bubble.textContent.includes('Generate') ||
            bubble.textContent.includes('Search') ||
            bubble.textContent.includes('Create') ||
            // Additional button patterns
            bubble.textContent.includes('I have a ') ||
            bubble.textContent.includes('Next') ||
            bubble.textContent.includes('Continue') ||
            bubble.textContent.includes('Submit') ||
            bubble.textContent.includes('Send') ||
            bubble.textContent.includes('Apply') ||
            bubble.textContent.includes('Save') ||
            bubble.textContent.includes('Update') ||
            bubble.textContent.includes('Edit') ||
            bubble.textContent.includes('Delete') ||
            bubble.textContent.includes('Cancel') ||
            bubble.textContent.includes('OK') ||
            bubble.textContent.includes('Confirm') ||
            // Short responses that are likely button clicks
            (bubble.textContent.trim().length < 50 && 
             (bubble.textContent.includes('Yes') || 
              bubble.textContent.includes('No') ||
              bubble.textContent.includes('Maybe') ||
              bubble.textContent.includes('Done') ||
              bubble.textContent.includes('Skip')))
        );
        
        if (isButtonGeneratedMessage && !bubble.classList.contains('cta-triggered')) {
            markUserMessageAsCTATriggered(bubble);
        }
    });
}

// Observer to watch for new user messages being added
function observeUserMessageChanges() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a user bubble or contains user bubbles
                        const userBubbles = node.classList && node.classList.contains('user-bubble') 
                            ? [node] 
                            : node.querySelectorAll ? node.querySelectorAll('.user-bubble') : [];
                            
                        userBubbles.forEach(bubble => {
                            // Check if this is ANY button-generated message in a chat interface
                            const parentElement = bubble.closest('.user-message');
                            const isInChatInterface = bubble.closest('.chat-interface') || 
                                                    bubble.closest('.chat-messages') || 
                                                    bubble.closest('.main-content-wrapper');
                            
                            const isButtonGeneratedMessage = isInChatInterface && (
                                // Original CTA patterns
                                bubble.textContent.includes('Try ') ||
                                bubble.textContent.includes('Start ') ||
                                bubble.textContent.includes('Yes,') ||
                                bubble.textContent.includes('Looks Good') ||
                                bubble.textContent.includes('Generate') ||
                                bubble.textContent.includes('Search') ||
                                bubble.textContent.includes('Create') ||
                                // Additional button patterns
                                bubble.textContent.includes('I have a ') ||
                                bubble.textContent.includes('Next') ||
                                bubble.textContent.includes('Continue') ||
                                bubble.textContent.includes('Submit') ||
                                bubble.textContent.includes('Send') ||
                                bubble.textContent.includes('Apply') ||
                                bubble.textContent.includes('Save') ||
                                bubble.textContent.includes('Update') ||
                                bubble.textContent.includes('Edit') ||
                                bubble.textContent.includes('Delete') ||
                                bubble.textContent.includes('Cancel') ||
                                bubble.textContent.includes('OK') ||
                                bubble.textContent.includes('Confirm') ||
                                // Short responses that are likely button clicks
                                (bubble.textContent.trim().length < 50 && 
                                 (bubble.textContent.includes('Yes') || 
                                  bubble.textContent.includes('No') ||
                                  bubble.textContent.includes('Maybe') ||
                                  bubble.textContent.includes('Done') ||
                                  bubble.textContent.includes('Skip')))
                            );
                            
                            if (isButtonGeneratedMessage) {
                                // ALL button-generated messages should be grey immediately
                                markUserMessageAsCTATriggered(bubble);
                            } else if (!bubble.classList.contains('sent') && !bubble.classList.contains('typing') && !bubble.classList.contains('cta-triggered')) {
                                // Regular typed user messages start as typing (white) until sent
                                markUserMessageAsTyping(bubble);
                            }
                        });
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    
    console.log('✅ User message observer initialized');
}

// Setup universal button click handler for all chat interface buttons
function setupUniversalButtonClickHandler() {
    // Add event listener to document for all button clicks
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        
        // Check if clicked element is a button in a chat interface
        const isButton = clickedElement.tagName === 'BUTTON' || 
                        clickedElement.closest('button') ||
                        clickedElement.classList.contains('btn') ||
                        clickedElement.classList.contains('action-btn') ||
                        clickedElement.classList.contains('standalone-btn') ||
                        clickedElement.classList.contains('outline-btn') ||
                        clickedElement.classList.contains('privacy-cta-btn') ||
                        clickedElement.classList.contains('looks-good-btn') ||
                        clickedElement.classList.contains('card-btn');
        
        const isInChatInterface = clickedElement.closest('.chat-interface') || 
                                clickedElement.closest('.chat-messages') || 
                                clickedElement.closest('.main-content-wrapper') ||
                                clickedElement.closest('.chat-container');
        
        // Exclude control bar buttons from CTA behavior
        const isControlBarButton = clickedElement.closest('.control-bar');
        
        if (isButton && isInChatInterface && !isControlBarButton) {
            // Get button text for the message
            const buttonText = clickedElement.textContent.trim();
            
            if (buttonText && buttonText.length > 0) {
                console.log('🎯 CTA button clicked:', buttonText);
                
                // Use the existing CTA handler
                handleCTAButtonClick(clickedElement, buttonText);
                
                // Also mark any future message with this text as CTA-triggered
                setTimeout(() => {
                    const userBubbles = document.querySelectorAll('.user-bubble');
                    userBubbles.forEach(bubble => {
                        if (bubble.textContent.trim() === buttonText && !bubble.classList.contains('cta-triggered')) {
                            markUserMessageAsCTATriggered(bubble);
                        }
                    });
                }, 100); // Small delay to catch dynamically created messages
            }
        }
    }, true); // Use capture phase to catch events early
    
    console.log('✅ Universal button click handler initialized');
}

// Global function to manually trigger message state change (for use in chat interfaces)
window.markUserMessageAsSent = markUserMessageAsSent;
window.markUserMessageAsTyping = markUserMessageAsTyping;
window.markUserMessageAsCTATriggered = markUserMessageAsCTATriggered;

// Utility function to handle CTA button clicks - ensures they appear grey immediately
function handleCTAButtonClick(buttonElement, messageText) {
    console.log('🎯 CTA button clicked:', messageText);
    
    // Find or create the user message bubble
    let userBubble = buttonElement.closest('.user-bubble');
    
    if (!userBubble) {
        // If no existing bubble, this might be creating a new message
        // The mutation observer will catch it and mark it as CTA-triggered
        console.log('✅ New CTA message will be auto-detected by observer');
        return;
    }
    
    // Mark existing bubble as CTA-triggered immediately
    markUserMessageAsCTATriggered(userBubble);
    
    // Update the bubble content if provided
    if (messageText && userBubble.textContent !== messageText) {
        userBubble.textContent = messageText;
    }
    
    console.log('✅ CTA button handled - bubble should be grey');
}

// Make the utility function globally available
window.handleCTAButtonClick = handleCTAButtonClick;

// Test function for debugging user bubble colors
window.testUserBubbleColors = function() {
    console.log('🧪 Testing user bubble color logic...');
    
    const userBubbles = document.querySelectorAll('.user-bubble');
    console.log(`Found ${userBubbles.length} user bubbles`);
    
    userBubbles.forEach((bubble, index) => {
        console.log(`Bubble ${index + 1}:`, {
            element: bubble,
            classes: bubble.className,
            computedStyle: window.getComputedStyle(bubble).backgroundColor,
            hasSent: bubble.classList.contains('sent'),
            hasTyping: bubble.classList.contains('typing'),
            hasCTATriggered: bubble.classList.contains('cta-triggered')
        });
        
        // Toggle states for testing
        if (index % 3 === 0) {
            markUserMessageAsSent(bubble);
        } else if (index % 3 === 1) {
            markUserMessageAsTyping(bubble);
        } else {
            markUserMessageAsCTATriggered(bubble);
        }
    });
    
    console.log('✅ Test completed. Check bubble colors in the UI.');
};

// Test function for debugging button detection
window.testButtonDetection = function() {
    console.log('🧪 Testing button detection in chat interfaces...');
    
    const buttons = document.querySelectorAll('button');
    console.log(`Found ${buttons.length} total buttons`);
    
    buttons.forEach((button, index) => {
        const isInChatInterface = button.closest('.chat-interface') || 
                                button.closest('.chat-messages') || 
                                button.closest('.main-content-wrapper') ||
                                button.closest('.chat-container');
        
        if (isInChatInterface) {
            console.log(`Chat Button ${index + 1}:`, {
                element: button,
                text: button.textContent.trim(),
                classes: button.className,
                computedStyle: window.getComputedStyle(button).backgroundColor,
                parent: button.parentElement.className
            });
        }
    });
    
    console.log('✅ Button detection test completed.');
};

// Test function specifically for "Looks good" button
window.testLooksGoodButton = function() {
    console.log('🧪 Testing "Looks good" button functionality...');
    
    // Find all "Looks good" buttons
    const looksGoodButtons = document.querySelectorAll('button');
    const foundButtons = [];
    
    looksGoodButtons.forEach(button => {
        if (button.textContent.trim().toLowerCase().includes('looks good')) {
            foundButtons.push(button);
            console.log('Found "Looks good" button:', {
                element: button,
                text: button.textContent.trim(),
                classes: button.className,
                styles: {
                    background: window.getComputedStyle(button).backgroundColor,
                    border: window.getComputedStyle(button).border,
                    color: window.getComputedStyle(button).color
                }
            });
        }
    });
    
    // Find existing "Looks good" messages
    const looksGoodMessages = document.querySelectorAll('.user-bubble');
    looksGoodMessages.forEach(bubble => {
        if (bubble.textContent.trim().toLowerCase().includes('looks good')) {
            console.log('Found "Looks good" message bubble:', {
                element: bubble,
                text: bubble.textContent.trim(),
                classes: bubble.className,
                styles: {
                    background: window.getComputedStyle(bubble).backgroundColor,
                    color: window.getComputedStyle(bubble).color
                }
            });
        }
    });
    
    console.log(`✅ "Looks good" test completed. Found ${foundButtons.length} buttons.`);
};

// Export functions for potential use in other scripts
window.AiroPrototype = {
    navigateToPage,
    showNotification,
    navigateToPageWithLoading,
    smoothScrollTo,
    markUserMessageAsSent,
    markUserMessageAsTyping,
    markUserMessageAsCTATriggered,
    handleCTAButtonClick,
    testUserBubbleColors: window.testUserBubbleColors,
    testButtonDetection: window.testButtonDetection,
    testLooksGoodButton: window.testLooksGoodButton
};
