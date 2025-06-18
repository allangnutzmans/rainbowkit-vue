import clsx from 'clsx';
import * as resetStyles from './reset.css';
import { sprinkles, /* type Sprinkles */ } from './sprinkles.css';

export type Atoms = {
  reset?: keyof typeof resetStyles.element;
};
/* export type Atoms = Sprinkles & {
  reset?: keyof typeof resetStyles.element;
};
 */
export const atoms = ({ reset, ...rest }: Atoms) => {
  const resetClass = reset
      ? resetStyles.element[reset as keyof typeof resetStyles.element]
      : undefined;

  const sprinklesClasses = sprinkles(rest);

  return clsx(resetStyles.base, resetClass, sprinklesClasses);
};
