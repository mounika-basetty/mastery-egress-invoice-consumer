import {ClientLocator} from '@masterysystems/lachesis-kafka-client'
import {OutboundVoucher} from '../generated-types/voucher'
import polly from 'polly-js'

import {logger, outboundTopic, producerConfig} from '../config'

export const sendOutbound = async (
    key: string,
    outboundVoucher: OutboundVoucher
): Promise<void> => {
    const producer = ClientLocator.resolveProducerByName(producerConfig.name)

    const offset = await polly()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .handle((error: any) => {
            logger.warn(`Event Hub publish error: ${JSON.stringify(error)}`)
            // retry all errors for now
            return true
        })
        .waitAndRetry([1000, 2000, 4000])
        .executeForPromise(() => {
            return producer.produceJson(outboundTopic, key, outboundVoucher)
        })

    logger.trace(`produced offset: ${offset} for ${key}`)
}
