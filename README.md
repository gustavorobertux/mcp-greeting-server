# 🌍 MCP Greeting Server

A Model Context Protocol (MCP) server that provides intelligent, time-aware greetings in multiple languages and timezones.

## ✨ Features

- 🕐 **Time-aware greetings** - Automatically says good morning, afternoon, or evening based on current time
- 🌍 **Multi-language support** - English, Portuguese, Spanish, and French
- 🌎 **Timezone flexibility** - Works with any timezone (defaults to Brazil/São Paulo)
- 👤 **Personalization** - Optional name parameter for personalized greetings
- 🎯 **MCP Compatible** - Ready to use with Claude and other MCP clients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gustavorobertux/mcp-greeting-server.git
cd mcp-greeting-server

# Install dependencies
npm install

# Start the server
npm start
```

### MCP Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "greeting": {
      "command": "node",
      "args": ["/path/to/mcp-greeting-server/index.js"]
    }
  }
}
```

## 📖 Usage

### Basic Greeting

```javascript
// Simple greeting (uses defaults: English, current timezone)
greet()
// Output: "🌅 Good morning! friend! 🤝\n\nIt's 09:30 now. Hope you're having a great time!"
```

### Personalized Greeting

```javascript
// With name
greet({ name: "Alice" })
// Output: "☀️ Good afternoon! Alice! 🤝\n\nIt's 14:30 now. Hope you're having a great time!"
```

### Multi-language Support

```javascript
// Portuguese
greet({ name: "João", language: "pt" })
// Output: "🌅 Bom dia! João! 🤝\n\nSão 09:30 agora. Espero que esteja tendo um ótimo momento!"

// Spanish
greet({ name: "María", language: "es" })
// Output: "🌙 ¡Buenas noches! María! 🤝\n\nSon las 21:30 ahora. ¡Espero que estés teniendo un gran momento!"

// French
greet({ name: "Pierre", language: "fr" })
// Output: "☀️ Bon après-midi! Pierre! 🤝\n\nIl est 15:30 maintenant. J'espère que vous passez un bon moment!"
```

### Different Timezones

```javascript
// New York time
greet({ timezone: "America/New_York" })

// London time
greet({ timezone: "Europe/London" })

// Tokyo time
greet({ timezone: "Asia/Tokyo" })
```

## ⚙️ API Reference

### Tool: `greet`

**Description:** Returns an appropriate greeting based on the current time

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | string | No | - | Person's name for personalization |
| `timezone` | string | No | `America/Sao_Paulo` | Timezone for the greeting |
| `language` | string | No | `en` | Language code (`en`, `pt`, `es`, `fr`) |

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🌅 Good morning! Alice! 🤝\n\nIt's 09:30 now. Hope you're having a great time!"
    }
  ]
}
```

## 🌐 Supported Languages

| Language | Code | Example |
|----------|------|---------|
| English | `en` | "Good morning! friend!" |
| Portuguese | `pt` | "Bom dia! amigo!" |
| Spanish | `es` | "¡Buenos días! amigo!" |
| French | `fr` | "Bonjour! ami!" |

## 🕐 Time Periods

| Time Range | Greeting Type | Emoji |
|------------|---------------|-------|
| 05:00 - 11:59 | Morning | 🌅 |
| 12:00 - 17:59 | Afternoon | ☀️ |
| 18:00 - 04:59 | Evening/Night | 🌙 |

## 🛠️ Development

### Project Structure

```
mcp-greeting-server/
├── index.js          # Main server file
├── package.json       # Dependencies and scripts
├── README.md          # This file
└── .gitignore        # Git ignore rules
```

### Running in Development

```bash
# Install dependencies
npm install

# Start the server
node index.js

# Or with npm script
npm start
```

### Testing

```bash
# Test the greeting function
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Languages

To add support for a new language:

1. Add the language to the `greetings` object in `handleGreet` method
2. Include translations for: `morning`, `afternoon`, `evening`, `friend`, `timeText`, `hopeText`
3. Update the README.md supported languages table
4. Add the language code to the schema enum

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk)
- Inspired by the need for international, time-aware greetings
- Perfect for Claude integrations and other MCP clients

## 📞 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/gustavorobertux/mcp-greeting-server/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/gustavorobertux/mcp-greeting-server/discussions)
- 📧 **Email:** gustavorobertux@gmail.com

---

Made with ❤️ for the MCP community
