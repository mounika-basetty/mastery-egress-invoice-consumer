import {validateParse} from '../src/config'

const {describe, it} = intern.getPlugin('interface.bdd')

const chai = intern.getPlugin('chai')
const {expect} = chai

describe('Validate Parse', () => {
    it('should throw error if env is not defined', () => {
        const field = 'TEST_ENV'
        expect(() => validateParse(field)).to.throw(
            `value for ${field} must be defined`
        )
    })

    it('should throw error if env is defined but empty', () => {
        const field = 'TEST_ENV'
        process.env.TEST_ENV = ''
        expect(() => validateParse(field)).to.throw(
            `value for ${field} must be defined`
        )
    })

    it('should not throw error if env is defined', () => {
        const field = 'TEST_ENV'
        process.env.TEST_ENV = 'Test'
        expect(validateParse(field)).to.equal('Test')
    })
})
