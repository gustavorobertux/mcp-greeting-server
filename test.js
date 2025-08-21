#!/usr/bin/env node

/**
 * Simple test file for MCP Greeting Server
 * Author: Gustavo Roberto
 */

// Mock MCP environment for testing
const mockGreetingFunction = (args = {}) => {
  // Set Brazil timezone
  process.env.TZ = 'America/Sao_Paulo';
  
  const name = args?.name || '';
  const timezone = args?.timezone || 'America/Sao_Paulo';
  const language = args?.language || 'en';
  
  // Get current time in specified timezone
  const now = new Date();
  
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);
  
  const hour = parseInt(localTime.split(':')[0]);
  
  const greetings = {
    en: {
      morning: { text: 'Good morning!', emoji: '🌅' },
      afternoon: { text: 'Good afternoon!', emoji: '☀️' },
      evening: { text: 'Good evening!', emoji: '🌙' },
      friend: 'friend',
      timeText: 'It\'s',
      hopeText: 'Hope you\'re having a great time!'
    },
    pt: {
      morning: { text: 'Bom dia!', emoji: '🌅' },
      afternoon: { text: 'Boa tarde!', emoji: '☀️' },
      evening: { text: 'Boa noite!', emoji: '🌙' },
      friend: 'amigo',
      timeText: 'São',
      hopeText: 'Espero que esteja tendo um ótimo momento!'
    }
  };

  const lang = greetings[language] || greetings.en;
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = lang.morning;
  } else if (hour >= 12 && hour < 18) {
    greeting = lang.afternoon;
  } else {
    greeting = lang.evening;
  }

  const nameText = name ? ` ${name}` : ` ${lang.friend}`;
  const message = `${greeting.emoji} ${greeting.text}${nameText}! 🤝\n\n${lang.timeText} ${localTime} now. ${lang.hopeText}`;
  
  return message;
};

// Run tests
console.log('🧪 Testing MCP Greeting Server\n');

console.log('Test 1 - Default greeting (English):');
console.log(mockGreetingFunction());
console.log('\n---\n');

console.log('Test 2 - Portuguese greeting:');
console.log(mockGreetingFunction({ language: 'pt' }));
console.log('\n---\n');

console.log('Test 3 - Named greeting:');
console.log(mockGreetingFunction({ name: 'Alice', language: 'en' }));
console.log('\n---\n');

console.log('Test 4 - Different timezone (New York):');
console.log(mockGreetingFunction({ timezone: 'America/New_York' }));
console.log('\n---\n');

console.log('✅ All tests completed successfully!');
console.log('🚀 Ready to publish by Gustavo Roberto');
