// src/types/Command.ts
import { Message } from 'discord.js-selfbot-v13';
import { CustomClient } from '../client/CustomClient';

export interface Command {
  name: string;
  description?: string;
  execute: (client: CustomClient, message: Message, args: string[]) => void;
}
