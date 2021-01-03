/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    const response = await client.post('customer-support-issues/', {
      customer_id: 'customer_id_1',
      title: 'title1',
      description: 'description1',
    })

    expect(response).to.be.ok
    expect(response.data.id).to.be.ok
    expect(response.data.id.length).to.be.greaterThan(0)
    expect(response.status).to.equal(200)
  })

  it('fails to resolve unassigned issue', async () => {
    const client = axios.create({
      baseURL: 'http://customer-support-service:5000/',
    })
    const response = await client.post('customer-support-issues/', {
      customer_id: 'customer_id_1',
      title: 'title1',
      description: 'description1',
    })

    expect(response).to.be.ok
    expect(response.status).to.equal(200)
    const { id } = response.data
    let resp = null
    try {
      await client.put(`customer-support-issues/${id}/status`, {
        status: 'RESOLVED',
      })
    } catch (error) {
      resp = error.response
    }
    expect(resp).to.be.ok
  })

  it('assign issue if agent available', async () => {
    const client = axios.create({
      baseURL: 'http://customer-support-service:5000/',
    })

    await client.post('customer-support-agents/', {
      id: uuid(),
    })
    const response = await client.post('customer-support-issues/', {
      customer_id: 'customer_id_1',
      title: 'title1',
      description: 'description1',
    })
    expect(response).to.be.ok
    expect(response.status).to.equal(200)
    const { id } = response.data
    const resp = await client.put(`customer-support-issues/${id}/status`, {
      status: 'RESOLVED',
    })

    expect(resp).to.be.ok
  })

  it('assign issue if agent joins', async () => {
    const client = axios.create({
      baseURL: 'http://customer-support-service:5000/',
    })

    const response = await client.post('customer-support-issues/', {
      customer_id: 'customer_id_1',
      title: 'title1',
      description: 'description1',
    })
    expect(response).to.be.ok
    expect(response.status).to.equal(200)
    const { id } = response.data

    await client.post('customer-support-agents/', {
      id: uuid(),
    })

    const resp = await client.put(`customer-support-issues/${id}/status`, {
      status: 'RESOLVED',
    })

    expect(resp).to.be.ok
  })
})
