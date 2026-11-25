import type { Path } from '../interface/Path';

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function removeDuplicate<T>(arr: T[]): T[] {
  const primitiveSets: Record<string, Set<any>> = {
    string: new Set(),
    number: new Set(),
    boolean: new Set(),
  };

  const objectSet = new WeakSet<object>();

  const result: T[] = [];

  for (const item of arr) {
    const type = typeof item;

    if (type === 'string' || type === 'number' || type === 'boolean') {
      if (!primitiveSets[type].has(item)) {
        primitiveSets[type].add(item);
        result.push(item);
      }
    } else if (item && typeof item === 'object') {
      if (!objectSet.has(item)) {
        objectSet.add(item);
        result.push(item);
      }
    } else {
      // valores como null, undefined, symbols etc.
      result.push(item);
    }
  }

  return result;
}

export function chooseNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom<T>(arr: T[]): T {
  const shuffled = shuffle(arr);
  const chosen = chooseNumber(0, shuffled.length - 1);

  return shuffled[chosen];
}

function greaterOrLessThan<T>(arr: T[], path: Path<T>, position: 'higher' | 'less'): T {
  const props = (path as string).split('.');

  const shuffled = shuffle(arr);

  const navigate = (arr: string[], prop: T) => {
    const value = arr.reduce((p, c) => p[c], prop);

    if (!value && value !== 0) { throw new Error(`Property path "${path}" does not exist.`); }

    return value;
  };

  return shuffled.reduce((prev, current) => {
    const currentValue = navigate(props, current);
    const previousValue = navigate(props, prev);

    return position === 'higher'
      ? (previousValue > currentValue) ? prev : current
      : (previousValue < currentValue) ? prev : current;
  });
}

export function higherThan<T>(arr: T[], path: Path<T>): T {
  return greaterOrLessThan(arr, path, 'higher');
}

export function lessThan<T>(arr: T[], path: Path<T>): T {
  return greaterOrLessThan(arr, path, 'less');
}

export function getFilledArray(length: number) {
  return Array.from(Array(length), (_, index) => index);
}

export function flatten<T>(array: Array<T | T[]>): T[] {
  return array.reduce<T[]>((acc, val) => acc.concat(val), []);
}
