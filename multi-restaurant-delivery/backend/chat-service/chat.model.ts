import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatMessage extends Document {
  @Prop({ required: true })
  conversationId: string;
  @Prop({ required: true })
  from: string;
  @Prop({ required: true })
  to: string;
  @Prop({ required: true })
  msg: string;
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
