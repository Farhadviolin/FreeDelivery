import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

export interface CartItem {
  id: string;
  restaurantId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers: {
    id: string;
    name: string;
    price: number;
  }[];
  specialInstructions?: string;
  allergens?: string[];
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  restaurantId: string | null;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

@Injectable()
export class CartService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async getCart(userId?: string, sessionId?: string): Promise<Cart | null> {
    const cartKey = this.getCartKey(userId, sessionId);
    const cartData = await this.redis.get(cartKey);
    
    if (!cartData) {
      return null;
    }

    try {
      const cart = JSON.parse(cartData);
      // Prüfe Ablaufzeit
      if (new Date(cart.expiresAt) < new Date()) {
        await this.clearCart(userId, sessionId);
        return null;
      }
      return cart;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return null;
    }
  }

  async createCart(userId?: string, sessionId?: string): Promise<Cart> {
    const cartId = this.generateCartId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 Stunden

    const cart: Cart = {
      id: cartId,
      userId,
      sessionId,
      restaurantId: null,
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      serviceFee: 0,
      tax: 0,
      total: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt
    };

    await this.saveCart(cart);
    return cart;
  }

  async addItem(
    item: Omit<CartItem, 'id'>, 
    userId?: string, 
    sessionId?: string
  ): Promise<Cart> {
    let cart = await this.getCart(userId, sessionId);
    
    if (!cart) {
      cart = await this.createCart(userId, sessionId);
    }

    // Prüfe Restaurant-Kompatibilität
    if (cart.restaurantId && cart.restaurantId !== item.restaurantId) {
      throw new Error('Items von verschiedenen Restaurants sind nicht erlaubt');
    }

    // Setze Restaurant-ID wenn noch nicht gesetzt
    if (!cart.restaurantId) {
      cart.restaurantId = item.restaurantId;
    }

    // Prüfe ob identisches Item bereits existiert
    const existingItemIndex = cart.items.findIndex(cartItem => 
      cartItem.menuItemId === item.menuItemId &&
      this.modifiersEqual(cartItem.modifiers, item.modifiers) &&
      cartItem.specialInstructions === item.specialInstructions
    );

    const newItem: CartItem = {
      ...item,
      id: this.generateItemId()
    };

    if (existingItemIndex >= 0) {
      // Erhöhe Anzahl des existierenden Items
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Füge neues Item hinzu
      cart.items.push(newItem);
    }

    return await this.updateCartTotals(cart);
  }

  async removeItem(itemId: string, userId?: string, sessionId?: string): Promise<Cart> {
    const cart = await this.getCart(userId, sessionId);
    if (!cart) {
      throw new Error('Warenkorb nicht gefunden');
    }

    cart.items = cart.items.filter(item => item.id !== itemId);

    // Leere Restaurant-ID wenn keine Items mehr vorhanden
    if (cart.items.length === 0) {
      cart.restaurantId = null;
    }

    return await this.updateCartTotals(cart);
  }

  async updateItemQuantity(
    itemId: string, 
    quantity: number, 
    userId?: string, 
    sessionId?: string
  ): Promise<Cart> {
    const cart = await this.getCart(userId, sessionId);
    if (!cart) {
      throw new Error('Warenkorb nicht gefunden');
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item nicht gefunden');
    }

    if (quantity <= 0) {
      // Entferne Item wenn Anzahl 0 oder negativ
      return await this.removeItem(itemId, userId, sessionId);
    }

    cart.items[itemIndex].quantity = quantity;
    return await this.updateCartTotals(cart);
  }

  async clearCart(userId?: string, sessionId?: string): Promise<void> {
    const cartKey = this.getCartKey(userId, sessionId);
    await this.redis.del(cartKey);
  }

  async mergeGuestCartToUser(guestSessionId: string, userId: string): Promise<Cart | null> {
    const guestCart = await this.getCart(undefined, guestSessionId);
    const userCart = await this.getCart(userId);

    if (!guestCart) {
      return userCart;
    }

    if (!userCart) {
      // Übertrage Guest-Cart zu User
      guestCart.userId = userId;
      guestCart.sessionId = undefined;
      await this.saveCart(guestCart);
      await this.clearCart(undefined, guestSessionId);
      return guestCart;
    }

    // Merge beide Carts wenn möglich
    if (guestCart.restaurantId === userCart.restaurantId || !userCart.restaurantId) {
      for (const guestItem of guestCart.items) {
        await this.addItem(guestItem, userId);
      }
      await this.clearCart(undefined, guestSessionId);
      return await this.getCart(userId);
    }

    // Wenn verschiedene Restaurants, behalte User-Cart
    await this.clearCart(undefined, guestSessionId);
    return userCart;
  }

  async getCartSummary(userId?: string, sessionId?: string) {
    const cart = await this.getCart(userId, sessionId);
    if (!cart) {
      return {
        itemCount: 0,
        total: 0,
        restaurantId: null
      };
    }

    return {
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      total: cart.total,
      restaurantId: cart.restaurantId
    };
  }

  private async updateCartTotals(cart: Cart): Promise<Cart> {
    // Berechne Subtotal
    cart.subtotal = cart.items.reduce((sum, item) => {
      const modifierPrice = item.modifiers.reduce((modSum, mod) => modSum + mod.price, 0);
      return sum + ((item.price + modifierPrice) * item.quantity);
    }, 0);

    // Berechne Gebühren (Beispiel-Logik)
    cart.deliveryFee = cart.subtotal > 20 ? 0 : 3.99; // Kostenlose Lieferung ab 20€
    cart.serviceFee = cart.subtotal * 0.1; // 10% Service-Gebühr
    cart.tax = cart.subtotal * 0.19; // 19% MwSt

    cart.total = cart.subtotal + cart.deliveryFee + cart.serviceFee + cart.tax;
    cart.updatedAt = new Date();

    await this.saveCart(cart);
    return cart;
  }

  private async saveCart(cart: Cart): Promise<void> {
    const cartKey = this.getCartKey(cart.userId, cart.sessionId);
    const ttl = Math.floor((new Date(cart.expiresAt).getTime() - Date.now()) / 1000);
    
    await this.redis.setex(cartKey, ttl, JSON.stringify(cart));
  }

  private getCartKey(userId?: string, sessionId?: string): string {
    if (userId) {
      return `cart:user:${userId}`;
    } else if (sessionId) {
      return `cart:session:${sessionId}`;
    }
    throw new Error('User ID oder Session ID erforderlich');
  }

  private generateCartId(): string {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private modifiersEqual(
    modifiers1: { id: string; name: string; price: number }[],
    modifiers2: { id: string; name: string; price: number }[]
  ): boolean {
    if (modifiers1.length !== modifiers2.length) {
      return false;
    }

    const sorted1 = modifiers1.sort((a, b) => a.id.localeCompare(b.id));
    const sorted2 = modifiers2.sort((a, b) => a.id.localeCompare(b.id));

    return sorted1.every((mod1, index) => {
      const mod2 = sorted2[index];
      return mod1.id === mod2.id && mod1.name === mod2.name && mod1.price === mod2.price;
    });
  }
}