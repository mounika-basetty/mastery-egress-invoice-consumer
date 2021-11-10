import exitHook from 'async-exit-hook'
import {logger} from './config'

import {start, stop} from './processor'

import 'newrelic'

export const main = async (): Promise<void> => {
    try {
        logger.info('starting processor')
        await start()

        exitHook(
            async (cb: () => void): Promise<void> => {
                await stop()
                cb()
            }
        )

        logger.info('processor started')
    } catch (error) {
        logger.error(`error while starting processor: ${error}`)
        // for testing app start sequence
        if (require.main === module) {
            process.exit(error.code || 1)
        } else {
            throw error
        }
    }
}

main()
