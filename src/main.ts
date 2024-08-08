import * as core from '@actions/core'
import { getOctokit, context } from '@actions/github'

export async function run(): Promise<void> {
  core.debug('Get Octokit')
  core.info(`==> Add comment to PR #${context.payload.pull_request?.number}`)
  const token = core.getInput('token')
  const message = core.getInput('message')
  const octokit = getOctokit(token)
  const pull_number = context.payload.pull_request?.number

  try {
    await octokit.rest.pulls.createReview({
      ...context.repo,
      // @eslint-disable
      // @ts-ignore
      pull_number,
      // @eslint-enable
      event: 'COMMENT',
      body: message
    })
  } catch (err: any) {
    core.setFailed(`==> ${err.message}`)
  }
}
