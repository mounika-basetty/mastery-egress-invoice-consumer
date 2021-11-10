import {InboundVoucher} from './types'
import {getVoucherIdentifiers} from './graphql'
import {logger} from '../config'
import {mapVoucherToOutboundVoucher} from './util'
import {sendOutbound} from './send-outbound'

export const handleVoucher = async (voucher: InboundVoucher): Promise<void> => {
    const identifiers = await getVoucherIdentifiers(voucher)
    logger.info(`VoucherIdentifiers: ${JSON.stringify(identifiers)}`)
    const mappedVoucher = mapVoucherToOutboundVoucher(voucher, identifiers)
    logger.info(`mappedVoucher: ${JSON.stringify(mappedVoucher)}`)

    await sendOutbound(voucher.Id, mappedVoucher)
}
