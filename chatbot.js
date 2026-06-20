// HOTWIRE+ Interactive Floating Support Chatbot
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('chatbot-container');
  if (!container) return;

  // Build Chatbot HTML dynamically
  container.innerHTML = `
    <!-- Floating toggle button -->
    <button class="chatbot-toggle" id="chatbotToggle" onclick="toggleChatbot()">
      <i class="fa-solid fa-comments"></i>
    </button>

    <!-- Chatbot Window -->
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">H+</div>
          <div>
            <span class="chatbot-title">Hotwire+ Assistant</span>
            <div class="chatbot-status">
              <i class="fa-solid fa-circle" style="font-size:8px;"></i> Online & Ready
            </div>
          </div>
        </div>
        <button class="chatbot-close" onclick="toggleChatbot()">&times;</button>
      </div>

      <!-- Messages Area -->
      <div class="chatbot-messages" id="chatMessages">
        <div class="chat-message bot">
          Hello! 👋 Welcome to HOTWIRE+. I'm your virtual travel assistant. How can I help you secure the best travel deals today?
        </div>
      </div>

      <!-- Quick Replies -->
      <div class="chat-quick-replies" id="chatQuickReplies">
        <button class="quick-reply-btn" onclick="sendQuickReply('How do Hot Rates work?')">How do Hot Rates work?</button>
        <button class="quick-reply-btn" onclick="sendQuickReply('Can I get a refund?')">Can I get a refund?</button>
        <button class="quick-reply-btn" onclick="sendQuickReply('Talk to a human')">Talk to a human</button>
      </div>

      <!-- Input Area -->
      <form class="chatbot-input-area" onsubmit="handleChatSubmit(event)">
        <input type="text" class="chatbot-control chatbot-input" id="chatInput" placeholder="Ask about hotels, cars, or deals...">
        <button type="submit" class="chatbot-send">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  `;
});

// Toggle visibility
function toggleChatbot() {
  const windowEl = document.getElementById('chatbotWindow');
  if (windowEl) {
    windowEl.classList.toggle('active');
    
    // Scroll to bottom on open
    if (windowEl.classList.contains('active')) {
      const msgs = document.getElementById('chatMessages');
      msgs.scrollTop = msgs.scrollHeight;
    }
  }
}

// Append new message
function appendMessage(text, sender) {
  const msgsContainer = document.getElementById('chatMessages');
  if (!msgsContainer) return;

  const msgEl = document.createElement('div');
  msgEl.className = `chat-message ${sender}`;
  msgEl.textContent = text;
  msgsContainer.appendChild(msgEl);
  
  // Auto scroll to bottom
  msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

// Quick reply click
function sendQuickReply(text) {
  appendMessage(text, 'user');

  // Simulated bot thinking delay
  setTimeout(() => {
    let reply = "";
    if (text.includes('Hot Rates')) {
      reply = "Hot Rate deals are extra-discounted rates (up to 60% off) where the exact name of the hotel or car rental company is kept secret until after you book. The room class, dates, and amenities are fully guaranteed!";
    } else if (text.includes('refund')) {
      reply = "Because Hot Rates offer premium, unpublished discounts, they are non-refundable, non-changeable, and non-cancelable. For standard bookings, cancellations are governed by the specific hotel's policy.";
    } else if (text.includes('human')) {
      reply = "Connecting you to a live booking agent... 🎧 All agents are currently helping other travelers. You are number 1 in line. Let me continue helping you in the meantime!";
    } else {
      reply = "I understand you need help with that. Could you please provide your 8-digit reservation number or booking email so I can look up the details?";
    }
    appendMessage(reply, 'bot');
  }, 800);
}

// Text form submission
function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    let reply = "";
    const lowercase = text.toLowerCase();
    
    if (lowercase.includes('hotel') || lowercase.includes('stay') || lowercase.includes('kyoto')) {
      reply = "Kyoto is one of our most popular destinations! We currently have a 4-Star Hot Rate stay starting at just $89/night, or 5-Star luxury resorts starting at $249/night. Which type of stay do you prefer?";
    } else if (lowercase.includes('car') || lowercase.includes('rent') || lowercase.includes('ride')) {
      reply = "We offer premium SUVs, hybrid sedans, and luxury electric vehicles in Kyoto. Hot Rate car rentals start as low as $34/day. Let me know if you would like assistance selecting a rental package!";
    } else if (lowercase.includes('hello') || lowercase.includes('hi ')) {
      reply = "Hello! Tell me, are you planning a hotel stay, a car rental, or looking for general support?";
    } else {
      reply = "Thank you for that. I am searching our help documents for your query. In the meantime, you can review our Support page (support.html) or FAQ guidelines.";
    }
    appendMessage(reply, 'bot');
  }, 1000);
}
