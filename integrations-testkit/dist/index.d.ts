export interface IntegrationRegisterContext {
    keyId: string;
    secret: string;
    host: string;
    tenantId: string;
}
export interface IntegrationUnegisterContext {
    tenantId: string;
}
export interface IntegrationSettingsContext {
    tenantId: string;
}
export interface IntegrationData {
    id: string;
    secret: string;
    registerUrl: string;
    unregisterUrl: string;
    settingsUrl: string;
    scriptUrl: string;
}
export interface TicketSandboxContext {
    id: string;
    subject: string;
    user: {
        email: string;
        fullName: string;
    };
}
export interface IntegrationsTestkit {
    triggerRegister: (context: IntegrationRegisterContext) => Promise<any>;
    triggerUnregister: (tenantId: string) => Promise<any>;
    getTicketViewSandboxUrl: (context: TicketSandboxContext) => string;
    getRenderedSettingsUrl: (tenantId: string) => string;
    closeServer: () => Promise<void>;
}
export declare const createTestkit: (integrationData: IntegrationData, forcePort?: number | undefined) => Promise<IntegrationsTestkit>;
