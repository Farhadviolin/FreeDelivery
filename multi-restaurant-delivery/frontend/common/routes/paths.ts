export const Paths = {
  Home: '/',
  Menu: '/menu',
  Checkout: '/checkout',
  Admin: '/admin',
  AdminRestaurants: '/admin/restaurants',
  AdminOrders: '/admin/orders',
  DriverWeb: '/driver',
  DriverHome: '/driver/home',
  DriverOrder: (id: string) => `/driver/order/${id}`,
  login: '/login',
};
