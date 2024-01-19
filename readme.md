# Commands
### npx playwright test
### npx playwright test --headed --browser=chrome
### npx playwright test --headed --browser=all
### npx playwright test tests/example.spec.ts
### npx playwright test --grep @google
### npx playwright test --grep-invert @google


# Selectors

### name -> page.locator('h1')

# Reporters

### npx playwright test --reporter=line
### npx playwright test --reporter=list (used by default)
### npx playwright test --reporter=dot
### npx playwright test --reporter=junit
### npx playwright test --reporter=html
### npx playwright show-report (to show the html report)






## Notes:
1. Override the command from commandline using -- followed by the argument/command
2. Debug using page.pause in headful mode to start playwright inspector for debugging
3. Artifacts on failure:         
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
4. Run tests in parallel: use test.describe.parallel, will run the tests in parallel
5. add "testDir" to the config to run selected test files. e.g: testDir : "tests/e2e". To run add in the package.json scripts section as follows:
scripts : {
    "tests:e2e": "playwright test --config=e2e.config.ts --project=Chromium"
}