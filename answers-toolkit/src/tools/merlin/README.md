
1. √ Generate a dependecy tree of internal modules
2. √ Link all internal modules to another
3. When repo is updated:
	- add new modules to graph (probably not!)
	- check for new deps, install if necessary
	- build changed modules
	- link new modules (probably not!)
4. When repo is pushed:
	- build and run tests
	- check for affected modules
	- build and run tests on them
5. When developing:
	- Run soft build when something is changed (maybe using IDE?)


#TODO
- add "build all" task
- add "test all" task
- messaging on build tasks
- improve logging

- integrate to answers-client
- add yarn upgrade tasks

- add build and test before pushing
 - add verbosity
- find beta testers @wix
- publish externally



## Mono repo dashboard
When I have a monorepo, I want to have a macro vision of my dependencies so I can:
- run them
- test them
Job: easily see the dependecies in a monorepo, test them, load them, and more 
