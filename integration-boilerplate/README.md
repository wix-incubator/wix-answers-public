# Wix Answers integration boilerplate
In this boilerplate you will find the basic implantation in order to successfuly integrate with Wix Answers.
The boilerplate is a node application written in typescript and it uses mongodb (easy to change) as an example of how we think integrations should be develope.

This boilerplate is implementation of https://help.wixanswers.com/en/article/wix-answers-integrations 

# The boilerplate contains:
- Implementation of express application contains:
    - Register / unregister actions
    - Settings & ticket-page-iframe view implementation
- Implement tests using the answers-integrations-testkit
- Can run the sandbox with the testkit by running 'answers-integrations-testkit'