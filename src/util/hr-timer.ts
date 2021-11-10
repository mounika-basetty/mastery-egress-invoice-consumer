export class HRTimer {
    static start = (): HRTimer => new HRTimer()

    start: [number, number]
    start_timestamp: number
    delta?: [number, number]
    result?: number
    stop_timestamp?: number

    constructor() {
        this.start_timestamp = Date.now()
        this.start = process.hrtime()
    }

    stop(): number {
        this.stop_timestamp = Date.now()
        this.delta = process.hrtime(this.start)
        this.result = this.delta[0] * 1000 + this.delta[1] / 1000000
        return Math.round(this.result) * 0.001
    }
}
