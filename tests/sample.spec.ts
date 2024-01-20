import {test, expect} from '@playwright/test'
import { describe } from 'node:test'

test('Google title test', async ({page}) => {
    await page.goto('https://www.google.com')
    const title = await page.title()
    await expect(title).toContain('Google')
})

test('Example header title test', async ({page}) => {

    await page.goto('https://www.example.com')
    const heading = page.locator('h1')
    await expect(heading).toContainText('Example Domain')
   
})

test('clicking on element',async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('are wrong')
})

test.skip('Selectors Demo', async ({page})=> {
    // Text
    await page.click('text=some text')

    // CSS selector
    await page.click("button")
    await page.click('#id')
    await page.click('.class')

    // Only visible CSS selectors
    await page.click('.submit-button:visible')

    // Combination
    await page.click('#username .first')

    // XPath
    await page.click('//button')

})

test('Login with valid creds',async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')

    await page.click('text=Sign in')

    const error = page.locator('.alert-error')
    await expect(error).toContainText('are wrong')
})

test('Assertions to check',async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    await expect(page).toHaveTitle('Zero - Personal Banking - Loans - Credit Cards')

    await page.goto('https://www.example.com')
    const heading = page.locator('h1')
    
    await expect(heading).toBeVisible()

    // not visible
    const headingNotVisible = page.locator('h5')
    await expect(headingNotVisible).not.toBeVisible()

})

// using describe
test.describe.skip('group a', ()=> {
    test.skip('test a', async({page})=>{

    })

    test.skip('test b', async({page})=>{
        
    })
})

// using tags
// npx playwright test --grep @google
test('Google tag test @google', async ({page}) => {
    await page.goto('https://www.google.com')
    const title = await page.title()
    await expect(title).toContain('Google')
})

// Taking screenshots
// 1. Full page screenshot
test.only('Take screenshot',async ({page}) => {
    page.goto("https://example.com")
    page.screenshot({path: "screenshot_test.png", fullPage: true})
})

// 2. Taking element screenshot
test("Element screenshot", async ({page}) => {
    await page.goto("https://example.com")
    const element = await page.locator('text=Example Domain')
    await element?.screenshot({path: 'single_element_2_text.png'})
})

// 3. Practice screenshot
test('IRCTC screenshot',async ({page}) => {
    await page.goto('https://www.google.co.in')
    const searchElement = await page.locator('#APjFqb')
    await searchElement.screenshot({path: 'search_google_element.png'})
})

// Before and after hooks
test.describe.skip('Grouping and hooking', () => {
    test.beforeAll('Will run once before everthing else', () => {
        console.log("Will run only once before everything")
    })
    test.afterAll('Will run once after everthing else', () => {
        console.log("Will run only once after everything")
    })

    test('navigate to irctc', async({page})=> {
        await page.goto('https://www.irctc.co.in')
        console.log("Navigation to irctc complete")
    })

    test('navigate to easemytrip', async({page})=> {
        await page.goto('https://www.easemytrip.com/')
        console.log("Navigation to easemytrip complete")
    })

    test.beforeEach('Open google search', async({page}) => {
        await page.goto('https://www.google.co.in')
    })

    test.afterEach('Open google search', async({page}) => {
        console.log('executed after each test case')
    //    await page.reload()
    })
})

test.describe.parallel(() => {
    console.log('Used for executing parallel tests')
})