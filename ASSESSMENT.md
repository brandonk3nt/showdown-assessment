# Model Showdown — Candidate Assessment

## What this is

**Model Showdown** is a React + TypeScript app where a user enters a prompt, two anonymous AI models respond side by side, and the user picks a winner.

This codebase has known rough edges: bugs, inconsistent UI, and code-quality issues. We have deliberately left them in. Your job is to **explore the app, find and fix problems, clean up the code, and improve the UI**.

We are not going to hand you a list of bugs. Part of what we are evaluating is whether you can navigate an unfamiliar codebase, spot what is wrong, and decide what matters most.

## Ground rules

- **Time box: aim for ~1 hour.** You are not expected to fix everything. We would much rather see a few high-impact changes done well than a broad, shallow pass. Partial submissions are completely fine — just tell us what you would do next in `NOTES.md`.
- **Depth over breadth.** Prioritize. Explain what you chose to skip and why.
- **AI tools are allowed.** Use whatever you normally would. Note that AI can write code quickly but will not do the thinking for you — finding the real issues, prioritizing them, and verifying your fixes actually work is the part we care about. You own everything you submit and should be able to explain every change.
- **Libraries / approach:** you may add libraries, refactor, or restructure as you see fit, as long as you keep the Showdown concept and avoid a full rewrite. Justify non-trivial choices in `NOTES.md`.
- **We may do a short follow-up** where we ask you to walk through a bug you found and your fix. Be ready to explain your reasoning, not just the diff.

## Getting started

1. Get the app running locally (see [README.md](./README.md)).
2. Walk through the main flow: enter a prompt → **Begin!** → compare two model responses → choose a winner.
3. Poke at the edges. Try empty prompts, run several rounds, resize the window, watch the network/websocket, and read the console.

## Your task

### 1. Find and fix bugs

Explore the app and its code, identify things that are broken or behave incorrectly, and fix them. We are interested in how you find issues, how you prioritize them, and whether your fixes are correct and focused. Prefer improving the existing code over rewriting the whole app from scratch.

### 2. Improve code quality

Leave the code better than you found it. Look for things like:

- Component structure and separation of concerns
- State and effect management
- TypeScript types and correctness
- Shared constants, helpers, and dead/duplicated code
- Consistency in how things are styled and organized

Make focused, well-reasoned changes. We value judgment over volume.

### 3. Improve the UI/UX

We expect visible improvements to the experience, not only code fixes. Aim for several of the following:

- Clearer visual hierarchy (title, prompt area, two model panels, actions)
- Better spacing, alignment, and responsiveness (desktop + mobile)
- Clear **loading**, **empty**, and **error** states
- A more obvious "choose model" / winner flow (don't leave critical actions invisible or confusing)
- Consistent styling (the app currently mixes approaches and looks unfinished in places)
- Basic accessibility: real buttons, focus states, readable contrast, keyboard-friendly controls

You do **not** need a full rebrand or pixel-perfect design system. Keep the Showdown concept, but make it feel intentional and usable.

### 4. Integrate the Models API (required)

Today the app picks opponents from a **hardcoded** model list (`MODEL_OPTIONS`). Replace that hardcoded list by calling the same **Models API** used by our other apps.

#### Endpoint (dev)

```http
GET https://api-dev-poc.aiml.asu.edu/model
Authorization: Bearer <your VITE_DEV_TOKEN>
```

Use the same `VITE_DEV_TOKEN` from your `.env` (the token you already use for the localhost WebSocket auth). Do not move the token or any secrets into places they shouldn't live.

#### What to implement

1. Fetch models from the API on load.
2. Map the response into what Showdown needs for a matchup (at least `name` / display label, `key` / model id, and `provider`).
3. Use the fetched list in `getTwoRandomModels` (or equivalent) instead of the hardcoded constant.
4. Handle loading and error states. A documented fallback to the hardcoded list is acceptable.

#### Response shape (simplified)

The JSON payload includes a `models` array. Typical fields per model:

| Field          | Use                                                 |
| -------------- | --------------------------------------------------- |
| `name`         | Model id / key used when querying                   |
| `provider`     | Provider string (required by the websocket payload) |
| `display.name` | Human-readable label                                |
| `is_active`    | Prefer only active models                           |
| `capabilities` | Optional; ignore unless useful                      |

Example mapping idea:

```ts
{
  key: model.name,
  name: model.display?.name ?? model.name,
  provider: model.provider,
}
```

## What we care about

- Can you spot real problems quickly and prioritize the high-impact ones?
- Are your changes correct, focused, and easy to follow?
- Does the **UI become clearly better** than what you started with?
- Is the Models API integration robust (loading, errors, sensible fallback)?
- Do you avoid unnecessary rewrites?

## Out of scope

Please do **not** spend time on:

- Real authentication / CAS login flows beyond using the provided dev token
- Deploying the app
- A complete visual rebrand from zero

Optional stretch (only if you have finished the required work):

- Restore / improve the timer or leaderboard in a useful way
- Connection status / retry messaging for WebSocket issues
- Deeper accessibility polish

## Deliverable

When you are done, include a short note in `NOTES.md` covering:

1. Bugs / issues you found, **how you found them**, and how you prioritized them
2. What you changed and **why** (include **UI changes** and **code-quality changes**) — focus on your reasoning, not just a list of edits
3. How you implemented the **Models API integration** (including how you handled loading, errors, and fallback)
4. What you deliberately chose **not** to do given the time box, and what you would do next with more time

This file is a big part of how we evaluate you. We are more interested in your reasoning than in the length of the diff.

Good luck!
