import * as gqlClient from '@masterysystems/lachesis-graphql-client/dist/client'
import * as graphql from '../../src/voucher/graphql'
import * as outboundSending from '../../src/voucher/send-outbound'

import {GraphQLClient} from 'graphql-request'
import {SinonStub} from 'sinon'
import {handleVoucher} from '../../src/voucher/voucher-client'
import sinon from 'ts-sinon'

import {
    inboundVoucherEvent,
    mockVoucherIdentifiers,
    outboundVoucherEvent
} from '../support/utils-test-data'

const {describe, it, afterEach, beforeEach} = intern.getPlugin('interface.bdd')

const chai = intern.getPlugin('chai')
const {expect} = chai

const sandbox = sinon.createSandbox()

let sendOutboundStub: SinonStub
let clientRequestStub: sinon.SinonStub
let resolveGraphQLClientStub: sinon.SinonStub
let getVoucherIdentifiers: sinon.SinonStub

describe('Voucher event client', () => {
    beforeEach(() => {
        resolveGraphQLClientStub = sandbox.stub(
            gqlClient,
            'resolveGraphQLClient'
        )
        const graphQLClient = new GraphQLClient('https://gql')
        resolveGraphQLClientStub.resolves(graphQLClient)
        clientRequestStub = sandbox.stub()
        graphQLClient.request = clientRequestStub

        getVoucherIdentifiers = sandbox
            .stub(graphql, 'getVoucherIdentifiers')
            .resolves(mockVoucherIdentifiers)

        sendOutboundStub = sandbox.stub(outboundSending, 'sendOutbound')
    })

    afterEach(() => {
        sandbox.reset()
        sandbox.restore()
    })

    it('should be defined', () => {
        expect(handleVoucher).to.not.be.undefined
    })

    it('should map inbound-vendor to outbound', async () => {
        clientRequestStub.onFirstCall().resolves(getVoucherIdentifiers)
        await handleVoucher(inboundVoucherEvent)
        expect(getVoucherIdentifiers.calledOnce).to.be.true
        expect(sendOutboundStub).to.have.been.calledWith(
            outboundVoucherEvent.id,
            outboundVoucherEvent
        )
    })
})
