var bob = {
    name: "HubSpot",
    description: "Integrate your HubSpot CRM to Wix Answers",
    issuedBy: "Bob Inc.",
    scriptUrl: "https://bob.com/integration/embedder.js",
    settingsUrl: "https://bob.com/integration/settings",
    registerUrl: "https://bob.com/integration/init",
    unregisterUrl: "https://bob.com/integration/remove",
    iconUrl: "https://bob.com/integration/logo.png",
    webhooks: {
        TICKET_CREATED: "https://bob.com/webhooks/ticket-created",
        REPLY_CREATED: "https://bob.com/webhooks/reply-created"
    }
};
var newBob = {
    name: "HubSpot",
    description: "Integrate your HubSpot CRM to Wix Answers",
    registerUrl: "https://bob.com/integration/init",
    iconUrl: "https://bob.com/integration/logo.png",
    issuedBy: "Bob Inc.",
    unregisterUrl: "https://bob.com/integration/remove",
    settingsUrl: "https://bob.com/integration/settings",
    features: [
        {
            type: "ticket-webhook",
            value: {
                url: "https://bob.com/webhooks/ticket-created"
            }
        },
        {
            type: "ticket-webhook",
            value: {
                url: "https://bob.com/webhooks/ticket-created2"
            }
        },
        {
            type: 'ticket-sidebar-section',
            value: {
                title: 'Salesforce',
                url: 'https://bob.com/integration/ticket-view'
            }
        },
        {
            type: 'rule-engine-action',
            value: {
                title: 'Send to slack',
                hookUrl: 'https://bob.com/integration/ticket-view',
                settingsUrl: 'https://bob.com/integration/ticket-view'
            }
        }
    ]
};
//# sourceMappingURL=,.js.map