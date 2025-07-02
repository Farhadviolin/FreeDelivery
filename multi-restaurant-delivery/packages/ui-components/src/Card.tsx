import { styled } from '@stitches/react';
import { colors } from 'ui-tokens';

export const Card = styled('div', {
  backgroundColor: colors.background,
  color: colors.text,
  borderRadius: '$md',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  padding: '$md',
  margin: '$sm',
});
