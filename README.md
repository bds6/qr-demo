# CLIve Equipment QR Assistant

This repository is the canonical working record for the CLIve equipment-help QR-code prototype.

The prototype connects a QR code on a physical item to one shared equipment-help page. The page reads the equipment context from the URL, opens the existing CLIve Social Intents chatbot, and starts an anonymous equipment-specific conversation.

## Current prototype

- Source: [`equip-help.html`](equip-help.html)
- Published page: <https://bds6.github.io/qr-demo/equip-help.html>
- GitHub repository: <https://github.com/bds6/qr-demo>
- Current interface: Media Commons-styled page with a reserved desktop chat rail and mobile overlay behavior

Example URL:

```text
https://bds6.github.io/qr-demo/equip-help.html?asset=Orangemonkie%20Foldio&room=Shields%20Photo%20Studio&id=FOLDIO-001
```

The URL parameters are:

- `asset`: equipment name shown on the page and passed to CLIve
- `room`: equipment location shown on the page and passed as metadata
- `id`: identifier for the physical item and session duplicate guard

## Repository map

```text
equip-help.html                  Current deployed static prototype
docs/
  PROJECT-STATUS.md              What works, open questions, and next steps
  LEARNINGS.md                   Technical findings from the experiments
  ARCHITECTURE.md                Current integration design
  TEST-LINKS.md                  Equipment test URLs
  UI-OPTIONS.md                  Layout approaches considered
  UPLOAD-CHECKLIST.md            Publishing and regression checks
references/training/             Original proof-of-concept training materials
archive/legacy-poc/              Early January HTML and Social Intents notes
prototypes/nextjs-exploration/   Preserved application-framework exploration
```

## Current status

The page layout, URL parsing, anonymous visitor identity, equipment metadata, automatic widget opening, initial equipment prompt, and refresh guard are implemented.

Two Social Intents behaviors remain unresolved:

1. The reliable initial-question mechanism can trigger CLIve's response without displaying the visitor's opening message as a blue chat bubble.
2. The documented `SI_API.sendMessage(text)` method has not reliably submitted the page's suggested follow-up questions in this AI-chatbot configuration.

Human escalation routing also needs to be verified with the team that monitors Social Intents/Slack.

See [`docs/PROJECT-STATUS.md`](docs/PROJECT-STATUS.md) before making changes.

## Working conventions

- Treat `main` and the root `equip-help.html` as the current deployable baseline.
- Preserve failed or superseded approaches in Git history instead of adding numbered copies to the root.
- Record important findings in `docs/LEARNINGS.md`.
- Use a fresh test `id` or a private browser session when testing automatic startup.
- Do not put API keys, private information, or administrative credentials in the HTML or QR parameters.
