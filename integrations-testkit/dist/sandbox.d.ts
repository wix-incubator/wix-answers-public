/// <reference types="node" />
import { Server } from 'http';
export declare const startSandbox: (forcePort?: number) => Promise<{
    close: Server;
    url: string;
}>;
