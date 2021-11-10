import {
    defaultShouldFailErrorHandler,
    makeOnError
} from '@masterysystems/external-api-kafka-utils'
import {loggingConfig, shouldSkipErrors} from '../config'

export const onError = makeOnError({
    loggingConfig,
    shouldFailErrorHandler: defaultShouldFailErrorHandler,
    shouldSkipAllErrors: shouldSkipErrors
})
