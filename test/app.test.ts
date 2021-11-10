import * as processor from '../src/processor'

import {SinonStub} from 'sinon'
import {main} from '../src/app'
import sinon from 'ts-sinon'

const {describe, it, afterEach, beforeEach} = intern.getPlugin('interface.bdd')

const chai = intern.getPlugin('chai')
const {expect} = chai

const sandbox = sinon.createSandbox()

let startStub: SinonStub

describe('app', () => {
    beforeEach(() => {
        startStub = sandbox.stub(processor, 'start')
    })
    afterEach(() => {
        sandbox.reset()
        sandbox.restore()
    })

    it('should be defined', () => {
        expect(main).to.not.be.undefined
    })

    it('should call start', async () => {
        await main()
        expect(startStub.calledOnce).to.be.true
    })
})
