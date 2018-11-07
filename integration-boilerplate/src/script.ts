export const getInjectedIntegrationScript = (baseUrl: string, integrationId: string): string => `
    const cleanup = window.answersBackofficeSdk.addListener(window.answersBackofficeSdk.eventTypes.ticketLoaded,
        async (ticketData) => {
        const ticketAuthorEmail = ticketData.user.email;


        const signedData = await window.answersBackofficeSdk.sign('${integrationId}', { email: ticketAuthorEmail });

        const title = 'Example integration ';
        const url = \`${baseUrl}/answers/api/view?data=\${signedData.payload}\`;
        const html = \`<iframe style="border: 0; width: 100%; height: 200px" src="\${url}">scrolling="no"</iframe>\`;
        window.answersBackofficeSdk.addTicketInfoSection(title, html);
    });

    window.answersBackofficeSdk.onIntegrationRemoved('${integrationId}', cleanup);
`;
