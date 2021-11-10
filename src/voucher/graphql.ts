import {getSdk} from '../generated/graphql'

import {InboundVoucher, VoucherIdentifiers} from './types'
import {
    MasteryApiError,
    MasteryApiNotFoundError,
    isGraphQLError
} from '@masterysystems/external-api-kafka-utils'
import {
    defaultIsErrorRetryable,
    makeRetryWrapper,
    resolveGraphQLClient
} from '@masterysystems/lachesis-graphql-client'
import {graphQLConfig, logger} from '../config'
import {isEmpty, isNil, path} from 'ramda'

export const getVoucherIdentifiers = async (
    voucher: InboundVoucher
): Promise<VoucherIdentifiers> => {
    const graphqlClient = await resolveGraphQLClient(graphQLConfig)
    const retryWrapper = makeRetryWrapper(
        graphqlClient,
        graphQLConfig,
        [1000, 2000, 4000],
        defaultIsErrorRetryable
    )
    const sdk = getSdk(graphqlClient, retryWrapper)
    logger.debug('looking up identifiers')

    let carrierCode
    if (voucher.RemittanceInfo?.CarrierId) {
        const carrierId = voucher.RemittanceInfo.CarrierId
        const gqlCarrier = await sdk
            .carrier({carrierId})
            .catch(errors => handleErrors('lookupIdentifiers', {errors}))

        carrierCode = path<string>(['data', 'carrier', 'code'], gqlCarrier)
        if (isNil(carrierCode)) {
            throw new MasteryApiNotFoundError('getCarrier', {
                error: `Unable to find carrier code for: ${carrierId}`
            })
        }
    }
    return {
        carrierIdentifier: {
            carrierId: voucher.RemittanceInfo?.CarrierId || null,
            carrierCode: carrierCode || null
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrors = (query: string, error: any): void => {
    if (isNil(error) || isEmpty(error) || !isGraphQLError(error)) {
        return
    }

    throw new MasteryApiError(query, error)
}
