import React from 'react';
import { Button } from './Button';

export default { title: 'Components/Button', component: Button };

export const Primary = () => <Button>Primary Button</Button>;
export const Outline = () => <Button variant="outline">Outline Button</Button>;
