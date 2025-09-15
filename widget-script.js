// Widget State Management
let isOpen = false;
let hasNewMessage = false;
let previewShown = false;
// conversationHistory is already declared in config.js, so don't redeclare it

// Initialize widget when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize RAG System first
    console.log('Initializing Aao Seekhe RAG system...');
    await aaoseekheRAG.loadKnowledgeBase();
    
    initializeWidget();
    
    // Show preview message after 3 seconds
    setTimeout(() => {
        showPreviewMessage();
    }, 3000);
});

function initializeWidget() {
    // Event listeners
    document.getElementById('chatToggle').addEventListener('click', toggleChat);
    document.getElementById('chatClose').addEventListener('click', closeChat);
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    
    // Preview message event listeners
    const previewMessage = document.getElementById('previewMessage');
    const previewClose = document.getElementById('previewClose');
    
    if (previewMessage && previewClose) {
        previewMessage.addEventListener('click', openChatFromPreview);
        previewClose.addEventListener('click', hidePreviewMessage);
    }
    
    // Input handling
    const chatInput = document.getElementById('chatInput');
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 60) + 'px';
    });
}

// Preview Message Functions
function showPreviewMessage() {
    if (previewShown || isOpen) return; // Don't show if already shown or chat is open
    
    const previewMessage = document.getElementById('previewMessage');
    const chatToggle = document.getElementById('chatToggle');
    
    if (previewMessage) {
        previewMessage.classList.add('show');
        chatToggle.classList.add('with-preview');
        previewShown = true;
        
        // Auto-hide preview after 10 seconds
        setTimeout(() => {
            if (!isOpen && previewShown) {
                hidePreviewMessage();
            }
        }, 10000);
    }
}

function hidePreviewMessage(event) {
    if (event) {
        event.stopPropagation(); // Prevent opening chat when closing preview
    }
    
    const previewMessage = document.getElementById('previewMessage');
    const chatToggle = document.getElementById('chatToggle');
    
    if (previewMessage) {
        previewMessage.classList.remove('show');
        chatToggle.classList.remove('with-preview');
        previewShown = false;
    }
}

function openChatFromPreview(event) {
    // Prevent the close button from triggering this
    if (event.target.classList.contains('preview-close')) {
        return;
    }
    
    hidePreviewMessage();
    toggleChat();
}

// Widget Toggle Functionality
function toggleChat() {
    isOpen = !isOpen;
    const container = document.getElementById('chatContainer');
    const toggle = document.getElementById('chatToggle');
    const icon = document.getElementById('toggleIcon');
    const badge = document.getElementById('notificationBadge');

    if (isOpen) {
        container.classList.add('open');
        toggle.classList.add('open');
        icon.textContent = '×';
        badge.style.display = 'none';
        hasNewMessage = false;
        
        // Hide preview when opening chat
        hidePreviewMessage();
        
        // Focus input when opened
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    } else {
        closeChat();
    }
}

function closeChat() {
    isOpen = false;
    const container = document.getElementById('chatContainer');
    const toggle = document.getElementById('chatToggle');
    const icon = document.getElementById('toggleIcon');

    container.classList.remove('open');
    toggle.classList.remove('open');
    icon.textContent = '💬';
}

