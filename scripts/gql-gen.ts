/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yargs from 'yargs'

import {spawnSync} from 'child_process'

/** Run a command like in the shell: ie "yarn run start" */
const sync = (str: string, opts = {}): any => {
    const [first, ...rest] = str.split(' ')
    const isWindows = process.platform === 'win32'
    const res = spawnSync(first, rest, {
        stdio: 'inherit',
        shell: isWindows,
        ...opts
    })
    if (res.status !== 0) {
        console.log((res.stderr || '').toString())
        throw new Error('Non-successful exit code.')
    }
    return res
}

/** Run a series of shell commands serially */
const runCommands = (commands: string[], opts = {}): void => {
    commands.reduce((_prev, curr) => {
        console.log(`Run: ${curr}`)
        const res = sync(curr, opts)
        if (res.status !== 0) {
            console.log((res.stdout || '').toString())
            console.log((res.stderr || '').toString())
            throw new Error('Non-successful exit code.')
        }
        return res
    }, '')
}

const argv = yargs.argv

runCommands([
    'yarn graphql:download',
    `yarn gql-gen:raw ${argv.watch ? '--watch' : ''}`.trim()
])