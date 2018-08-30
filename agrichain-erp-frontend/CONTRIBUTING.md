# AGRICHAIN Contributor Guide

### Pull request reviews
1. Before work begins on a task, move the associated card on trello to InProgress and assign yourself to the card if not already assigned. Also make sure that your dev branch is up to date and that you create a new branch with the name in the form: `type`/`issue`. For example, If you needed to create a new widget for the dashboard, you would call your branch `feature/water-widget`. 
2.  When you feel you are done with the task, make sure that all tests pass locally by running `npm run test`. Also make sure that you have merged in the latest dev branch if it has gotten ahead.
3. Create a pull Request, and make sure to include a description of what you have changed in the code and an example of how it can be tested. Request a review from @Cyrille, and move the card to the pull request list.
4. When @Cyrille is happy with the contribution, it will be merged into the dev branch.

### Coding standards
* All front-end components will be written in typescript and must pass tslint tests.
* All back-end components will be written in ES-7 Javascript and must pass eslint tests. 
* All components should be well documented. A good rule of thumb is that if a non programmer were to read your code, they should be able to at least get an idea of what it is you're trying to accomplish.
* If the feature created is a new api or page, or component, it should have accompanying tests to go with it.


### Release Schedule
Branches coming from dev will be merged in as soon as possible allowing successful tests and reviews. The dev branch will be merged into staging once a week on Fridays. At least two developers need to sign off on staging. On Sundays, Staging will be merged into Master. Prod deployment pipeline is TBD.
