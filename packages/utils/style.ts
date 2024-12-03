import { isNumber, isString } from 'lodash-es';

const SCOPE = 'utils/style' as const;

function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
}

export function addUnit(val?: string | number, defaultUnit = 'px') {
  if (!val)
    return '';
  if (isNumber(val) || isStringNumber(val)) {
    return `${val}${defaultUnit}`;
  }
  if (isString(val)) {
    return val;
  }
  console.warn(SCOPE, ':binding value must be a string or number');
}
