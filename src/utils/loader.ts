import { CustomClient } from '../client/CustomClient';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function loadCommands(client: CustomClient): Promise<void> {
  const commandsPath = join(__dirname, '..', 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath).command;
    client.commands.set(command.name, command);
    console.log(`✅ Comando carregado: ${command.name}`);
  }
}

export async function loadEvents(client: CustomClient): Promise<void> {
  const eventsPath = join(__dirname, '..', 'events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const { name, execute } = require(filePath);
    client.on(name, (...args) => execute(client, ...args));
    console.log(`✅ Evento carregado: ${name}`);
  }
}
