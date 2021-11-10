import {GraphQLError} from '@masterysystems/lachesis-graphql-client'
import {Message} from 'node-rdkafka'
import {onError} from '../../src/processor/on-error'
import {shouldSkipErrors} from '../../src/config'

import {
    BadDataError,
    MasteryApiError,
    MasteryApiNotFoundError
} from '@masterysystems/external-api-kafka-utils'

const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

const message: Message = {
    value: null,
    size: 1,
    topic: 'test-topic',
    offset: 1,
    partition: 1,
    key: 'test'
}

describe('on error', () => {
    it('should signal to stop processing when an unhandled error occurs', async () => {
        const error = new Error('testing')
        const response = await onError(error, message)
        expect(response).to.not.equal(shouldSkipErrors)
    })

    it('should signal to stop processing when MasteryApiError and Retryable Error', async () => {
        const graphQLError: GraphQLError = {
            message:
                'requestfailed, reason: getaddrinfo ECONNREFUSED x-graphql.dev.internal.masterytms.com',
            path: ['test path'],
            locations: [
                {
                    line: 1,
                    column: 12
                }
            ]
        }
        const error = new MasteryApiError('test', {errors: [graphQLError]})
        const response = await onError(error, message)
        expect(response).to.not.equal(shouldSkipErrors)
    })

    it('should signal to keep processing when MasteryApiError', async () => {
        const graphQLError: GraphQLError = {
            message:
                'requestfailed, reason: test x-graphql.dev.internal.masterytms.com',
            path: ['test path'],
            locations: [
                {
                    line: 1,
                    column: 12
                }
            ]
        }
        const error = new MasteryApiError('test', {errors: [graphQLError]})
        const response = await onError(error, message)
        expect(response).to.be.false
    })

    it('should signal to keep processing when MasteryApiNotFoundError', async () => {
        const errorMsg = {
            error: 'unable to find id: 1234'
        }
        const error = new MasteryApiNotFoundError('test', errorMsg)
        const response = await onError(error, message)
        expect(response).to.be.false
    })

    it('should signal to keep processing when BadDataError', async () => {
        const error = new BadDataError('test')
        const response = await onError(error, message)
        expect(response).to.be.false
    })
})
