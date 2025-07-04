import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { CartService, CartItem } from './cart.service';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: Request) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    return await this.cartService.getCart(userId, sessionId);
  }

  @Get('summary')
  async getCartSummary(@Req() req: Request) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    return await this.cartService.getCartSummary(userId, sessionId);
  }

  @Post('items')
  async addItem(
    @Body() item: Omit<CartItem, 'id'>,
    @Req() req: Request
  ) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    return await this.cartService.addItem(item, userId, sessionId);
  }

  @Put('items/:itemId')
  async updateItemQuantity(
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
    @Req() req: Request
  ) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    return await this.cartService.updateItemQuantity(itemId, quantity, userId, sessionId);
  }

  @Delete('items/:itemId')
  async removeItem(
    @Param('itemId') itemId: string,
    @Req() req: Request
  ) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    return await this.cartService.removeItem(itemId, userId, sessionId);
  }

  @Delete()
  async clearCart(@Req() req: Request) {
    const userId = req.user?.id;
    const sessionId = req.sessionID;
    
    await this.cartService.clearCart(userId, sessionId);
    return { success: true };
  }

  @Post('merge')
  async mergeGuestCart(
    @Body('guestSessionId') guestSessionId: string,
    @Req() req: Request
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User muss angemeldet sein');
    }
    
    return await this.cartService.mergeGuestCartToUser(guestSessionId, userId);
  }
}