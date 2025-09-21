export async function runInSequence<T>(
    tasks: Array<() => Promise<T>>
): Promise<T[]> {
    const results: T[] = [];

    for (const task of tasks) {
        const result = await task();

        results.push(result);
    }

    return results;
}