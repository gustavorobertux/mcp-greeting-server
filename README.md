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

## 🔧 Claude Configuration

### Method 1: Claude Desktop App

1. **Install Claude Desktop** from [Claude.ai](https://claude.ai/download)

2. **Locate the configuration file:**
   ```bash
   # Windows
   %APPDATA%\Claude\claude_desktop_config.json
   
   # macOS
   ~/Library/Application Support/Claude/claude_desktop_config.json
   
   # Linux
   ~/.config/Claude/claude_desktop_config.json
   ```

3. **Add the MCP server configuration:**
   ```json
   {
     "mcpServers": {
       "greeting": {
         "command": "node",
         "args": ["/full/path/to/mcp-greeting-server/index.js"]
       }
     }
   }
   ```

4. **Restart Claude Desktop** and you'll see the greeting tool available!

### Method 2: Claude Web/API with MCP Client

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Connect to the greeting server
const transport = new StdioClientTransport({
  command: "node",
  args: ["/path/to/mcp-greeting-server/index.js"]
});

const client = new Client({
  name: "greeting-client",
  version: "1.0.0"
}, {
  capabilities: {}
});

await client.connect(transport);

// Use the greeting tool
const result = await client.request({
  method: "tools/call",
  params: {
    name: "greet",
    arguments: {
      name: "Alice",
      language: "en"
    }
  }
});

console.log(result.content[0].text);
```

### Method 3: NPX (Quick Test)

```bash
# Run directly with npx (after publishing to npm)
npx mcp-greeting-server

# Or clone and run locally
git clone https://github.com/gustavorobertux/mcp-greeting-server.git
cd mcp-greeting-server
npm install
npm start
```

### Troubleshooting

**Issue:** Claude Desktop doesn't show the greeting tool
- ✅ Check file path is absolute
- ✅ Verify Node.js is in PATH
- ✅ Restart Claude Desktop completely
- ✅ Check Claude Desktop logs for errors

**Issue:** Permission denied
```bash
# Make the script executable (Linux/macOS)
chmod +x index.js

# Or run with node explicitly
"command": "node"
```

**Issue:** Module not found
```bash
# Install dependencies in the project folder
cd /path/to/mcp-greeting-server
npm install
```

### MCP Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "greeting": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-greeting-server/index.js"]
    }
  }
}
```

### 🧪 Testing with Claude

Once configured, you can test in Claude:

```
Hey Claude, can you greet me?
```

Claude will use the `greet` tool and respond with a time-appropriate greeting!

```
Hey Claude, greet me in Portuguese with my name "João"
```

Claude will call: `greet({ name: "João", language: "pt" })`

## 📖 Usage

### With Claude

Once configured with Claude, simply ask for greetings naturally:

```
User: "Hey Claude, can you greet me?"
Claude: Uses greet() → "🌅 Good morning! friend! 🤝 It's 09:30 now. Hope you're having a great time!"

User: "Greet me in Portuguese as João"  
Claude: Uses greet({name: "João", language: "pt"}) → "☀️ Boa tarde! João! 🤝 São 14:30 agora. Espero que esteja tendo um ótimo momento!"
```

### Direct API Usage

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
