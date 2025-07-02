import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: { a11y: { element: "button" } }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = { variant: "primary", children: "Primary" };
export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary", children: "Secondary" };
