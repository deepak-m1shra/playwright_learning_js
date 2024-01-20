
import {expect, test} from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { log } from 'console'

 let loginPage : LoginPage

test.describe('Login tests', () => {
    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    test('Invalid login', async({page}) => {
        await page.click('#signin_button')
        await loginPage.login("in username", "password")
        await loginPage.assertErrorMessage()
    })
})