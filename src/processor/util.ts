import {VoucherEventTypes} from '../voucher/types'
import {logger} from '../config'

export const handledEventTypes: string[] = Object.values(VoucherEventTypes)

export const shouldProcessEventType = (eventType: string): boolean => {
    if (eventType) {
        logger.debug(`Received voucher event type - ${eventType}`)
        return handledEventTypes.includes(eventType)
    }
    return false
}
