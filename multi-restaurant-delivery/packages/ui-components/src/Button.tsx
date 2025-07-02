import { styled } from '@stitches/react';
import { colors } from 'ui-tokens';

export const Button = styled('button', {
  padding: '$2 $4',
  borderRadius: '$md',
  fontSize: '$md',
  backgroundColor: colors.primary,
  color: '#fff',
  '&:hover': { backgroundColor: colors.secondary },
  variants: {
    variant: {
      outline: { backgroundColor: 'transparent', border: '2px solid', borderColor: colors.primary, color: colors.primary },
      ghost: { backgroundColor: 'transparent', color: colors.primary },
    }
  }
});