// Message Handling
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'bot' ? '🎓' : '👤';
    
    // Format bot messages
    let formattedMessage = message;
    if (sender === 'bot') {
        formattedMessage = formatBotMessage(message);
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${formattedMessage}</div>
    `;
    
    // Insert before typing indicator
    messagesContainer.insertBefore(messageDiv, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Show notification if widget is closed and it's a bot message
    if (!isOpen && sender === 'bot') {
        showNotification();
    }
}

function formatBotMessage(message) {
    // Format bold text
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format bullet points
    message = message.replace(/\* (.*)/g, '<div class="bullet-point">• $1</div>');
    
    // Format numbered lists
    message = message.replace(/(\d+)\. (.*)/g, '<div class="numbered-point">$1. $2</div>');
    
    // Add line breaks
    message = message.replace(/\n\n/g, '<br><br>');
    message = message.replace(/\n/g, '<br>');
    
    return message;
}

function showNotification() {
    const badge = document.getElementById('notificationBadge');
    badge.style.display = 'flex';
    hasNewMessage = true;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'flex';
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

// Main message sending function
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    showTypingIndicator();
    
    try {
        const response = await getResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        hideTypingIndicator();
        console.error('Error getting response:', error);
        addMessage("I'm having trouble right now. Please call us at +91 7307 870 773 for immediate assistance!", 'bot');
    }
}

async function sendQuickMessage(message) {
    addMessage(message, 'user');
    showTypingIndicator();
    
    try {
        const response = await getResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        hideTypingIndicator();
        console.error('Error getting response:', error);
        addMessage("I'm having trouble right now. Please call us at +91 7307 870 773!", 'bot');
    }
}

// Response generation - integrates with your existing system
async function getResponse(message) {
    console.log('=== DEBUG INFO ===');
    console.log('getGeminiResponse available:', typeof getGeminiResponse);
    console.log('GEMINI_API_KEY:', GEMINI_API_KEY ? 'EXISTS' : 'MISSING');
    console.log('aaoseekheRAG loaded:', aaoseekheRAG.isLoaded);
    
    if (typeof getGeminiResponse === 'function') {
        console.log('Using Gemini API');
        return await getGeminiResponse(message);
    }
    
    console.log('Using fallback responses');
    return getFallbackResponse(message);
}

// Add the getGeminiResponse function that's missing
async function getGeminiResponse(userMessage) {
    // Check if API key is set
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.log('Using fallback responses - API key not configured');
        return getFallbackResponse(userMessage);
    }

    try {
        // RAG STEP 1: Retrieve relevant information
        console.log('Retrieving relevant info for:', userMessage.substring(0, 50) + '...');
        const retrievedInfo = aaoseekheRAG.retrieveRelevantInfo(userMessage);
        
        // RAG STEP 2: Format context for AI
        const contextString = aaoseekheRAG.formatContextForPrompt(retrievedInfo);
        console.log('Context ready, confidence:', (retrievedInfo.confidence * 100).toFixed(0) + '%');
        
        // RAG STEP 3: Enhance user message with context
        const enhancedMessage = contextString + '\n\nUser Question: ' + userMessage;

        // Add enhanced message to conversation history
        conversationHistory.push({
            role: "user",
            parts: [{ text: enhancedMessage }]
        });

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: conversationHistory.slice(-6),
                generationConfig: API_CONFIG
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        // Add bot response to conversation history
        conversationHistory.push({
            role: "model",
            parts: [{ text: botResponse }]
        });

        // Limit conversation history
        if (conversationHistory.length > 12) {
            conversationHistory = conversationHistory.slice(-10);
        }

        console.log('RAG-enhanced response generated');
        return botResponse;

    } catch (error) {
        console.error('Error calling Gemini API with RAG:', error);
        return getFallbackResponse(userMessage);
    }
}

// Fallback response system (copy from your main chatbot)
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Handle questions about AI training/creation
    if (lowerMessage.includes('trained') || lowerMessage.includes('created') || lowerMessage.includes('made') || lowerMessage.includes('built') || lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
        return `I was specifically designed and trained by the AaoSeekhe team to be their dedicated education assistant.

I'm here to help you with:
* GMAT, GRE, SAT, IELTS preparation
* Study abroad consultation
* Course information and enrollment

What would you like to know about our programs?

**Contact AaoSeekhe:**
📞 +91 7307 870 773
📧 info@aaoseekhe.com`;
    }

    // Handle connection questions
    if (lowerMessage.includes('connect') || lowerMessage.includes('how will you connect') || lowerMessage.includes('callback') || lowerMessage.includes('call me') || lowerMessage.includes('reach')) {
        return `**Direct Contact Information** 📞

**📞 Call Our Counselors Now:**
* Primary: +91 7307 870 773
* Secondary: +91 9005252364

**📧 Email:** info@aaoseekhe.com

**🏢 Visit Our Office:**
205 Regency Plaza, Park Road 5, Hazratganj, Lucknow-226001

**🕐 Office Hours:** 
Tuesday to Sunday: 11:00 AM - 8:00 PM
(Closed Mondays)

**No waiting needed - you can reach our counselors directly during office hours!**

Ask for Satish Anand (Founder, 23+ years experience) when you call!`;
    }
    
    // Handle "yes" responses  
    if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('okay') || lowerMessage.includes('ok')) {
        return `**Perfect! Here's how to reach our counselors directly:** 📞

**📞 Call Now for Immediate Help:**
* +91 7307 870 773 
* +91 9005252364

**📧 Email:** info@aaoseekhe.com

**🏢 Office Location:**
205 Regency Plaza, Park Road 5, Hazratganj, Lucknow-226001

**Office Hours:** Tue-Sun: 11:00 AM - 8:00 PM

**What to Ask:** Course details, pricing, batch timings, and enrollment process.

**Ready to call them now?**`;
    }
    
    // Course-specific responses
    if (lowerMessage.includes('gmat')) {
        return `**GMAT Coaching at AaoSeekhe** 📚

* **Course Format:** Online & offline classes in Lucknow
* **Coverage:** All sections with expert mentorship  
* **Practice:** Regular mock tests & video recordings
* **Flexibility:** Multiple batch timings available

**Quick Questions:**
1. What's your target GMAT score?
2. Prefer online or offline classes?

**Ready to get started?** 📞
Call: +91 7307 870 773 or +91 9005252364`;
    } 
    
    if (lowerMessage.includes('gre')) {
        return `**GRE Preparation Program** 🎓

* **Comprehensive Coverage:** All sections included
* **Study Material:** Structured curriculum & practice tests
* **Format Options:** Classroom and online formats
* **Expert Guidance:** Experienced faculty support

**Let's Get Started:**
* Target score goal?
* Preferred timeline?

**Ready to schedule a consultation?**
Call: +91 7307 870 773`;
    } 
    
    if (lowerMessage.includes('ielts')) {
        return `**IELTS Preparation Program** 🎤

**4 Skills Covered:**
* **Reading:** Comprehension strategies
* **Writing:** Task 1 & 2 techniques  
* **Listening:** Practice with feedback
* **Speaking:** Mock interviews & tips

**What We Provide:**
* Personalized feedback sessions
* Regular band score assessments
* Expert guidance throughout

**Target band score? Let's create your study plan!**
Call: +91 7307 870 773`;
    } 
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('number')) {
        return `**Contact AaoSeekhe** 📞

**📞 Phone:** +91 7307 870 773, +91 9005252364
**📧 Email:** info@aaoseekhe.com
**🏢 Address:** 205 Regency Plaza, Hazratganj, Lucknow-226001
**🕐 Hours:** Tue-Sun 11AM-8PM

**Call now for free consultation!**`;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('fee') || lowerMessage.includes('cost')) {
        return `**For exact pricing details:** 📞

**📞 Call:** +91 7307 870 773 or +91 9005252364
**📧 Email:** info@aaoseekhe.com
**🏢 Office:** 205 Regency Plaza, Hazratganj, Lucknow-226001
**🕐 Hours:** Tue-Sun 11:00 AM - 8:00 PM

**Our counselors will discuss personalized pricing based on your needs.**`;
    }
    
    // Casual greetings
    if (lowerMessage.includes('how are you') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return `Hello! I'm doing great and ready to help you with your study abroad goals at AaoSeekhe.

We offer test preparation for GMAT, GRE, IELTS, and SAT, plus complete study abroad consultation.

What would you like to know about?`;
    }

    // Handle study abroad questions
    if (lowerMessage.includes('study in') || lowerMessage.includes('study abroad') || lowerMessage.includes('university in') || lowerMessage.includes('college in')) {
        return `**Study Abroad Consultation** 🌍

Great question about studying abroad! AaoSeekhe provides comprehensive study abroad consultation services including:

* **University Selection** - Best-fit institutions worldwide
* **Profile Building** - Strengthen your application  
* **Application Guidance** - Complete application support
* **Visa Assistance** - Guidance through visa process

**Countries We Help With:**
Our counselors have experience with universities in various countries including the US, UK, Canada, Australia, and many others.

**Get Personalized Guidance:**
📞 **Call:** +91 7307 870 773 or +91 9005252364
📧 **Email:** info@aaoseekhe.com
🏢 **Visit:** 205 Regency Plaza, Hazratganj, Lucknow

**Our expert counselors can discuss specific countries, requirements, and opportunities based on your profile.**

Ready to explore your study abroad options?`;
    }
    
    // Default response
    return `Thanks for your question! For detailed information about our test prep courses (GMAT, GRE, IELTS, SAT) and study abroad consultation:

**📞 Call:** +91 7307 870 773
**📧 Email:** info@aaoseekhe.com
**🏢 Visit:** 205 Regency Plaza, Hazratganj, Lucknow

Our counselors are ready to help you achieve your study abroad dreams!`;
}

// Utility functions
function simulateThinking(delay = 1500) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Widget analytics (optional)
function trackWidgetEvent(event, data = {}) {
    // Add your analytics tracking here
    console.log('Widget Event:', event, data);
}