import {mapVoucherToOutboundVoucher} from '../../src/voucher/util'

import {
    inboundUpdateVoucherEvent,
    inboundVoucherEvent,
    mockVoucherIdentifiers,
    outboundUpdateVoucherEvent,
    outboundVoucherEvent
} from '../support/utils-test-data'

const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

describe('Voucher utils', () => {
    it('should get mapped insert event data for outbound', async () => {
        const voucherEvent = mapVoucherToOutboundVoucher(
            inboundVoucherEvent,
            mockVoucherIdentifiers
        )
        expect(voucherEvent).to.not.be.undefined
        expect(voucherEvent).to.deep.equal(outboundVoucherEvent)
    })

    it('should get mapped update event data for outbound', async () => {
        expect(
            mapVoucherToOutboundVoucher(
                inboundUpdateVoucherEvent,
                mockVoucherIdentifiers
            )
        ).to.deep.equal(outboundUpdateVoucherEvent)
    })
})
