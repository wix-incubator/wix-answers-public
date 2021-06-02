# Answers Integrations Testkit & Sandbox

Allows writing e2e tests for Answers integrations by emulating the flows that happen when an integration runs on our server.

## Install
`npm i -g wix-answers-integrations-testkit`
`yarn global add wix-answers-integrations-testkit`

## API

### Methods

#### triggerRegister(data: IntegrationData) => Promise<any>
Simulates a call to the register hook

#### triggerUnegister(data: IntegrationData) => Promise<any>
Simulates a call to the unregister hook

#### getTicketViewSandboxUrl: (context: SignedContext<TicketSandboxContext>) => string;
Returns a url to view a ticket sandbox view - this will render a minimal ticket page with a naive implementation of our SDK.
Using this you can test the actual integration to the sidebar.


#### getRenderedSettingsUrl: (tenantId: string) => string;
Returns a url to the settings - this will render your settings iframe as done in production.

#### closeServer: () => Promise<void>;
Closes the server. Make sure to call this after your done with your tests.

## Examples
See [test code](./src/spec.ts) for examples - this tests the testkit using a dummy integration.


## Sandbox
This package also comes with an UI for the testkit. It allows you to add your integration details and trigger hooks / simulate settings / simualte ticket page view.

### Usage
1. Install this package *globally* (`npm i -g wix-answers-integrations-testkit`)
2. Run `answers-integrations-sandbox`
3. The url of the sandbox will be returned


## TODO
- support post message api (close, notify)
- add full ticket context data example
- add webhooks support
- use the real SDK
