type When = {
    [match: string]: () => void;
};

export function when(conditions: When): void {
  for (const [key, fn] of Object.entries(conditions)) {
    if (key === 'true') {
      fn();
      return;
    }
  }
}