# Technical learnings and decisions

## Social Intents integration

- The CLIve widget uses ID `2c9fa6c396f04ed90196f3ef06ce04f4`.
- The widget ID is a public embed identifier, not an OpenAI or administrative secret.
- The 1.5 advanced loader is required for programmatic settings such as visitor identity, initial question, and custom metadata.
- The earlier app ID ending in `000b` belonged to representative sample code and should not be reused.
- Disabling the pre-chat questions panel permits the anonymous path; fabricating visitor email addresses is unnecessary.
- `Visitor` is clearer than `You` in transcripts and staff notifications.
- `Studio-Gear` was a routing-group value, not a descriptive tag. It was removed because no corresponding configured group was established.

## Opening-question behavior

- Supplying `question` during loader initialization is the most reliable way found to trigger the AI response.
- Calling `sendMessage()` immediately as a duplicate can render the visitor message after the AI response.
- Calling `sendMessage()` later from `onChatOpened` or a timeout was ignored in testing.
- The prototype therefore favors reliable context and response over displaying an incorrectly ordered opening bubble.

## Session testing

- The duplicate guard is `clive-opening:<equipment-id>` in `sessionStorage`.
- Refreshing the same item in the same tab should not repeatedly trigger the opening question.
- A fresh test ID, a new browser session, or private browsing provides a clean automatic-startup test.
- Permanent equipment does not need changing IDs in production; each physical item should keep one stable ID.

## Iframe and layout constraints

- Social Intents owns the fixed cross-domain iframe used by the widget.
- The host page can invoke documented widget methods but cannot manipulate the iframe's internal DOM.
- A standalone inline iframe would solve placement but not automatic textbox control unless Social Intents supplies a query parameter, initialization option, or `postMessage` API.
- Reserving page space for the existing floating widget is therefore the least disruptive desktop layout strategy.

## URL and data design

- `asset`, `room`, and `id` values are context, not authorization.
- Visitors can edit URL parameters; the bot and staff must treat them as untrusted metadata.
- No confidential data or secret keys belong in the page source or QR URLs.
- A future production application could replace verbose URL parameters with a short stable ID and server-side equipment record.

## Hosting options considered

1. Static GitHub Pages prototype: fastest and simplest for proving the workflow.
2. CampusPress-native page: best official URL and site integration if custom JavaScript is approved.
3. Independently hosted application: strongest data validation and scalability, but introduces hosting and maintenance responsibilities.

The intended progression was to prove the behavior statically before committing to a production platform.

