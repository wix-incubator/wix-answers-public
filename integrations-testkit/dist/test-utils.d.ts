/// <reference types="node" />
import { IntegrationData, IntegrationRegisterContext, TicketSandboxContext } from '.';
export declare const dummyIntegration: (data: IntegrationData, port: number) => () => import("http").Server;
export declare const integrationDataBuilder: (partial?: Partial<IntegrationData>) => IntegrationData;
export declare const integrationContextBuilder: (partial?: Partial<IntegrationRegisterContext>) => IntegrationRegisterContext;
export declare const ticketContextBuilder: (partial?: Partial<TicketSandboxContext>) => TicketSandboxContext;
