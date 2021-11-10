import {onData} from './on-data'
import {onError} from './on-error'

import {ClientLocator, types} from '@masterysystems/lachesis-kafka-client'
import {consumerConfig, inputTopic, logger, producerConfig} from '../config'

export const start = async (): Promise<void> => {
    const producer = ClientLocator.resolveProducer(producerConfig)
    await producer.connect()

    const subscriptions: types.ConsumerSubscription[] = [
        {
            topic: inputTopic,
            onData,
            onError,
            messageFormat: types.MessageFormat.AVRO
        }
    ]

    const consumer = ClientLocator.resolveConsumer({
        subscriptions,
        ...consumerConfig
    })

    await consumer.connect()

    logger.info(`kafkaConsumer subscribed to topic ${inputTopic}`)
}

export const stop = async (): Promise<void> => {
    const tasks = []
    tasks.push(ClientLocator.disconnectAll())
    await Promise.all(tasks)
}
