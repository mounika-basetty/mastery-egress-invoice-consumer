import {shouldProcessEventType} from '../../src/processor/util'

const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

describe('util event check', () => {
    it('should return true for valid event type', () => {
        expect(shouldProcessEventType('Insert')).to.be.true
    })

    it('should return false for invalid event type', () => {
        expect(shouldProcessEventType('Inserted')).to.be.false
    })

    it('should return false for blank event type', () => {
        expect(shouldProcessEventType('')).to.be.false
    })
})
