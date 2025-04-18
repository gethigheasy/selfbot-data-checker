import { Command } from '../types/Command';
import {
  GuildTextBasedChannel,
  Message,
  Permissions,
} from 'discord.js-selfbot-v13';

export const command: Command = {
  name: 'lastmsg',
  description: 'Busca última mensagem do usuário',
  async execute(client, message, args) {
    const targetId = args[0];

    if (!targetId) {
      message.channel.send('❌ Você precisa informar um ID de usuário.');
      return;
    }

    try {
      let found = false;

      for (const [_, guild] of client.guilds.cache) {
        const channels = guild.channels.cache.filter(
          (c) => c.type === 'GUILD_TEXT' 
        );

        for (const [_, channel] of channels) {
          if (
            !channel.viewable ||
            !channel.permissionsFor(client.user!)?.has([
              Permissions.FLAGS.VIEW_CHANNEL,
              Permissions.FLAGS.READ_MESSAGE_HISTORY,
            ])
          ) {
            continue; 
          }

          try {
            const messages = await (channel as GuildTextBasedChannel).messages.fetch({ limit: 50 });
            const userMsg = messages.find((msg: Message) => msg.author.id === targetId);
            if (userMsg) {
              await message.channel.send(
                `📨 Última mensagem de <@${targetId}> em **${guild.name} / #${channel.name}**:\n${userMsg.content}`
              );
              found = true;
              return;
            }
          } catch (err) {
            console.warn(`⚠️ Sem permissão ou erro ao buscar em ${channel.name} (${channel.id})`);
          }
        }
      }

      if (!found) {
        message.channel.send('❌ Nenhuma mensagem encontrada.');
      }

    } catch (error) {
      console.error('❌ Erro ao executar .lastmsg:', error);
      message.channel.send('❌ Ocorreu um erro ao buscar a mensagem.');
    }
  }
};
