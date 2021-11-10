import * as voucher from '../../src/voucher/voucher-client'

import {BadDataError} from '@masterysystems/external-api-kafka-utils'
import chaiAsPromised from 'chai-as-promised'
import {onData} from '../../src/processor/on-data'

import {
    invalidEventTypeData,
    message,
    validVoucherData
} from '../support/on-data.test-data'
import sinon, {SinonStub} from 'sinon'

const {describe, it, afterEach, beforeEach} = intern.getPlugin('interface.bdd')
const chai = intern.getPlugin('chai')
const {expect} = chai
chai.use(chaiAsPromised)

const sandbox = sinon.createSandbox()
let handleVoucherStub: SinonStub

describe('on data', () => {
    beforeEach(() => {
        handleVoucherStub = sandbox.stub(voucher, 'handleVoucher')
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should be defined', () => {
        expect(onData).to.not.be.undefined
    })

    it('should not call handleVoucher if given event type we do not process', async () => {
        await expect(onData(invalidEventTypeData, message)).to.be.rejectedWith(
            BadDataError
        )
        expect(handleVoucherStub.called).to.be.false
    })

    it('should call handleVoucher with relevant data', async () => {
        await onData(validVoucherData, message)
        expect(handleVoucherStub.calledOnce).to.be.true
    })
})
