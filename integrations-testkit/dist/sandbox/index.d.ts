/// <reference types="node" />
export declare const startSandbox: (forcePort?: number | undefined) => Promise<{
    close: import("http").Server;
    url: string;
}>;
