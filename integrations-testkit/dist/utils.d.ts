export declare const jweInstance: (k: string) => Promise<{
    encrypt: (payload: any) => Promise<any>;
    decrypt: (token: any) => Promise<any>;
}>;
export declare const jwsInstance: (k: string) => Promise<{
    sign: (payload: any) => Promise<any>;
    verify: (token: any) => Promise<any>;
}>;
export declare const getFreePort: () => Promise<any>;
