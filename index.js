#!/usr/bin/env node

// Definir timezone do Brasil logo no início
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
          name: "saudar",
          description: "Retorna uma saudação apropriada baseada no horário atual (bom dia, boa tarde ou boa noite)",
          inputSchema: {
            type: "object",
            properties: {
              nome: {
                type: "string",
                description: "Nome da pessoa para personalizar a saudação (opcional)",
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case "saudar":
          return await this.handleSaudar(request.params.arguments);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Ferramenta desconhecida: ${request.params.name}`
          );
      }
    });
  }

  async handleSaudar(args) {
    try {
      const nome = args?.nome || '';
      
      // Obter horário atual do Brasil (UTC-3)
      const agora = new Date();
      
      // Usar Intl.DateTimeFormat para garantir timezone correto
      const horaBrasil = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(agora);
      
      // Extrair apenas a hora para determinar saudação
      const horaNum = parseInt(horaBrasil.split(':')[0]);
      
      let saudacao;
      let emoji;
      
      if (horaNum >= 5 && horaNum < 12) {
        saudacao = 'Bom dia!';
        emoji = '🌅';
      } else if (horaNum >= 12 && horaNum < 18) {
        saudacao = 'Boa tarde!';
        emoji = '☀️';
      } else {
        saudacao = 'Boa noite!';
        emoji = '🌙';
      }
      
      const nomeTexto = nome ? ` ${nome}` : ' amigo';
      const mensagem = `${emoji} ${saudacao}${nomeTexto}! 🤝\n\nSão ${horaBrasil} agora. Espero que esteja tendo um ótimo momento!`;
      
      return {
        content: [
          {
            type: "text",
            text: mensagem,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Erro ao gerar saudação: ${error.message}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Servidor MCP Greeting iniciado com timezone Brasil 🇧🇷");
  }
}

const server = new GreetingServer();
server.run().catch(console.error);