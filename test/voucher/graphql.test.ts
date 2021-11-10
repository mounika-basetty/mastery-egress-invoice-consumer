import * as gqlClient from '@masterysystems/lachesis-graphql-client/dist/client'
import * as graphql from '../../src/generated/graphql'

import {GraphQLClient} from 'graphql-request'
import {getVoucherIdentifiers} from '../../src/voucher/graphql'
import sinon from 'ts-sinon'

import {
    MasteryApiError,
    MasteryApiNotFoundError
} from '@masterysystems/external-api-kafka-utils'
import {
    inboundVoucherEvent,
    mockVoucherIdentifiers
} from '../support/utils-test-data'

const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd')
const chai = intern.getPlugin('chai')
const {expect} = chai

const sandbox = sinon.createSandbox()

describe('graphql', () => {
    beforeEach(() => {
        const graphQLClient = new GraphQLClient('https://gql')
        graphQLClient.request = sandbox.stub()
        const resolveGraphQLClientStub = sandbox.stub(
            gqlClient,
            'resolveGraphQLClient'
        )
        resolveGraphQLClientStub.resolves(graphQLClient)
    })

    afterEach(() => {
        sandbox.reset()
        sandbox.restore()
    })

    it('should throw MasteryApiError on graphql error', async () => {
        await expect(
            getVoucherIdentifiers(inboundVoucherEvent)
        ).to.be.rejectedWith(MasteryApiError)
    })

    it('should throw MasteryApiNotFoundError when carrier not found from graphql', async () => {
        const carrierResponse = {
            data: {
                carrier: {}
            },
            headers: {},
            status: 200
        }
        const carrierStub = {
            carrier: sandbox.stub().resolves(carrierResponse),
            route: sandbox.stub().resolves()
        }
        sandbox
            .stub(graphql, 'getSdk')
            .onFirstCall()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .returns(carrierStub as any)

        await expect(
            getVoucherIdentifiers(inboundVoucherEvent)
        ).to.be.rejectedWith(MasteryApiNotFoundError)
    })

    it('should return valid value for carrier', async () => {
        const carrierResponse = {
            data: {
                carrier: {
                    id: '0693cd65-cd76-4349-934d-54926e812c02',
                    code: 'TEST'
                }
            },
            headers: {},
            status: 200
        }
        const getSdkStub = {
            carrier: sandbox.stub().resolves(carrierResponse),
            route: sandbox.stub().resolves()
        }
        sandbox.stub(graphql, 'getSdk').onFirstCall().returns(getSdkStub)

        expect(await getVoucherIdentifiers(inboundVoucherEvent)).to.deep.equal(
            mockVoucherIdentifiers
        )
    })

    it('should return null value for carrier on null RemittanceInfo', async () => {
        const voucherData = {...inboundVoucherEvent}
        voucherData.RemittanceInfo = null
        expect(await getVoucherIdentifiers(voucherData)).to.deep.equal({
            carrierIdentifier: {
                carrierId: null,
                carrierCode: null
            }
        })
    })
})
