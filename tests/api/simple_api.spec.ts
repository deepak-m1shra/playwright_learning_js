import {expect, test} from '@playwright/test'
import exp from 'constants'

test.describe.parallel('API tests', () => {
    const baseUrl : string = 'https://reqres.in/api'
    
    test('Simle GET request - Assert response status', async( {request})=> {
        const response = await request.get(`${baseUrl}/users/2`)

        expect(response.status()).toBe(200)
    })

    test('Simle GET request - Assert response status 404', async( {request})=> {
        const response = await request.get(`${baseUrl}/users/2a`)

        expect(response.status()).toBe(404)
    })

    test('Print response body', async( {request})=> {
        const response = await request.get(`${baseUrl}/users/2`)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.avatar).toBeTruthy()
        expect(responseBody.data.first_name).toContain('J')
    })

    test('POST request - Create a user', async ({request}) => {
        const response = await request.post(`${baseUrl}/users`, {
           data : {
            id: 1009,
            first_name : "dee",
            last_name: "mi"
           }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.id).toBe(1009)
        expect(responseBody.createdAt).toBeTruthy()
        
    })

    test('POST - User Login', async ({request}) => {
        const response = await request.post(`${baseUrl}/login`, {
            data : {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()
    })

    test('PUT test', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/1009`, {
            data: {
                name: 'Denzel',
                job: 'Just Chill!'
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(responseBody.name).toBe('Denzel')
    })

    test('DELETE request', async ( { request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })


})