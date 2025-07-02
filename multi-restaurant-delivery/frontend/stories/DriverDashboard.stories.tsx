import { Meta, StoryObj } from '@storybook/react';
import DriverDashboard from '../pages/driver-dashboard';

const meta: Meta<typeof DriverDashboard> = {
  title: 'Fahrer/Dashboard',
  component: DriverDashboard,
};
export default meta;

export const Default: StoryObj<typeof DriverDashboard> = {
  args: {},
};
