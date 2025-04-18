import { Message } from 'discord.js-selfbot-v13';
import { CustomClient } from '#client';

export const name = 'messageCreate';

export async function execute(client: CustomClient, message: Message): Promise<void> {
  try {
    const PREFIX = process.env.PREFIX;
    const OWNER_ID = process.env.OWNER_ID;

    if (!PREFIX || !OWNER_ID) {
      console.error('❌ PREFIX ou OWNER_ID não definidos no .env');
      return;
    }

    if (
      message.author.id !== OWNER_ID ||
      !message.content.startsWith(PREFIX)
    ) return;

    const args: string[] = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) {
      console.log(`❌ Comando "${commandName}" não encontrado.`);
      return;
    }

    console.log(`✅ Executando comando: ${commandName}`);
    await command.execute(client, message, args);

  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
  }
} 