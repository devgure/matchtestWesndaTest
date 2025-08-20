// backend/src/chat/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { chatId: string; text: string }) {
    this.server.to(payload.chatId).emit('newMessage', payload);
  }

  @SubscribeMessage('joinChat')
  handleJoin(client: Socket, chatId: string) {
    client.join(chatId);
  }
}