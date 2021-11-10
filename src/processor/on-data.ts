import {BadDataError} from '@masterysystems/external-api-kafka-utils'
import {HRTimer} from '../util'
import {Message} from 'node-rdkafka'
import {handleVoucher} from '../voucher/voucher-client'
import {logger} from '../config'
import {shouldProcessEventType} from './util'
import {types} from '@masterysystems/lachesis-kafka-client'

import {
    Key as VoucherKey,
    Value as VoucherValue
} from '@masterysystems/topic.accounting.vendor.voucher.v1/dist'

export const onData = async (
    decoded: types.Decoded<VoucherKey, VoucherValue>,
    message: Message
): Promise<void> => {
    const {key, value} = decoded

    logger.info(
        `Inbound Key: ${JSON.stringify(key)}, value: ${JSON.stringify(value)} `
    )
    logger.debug(
        `Message offset ${message.offset} received from ${message.topic} and partition: ${message.partition}`
    )

    if (!shouldProcessEventType(value.EventType)) {
        throw new BadDataError(
            `Do not process event type: ${value.EventType}; closing.`
        )
    }

    const hrt = HRTimer.start()

    await handleVoucher(value)

    logger.debug(`Processing took ${hrt.stop()}s`)
}
