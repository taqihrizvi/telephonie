import { weight, family } from './font';

const baseStyles = (fontSize: string, fontWeight: number, lineHeight: string) => ({
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily: family.Worksans,
});

export const H2 = {
  ...baseStyles('1.5rem', weight.extrabold, '3rem'),
  color: '#1C1D1D',
};
export const TextBtn = {
  ...baseStyles('0.75rem', weight.extrabold, '1.125rem'),
};

export const Label = {
  ...baseStyles('0.875rem', weight.extrabold, '1.125rem'),
};
