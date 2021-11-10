import {HRTimer} from '../../src/util/hr-timer'

const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

describe('HRTimer', () => {
    const sleep = (ms: number): Promise<unknown> => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    it('should tracking timing information', async () => {
        const timer = HRTimer.start()

        await sleep(100)

        const passageOfTime = timer.stop()

        expect(passageOfTime).to.be.greaterThan(0.09)
    })
})
