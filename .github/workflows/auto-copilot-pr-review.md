---
description: Automatically request Copilot code review for pull requests.
on:
  pull_request:
    # Intentionally omit `synchronize` so Copilot's own push commits
    # (after an implementation handoff) do not re-trigger this workflow.
    types: [opened, reopened]
  pull_request_review:
    types: [submitted, edited]
  # Required: the default membership check (`on.roles`) calls the repo
  # collaborator permission API for `github.actor`. When the actor is the
  # Copilot bot identity, that API errors with "Copilot is not a user" and
  # fails pre-activation before `skip-bots` is evaluated. Allowing all roles
  # bypasses the membership check; safety is preserved by
  # `safe-outputs.add-comment.max: 1` and the skip-bots loop guard below.
  roles: all
  # Belt-and-suspenders loop prevention: also drop events whose actor is
  # the Copilot or github-actions bot.
  skip-bots: [copilot, github-actions]
permissions:
  contents: read
  pull-requests: read
  issues: read
tools:
  github:
    toolsets: [default]
safe-outputs:
  # Actually requests Copilot as a PR reviewer via the GitHub API
  # instead of posting an `@copilot review` mention comment.
  # The literal token `copilot` is recognized by gh-aw and mapped to the
  # Copilot PR reviewer bot — do NOT use the human-readable
  # `copilot-pull-request-reviewer` login here, because the
  # requested_reviewers API requires the target to be a repo collaborator
  # and rejects raw bot logins with "Reviews may only be requested from
  # collaborators."
  add-reviewer:
    reviewers: [copilot]
    max: 1
  # Used only for the conditional implementation handoff after Copilot's
  # review surfaces actionable suggestions.
  add-comment:
    max: 1
  noop: {}
---

# Auto Copilot PR Review

You are an AI workflow agent that ensures pull requests get Copilot assigned as a code reviewer and only posts a Copilot implementation handoff comment after review suggestions exist.

## Your Task

1. Confirm the trigger references a pull request (`pull_request` or `pull_request_review`).
2. Check whether the Copilot PR reviewer bot (`copilot-pull-request-reviewer[bot]` / `copilot-pull-request-reviewer`) is already a requested reviewer or has already submitted a review on the pull request.
3. If Copilot is not already a requested reviewer and has not already reviewed, request Copilot as a reviewer using the `add-reviewer` safe output with the reviewer value exactly `copilot` (the special token recognized by gh-aw — do NOT pass `copilot-pull-request-reviewer`, the API rejects bot logins).
4. Inspect review outcomes and review comments to determine whether actionable suggestions are present (a review with state `CHANGES_REQUESTED` or any non-empty review comments count as actionable).
5. Only if actionable suggestions exist AND there is no existing implementation handoff comment from this workflow, post one concise comment with the `add-comment` safe output:

@copilot please implement the requested simple changes directly in this PR and summarize what you changed.

## Rules

- Do not request Copilot as a reviewer more than once per PR.
- Do not post duplicate implementation handoff comments.
- Never post the implementation handoff before review suggestions exist.
- If Copilot has already been requested as a reviewer but no actionable suggestions exist yet, call `noop` with a brief explanation.
- If the implementation handoff already exists, call `noop` with a brief explanation.
- Keep output minimal and deterministic.
