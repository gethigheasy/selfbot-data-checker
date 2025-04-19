import { CustomClient } from '#client';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync, statSync, readdirSync } from 'fs';
import type { Command } from '#types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function* walk(dir: string, exts: string[] = []): AsyncGenerator<{ path: string }> {
  for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* walk(res, exts);
    } else if (exts.includes(path.extname(res))) {
      yield { path: res };
    }
  }
}

export async function loadCommands(client: CustomClient) {
  const targetDir = path.join(__dirname, '../commands');

  if (!existsSync(targetDir) || !statSync(targetDir).isDirectory()) {
    console.warn(`[WARN] Diretório "${targetDir}" não existe.`);
    return;
  }

  for await (const entry of walk(targetDir, ['.ts', '.js'])) {
    const filePath = entry.path;
    const absolutePath = pathToFileURL(filePath).href;

    try {
      const commandModule = await import(absolutePath);
      const command: Command = commandModule.command;

      if (!command?.name || typeof command.execute !== 'function') {
        console.warn(`[WARN] Comando inválido: ${filePath}`);
        continue;
      }

      client.commands.set(command.name, command);
      console.log(`✅ Comando registrado: ${command.name}`);
    } catch (error) {
      console.error(`❌ Erro ao carregar comando "${filePath}":`, error);
    }
  }
}

export async function loadEvents(client: CustomClient) {
  const eventsPath = path.join(__dirname, '../events');

  if (!existsSync(eventsPath) || !statSync(eventsPath).isDirectory()) {
    console.warn(`[WARN] Diretório "${eventsPath}" não existe.`);
    return;
  }

  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const absolutePath = pathToFileURL(filePath).href;

    try {
      const eventModule = await import(absolutePath);
      const event = eventModule;

      if (!event.name || typeof event.execute !== 'function') {
        console.warn(`[WARN] Evento inválido: ${file}`);
        continue;
      }

      client.on(event.name, (...args) => event.execute(client, ...args));
      console.log(`✅ Evento registrado: ${event.name}`);
    } catch (error) {
      console.error(`❌ Erro ao carregar evento "${file}":`, error);
    }
  }
}
