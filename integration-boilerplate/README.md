# Wix Answers integration boilerplate
In this boilerplate you will find the basic implementation in order to successfuly integrate with Wix Answers.
The boilerplate is a node application written in typescript and it uses mongodb (easy to change) as an example of how we think integrations should be developed.

This boilerplate is implementation of https://help.wixanswers.com/en/article/wix-answers-integrations 

# The boilerplate contains:
- Implementation of express application contains:
    - Register / unregister actions
    - Settings & ticket-page-iframe view implementation
- Implement tests using the answers-integrations-testkit

# Running
- To run the project:
    - change mongoUrl, baseUrl, integrationId and answersIntegrationSecret in config.ts file.
    - run 'npm install'
    - run 'npm start'
- To run tests run 'npm test' - it will run all the *.spec.ts
- In order to run the sandbox, install globally `npm i -g  wix-answers-integrations-testkit@latest` and then run 'npm run sandbox'
