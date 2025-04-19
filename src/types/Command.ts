import { Message } from 'discord.js-selfbot-v13';
import { CustomClient } from '#client';

export interface Command {
  name: string;
  description?: string;
  execute: (client: CustomClient, message: Message, args: string[]) => void;
}
