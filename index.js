#!/usr/bin/env node

// Set Brazil timezone at startup
process.env.TZ = 'America/Sao_Paulo';

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

class GreetingServer {
  constructor() {
    this.server = new Server(
      {
        name: "greeting-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "greet",
          description: "Returns an appropriate greeting based on the current time (good morning, good afternoon, or good evening)",
          inputSchema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Person's name to personalize the greeting (optional)",
              },
              timezone: {
                type: "string",
                description: "Timezone for the greeting (defaults to America/Sao_Paulo)",
                default: "America/Sao_Paulo"
              },
              language: {
                type: "string",
                description: "Language for the greeting (en, pt, es, fr)",
                enum: ["en", "pt", "es", "fr"],
                default: "en"
              }
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case "greet":
          return await this.handleGreet(request.params.arguments);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  getLocalizedGreeting(hour, language = 'en') {
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
      },
      es: {
        morning: { text: '¡Buenos días!', emoji: '🌅' },
        afternoon: { text: '¡Buenas tardes!', emoji: '☀️' },
        evening: { text: '¡Buenas noches!', emoji: '🌙' },
        friend: 'amigo',
        timeText: 'Son las',
        hopeText: '¡Espero que estés teniendo un gran momento!'
      },
      fr: {
        morning: { text: 'Bonjour!', emoji: '🌅' },
        afternoon: { text: 'Bon après-midi!', emoji: '☀️' },
        evening: { text: 'Bonsoir!', emoji: '🌙' },
        friend: 'ami',
        timeText: 'Il est',
        hopeText: 'J\'espère que vous passez un bon moment!'
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

    return { ...greeting, ...lang };
  }

  async handleGreet(args) {
    try {
      const name = args?.name || '';
      const timezone = args?.timezone || 'America/Sao_Paulo';
      const language = args?.language || 'en';
      
      // Get current time in specified timezone
      const now = new Date();
      
      // Use Intl.DateTimeFormat to ensure correct timezone
      const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      
      // Extract hour to determine greeting type
      const hour = parseInt(localTime.split(':')[0]);
      
      const greetingData = this.getLocalizedGreeting(hour, language);
      
      const nameText = name ? ` ${name}` : ` ${greetingData.friend}`;
      const message = `${greetingData.emoji} ${greetingData.text}${nameText}! 🤝\n\n${greetingData.timeText} ${localTime} now. ${greetingData.hopeText}`;
      
      return {
        content: [
          {
            type: "text",
            text: message,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Error generating greeting: ${error.message}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Greeting Server started 🌍 - Author: Gustavo Roberto");
  }
}

const server = new GreetingServer();
server.run().catch(console.error);
