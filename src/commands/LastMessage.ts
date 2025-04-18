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
              const member = guild.members.cache.get(targetId);
              const status = member?.presence?.status || 'offline';
              const statusEmoji = {
                online: '🟢',
                idle: '🌙',
                dnd: '🔴',
                offline: '⚫',
                invisible: '⚫'
              }[status];

              let embed = `📨 **Última mensagem de <@${targetId}>**\n\n`;
              embed += `**Servidor:** ${guild.name}\n`;
              embed += `**Canal:** #${channel.name}\n`;
              embed += `**Status:** ${statusEmoji} ${status}\n`;
              embed += `**Hora:** <t:${Math.floor(userMsg.createdTimestamp / 1000)}:F>\n`;
              embed += `**Conteúdo:**\n${userMsg.content || '[Sem texto]'}\n\n`;
              embed += `🔗 [Pular para mensagem](${userMsg.url})`;

              await message.channel.send(embed);
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
