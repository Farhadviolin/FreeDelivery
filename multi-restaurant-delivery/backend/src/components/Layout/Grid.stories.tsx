import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Col } from './Col';

const meta: Meta = {
  title: 'Layout/Grid',
  component: Row,
};
export default meta;

type Story = StoryObj;

export const ResponsiveGrid: Story = {
  render: () => (
    <Row gap="md">
      <Col span={6}><div style={{background:'#eee',height:40}}>Col 6/12</div></Col>
      <Col span={6}><div style={{background:'#ddd',height:40}}>Col 6/12</div></Col>
      <Col span={4}><div style={{background:'#ccc',height:40}}>Col 4/12</div></Col>
      <Col span={8}><div style={{background:'#bbb',height:40}}>Col 8/12</div></Col>
    </Row>
  ),
};
