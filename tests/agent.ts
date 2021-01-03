/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { cleanDb } from './utils'

describe('Issue', () => {
  afterEach(async () => {
    await cleanDb()
  })

  it('create an issue', async () => {
    const client = axios.create({
      baseURL: 'http://customer-support-service:5000/',
    })

    const response = await client.post('customer-support-agents/', {
      id: uuid(),
    })

    expect(response).to.be.ok
    expect(response.status).to.equal(200)
  })
})
