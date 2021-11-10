import {ClientLocator} from '@masterysystems/lachesis-kafka-client'
import chaiAsPromised from 'chai-as-promised'
import {expectedOutboundVoucher} from '../support/voucher-client.test-data'
import {sendOutbound} from '../../src/voucher/send-outbound'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd')
const chai = intern.getPlugin('chai')
const {expect} = chai
chai.use(sinonChai)
chai.use(chaiAsPromised)
const sandbox = sinon.createSandbox()

interface ProducerStub {
    produceJson: sinon.SinonStub
    connect: sinon.SinonStub
}

describe('send outbound', () => {
    let producerStub: ProducerStub

    beforeEach(() => {
        producerStub = {
            produceJson: sandbox.stub().resolves(1),
            connect: sandbox.stub().resolves()
        }

        const clientLocatorStub = sandbox.stub(
            ClientLocator,
            'resolveProducerByName'
        )

        clientLocatorStub
            .onFirstCall()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .returns(producerStub as any)
    })

    afterEach(() => {
        producerStub.produceJson.reset()
        sandbox.reset()
        sandbox.restore()
    })

    it('should call producer with proper parameters', async () => {
        await sendOutbound(expectedOutboundVoucher.id, expectedOutboundVoucher)
        expect(producerStub.produceJson).to.be.calledOnceWith(
            'send-voucher-event-test',
            expectedOutboundVoucher.id,
            expectedOutboundVoucher
        )
    })

    it('should retry producing to event hub', async () => {
        producerStub.produceJson.onFirstCall().rejects('Failure')
        producerStub.produceJson.onSecondCall().resolves(1)
        await sendOutbound(expectedOutboundVoucher.id, expectedOutboundVoucher)

        expect(producerStub.produceJson.calledTwice).to.be.true
    })

    it('should throw exception if all retries fail', async () => {
        producerStub.produceJson.rejects('Failure')

        return expect(
            sendOutbound(expectedOutboundVoucher.id, expectedOutboundVoucher)
        ).to.eventually.be.rejected
    })
})
