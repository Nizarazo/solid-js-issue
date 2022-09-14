export async function safeAwaitContainer<T>(promise: Promise<T>): Promise<{ result?: T, error?: any }> {
    const result: { result?: T, error?: any } = {};
    try {
        result.result = await promise;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export async function safeAwait<T>(promise: Promise<T>): Promise<T & { error?: any }> {
    let result: T & { error?: any };
    try {
        result = await promise;
    } catch (error) {
        result = { error: error } as T & { error?: any };
    }
    return result;
}

/**
 * sleep
 * @param interval interval in ms 
 */
export function sleep(interval: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}


export function sleepWithEvent(interval: number, event: () => Promise<void>): Promise<void> {
    let resolveWasExectued: boolean = false;
    let resolveFunc : ()=>void = null;
    const executeResolve = (): void => {
        if (!resolveWasExectued) {
            resolveFunc();
            resolveWasExectued = true;
        }
    }

    return new Promise<void>((resolve) => {
        resolveFunc = resolve;
        setTimeout(() => {
            executeResolve();
        }, interval);
        event().then(_ => {
            executeResolve();
        })
    });
}

export function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}
