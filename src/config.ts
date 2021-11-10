import {ConsumerTopicConfig} from 'node-rdkafka'
import {GraphQLConfig} from '@masterysystems/lachesis-graphql-client'
import {TopicName} from '@masterysystems/topic.accounting.vendor.voucher.v1'
import {types} from '@masterysystems/lachesis-kafka-client'

import {
    LachesisLoggerOptions,
    LogLevel,
    resolveLogger
} from '@masterysystems/lachesis-pino-logger'

export const validateParse = (field: string): string => {
    const value = process.env[field]
    if (
        value === undefined ||
        value === null ||
        value === '' ||
        value.length === 0
    ) {
        throw new TypeError(`value for ${field} must be defined`)
    } else {
        return value
    }
}

const isSentryEnabled = process.env.DISABLE_SENTRY !== 'true'

export const inputTopic = TopicName

export const loggingConfig: LachesisLoggerOptions = {
    prettyPrint: process.env.PINO_PRETTY_PRINT === 'true',
    level: validateParse('PINO_LOG_LEVEL'),
    disableSentry: isSentryEnabled,
    sentry: isSentryEnabled
        ? {
              dsn: validateParse('SENTRY_DSN'),
              environment: validateParse('SENTRY_ENVIRONMENT'),
              level: LogLevel.error
          }
        : undefined
}

/** Default logger */
export const logger = resolveLogger(loggingConfig)

const disabledSentryLogger = resolveLogger({
    ...loggingConfig,
    disableSentry: true,
    sentry: undefined
})
const schemaRegistryUrl = validateParse('LACHESIS_KAFKA_SCHEMA_REGISTRY')
const topicConfig: ConsumerTopicConfig = {
    'auto.offset.reset': 'earliest'
}

export const producerConfig: types.ProducerLocatorOptions = {
    name: validateParse('OUTBOUND_KAFKA_CLIENT_ID'),
    producerConfig: {
        'metadata.broker.list': validateParse('OUTBOUND_KAFKA_BROKER_LIST'),
        'client.id': validateParse('OUTBOUND_KAFKA_CLIENT_ID'),
        'security.protocol': 'sasl_ssl',
        'sasl.mechanisms': 'PLAIN',
        'sasl.username': '$ConnectionString',
        'sasl.password': validateParse('OUTBOUND_KAFKA_PASSWORD')
    },
    schemaRegistryUrl,
    logger: disabledSentryLogger
}

type KafkaConsumerOptionsWithoutSubs = Omit<
    types.KafkaConsumerOptions,
    'subscriptions'
>

export const consumerConfig: KafkaConsumerOptionsWithoutSubs = {
    name: validateParse('KAFKA_CONSUMER_CLIENT_ID'),
    consumerConfig: {
        'client.id': validateParse('KAFKA_CONSUMER_CLIENT_ID'),
        'group.id': validateParse('KAFKA_CONSUMER_GROUP_ID'),
        'metadata.broker.list': validateParse('KAFKA_CLIENT_BROKERS'),
        'enable.auto.commit': false,
        'socket.keepalive.enable': true
    },
    topicConfig,
    schemaRegistryUrl,
    logger: disabledSentryLogger,
    newRelicTransactionConfig: {
        transactionName: 'Egress Voucher Consumer OnData'
    },
    useFlowMode: true,
    consumerIntervalMs: 250
}

export const graphQLConfig: GraphQLConfig = {
    endpoint: validateParse('GRAPHQL_ENDPOINT'),
    client_id: validateParse('IDP_CLIENT_ID'),
    client_secret: validateParse('IDP_CLIENT_SECRET'),
    audience: validateParse('IDP_AUDIENCE'),
    token_endpoint: validateParse('IDP_TOKEN_ENDPOINT')
}
export const outboundTopic = validateParse('OUTBOUND_VOUCHER_TOPIC')

export const shouldSkipErrors = validateParse('SHOULD_SKIP_ERRORS') === 'true'
