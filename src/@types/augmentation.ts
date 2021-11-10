declare function AsyncExitHook(onExit: (cb: () => void) => void): Promise<void>

declare module 'async-exit-hook' {
    export = AsyncExitHook
}
