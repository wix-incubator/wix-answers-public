export const noop = (..._: any[]): any => null;

export const asyncNoop = async (..._: any[]): Promise<any> => Promise.resolve(null);
