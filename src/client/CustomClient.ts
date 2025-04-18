// src/client/CustomClient.ts
import { Client, Collection } from 'discord.js-selfbot-v13';
import { Command } from '../types/Command';

export class CustomClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super();
    this.commands = new Collection();
  }
}
