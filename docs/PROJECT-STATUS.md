# Project status

Last consolidated: October 17, 2026

## Objective

Attach a QR code to a piece of Media Commons equipment. Scanning the code should open an equipment-aware help page, start the existing CLIve Social Intents chatbot anonymously, and immediately provide help for the scanned item.

The first production candidates are equipment in the Shields Photo Studio:

- Canon EOS R6 Mark II
- Canon RF, EF, and TS-E lenses
- Godox SK400II-V lighting kit
- Orangemonkie Foldio light box

## Chosen proof-of-concept architecture

```text
Equipment QR code
        ↓
One shared static page with asset, room, and id URL parameters
        ↓
Social Intents 1.5 advanced widget
        ↓
CLIve response from its configured instructions and training sources
        ↓
Optional human escalation
```

GitHub Pages is the current test host. A production implementation could later move into CampusPress/Media Commons or an independently hosted application.

## Implemented and verified in source

- One reusable static HTML page supports multiple equipment records.
- URL values are cleaned and length-limited before display/use.
- The asset and room are displayed in the page banner.
- Asset, room, equipment ID, and QR entry point are sent as conversation metadata.
- Social Intents uses the confirmed CLIve widget ID with the advanced 1.5 loader.
- The visitor identity is `Visitor`; the sample `Studio-Gear` routing group was removed.
- The widget opens and `startChat()` is called automatically.
- The initial equipment question is supplied with the loader's `question` setting.
- A `sessionStorage` key prevents repeated automatic openings for the same equipment ID in one tab session.
- A reserved 510-pixel rail prevents the fixed widget from covering desktop content at widths of 1180 pixels and above.
- The page returns to Social Intents' normal overlay behavior on smaller screens.
- The deployed GitHub Pages file matched this repository's `equip-help.html` when checked on October 17, 2026.

## Known limitations

### Initial message rendering

The stable initialization path causes CLIve to receive the opening question and respond, but Social Intents may not show the question as a blue visitor bubble first.

Experiments found:

- Loader `question` setting: reliable response, opening bubble may be absent.
- Immediate `sendMessage()`: visitor bubble can appear after CLIve's response.
- Delayed `sendMessage()`: call is ignored.

The stable prototype uses only the loader `question` setting and avoids a wrongly ordered duplicate.

### Suggested-question buttons

The page calls the documented `SI_API.sendMessage(text)` method. Testing showed that the selected follow-up was not reliably added or submitted, including after the AI had connected. The current UI therefore does not claim confirmed delivery.

Question for Social Intents:

> With the advanced 1.5.js embed and an AI chatbot, is `SI_API.sendMessage(text)` supported after `startChat()`, and does it require a specific readiness event or different API?

### Human escalation

Earlier settings indicated that escalations route to the Slack channel `talkus-archive`. It has not been confirmed that this channel is actively monitored, that notifications reach the responsible staff, or that after-hours contact collection behaves as intended.

### Cross-origin iframe control

Social Intents renders the conversation inside its own cross-domain iframe. The Media Commons/GitHub page cannot directly fill the widget textbox, press Enter, reorder messages, or restyle internal conversation markup. Those behaviors require a supported Social Intents API or configuration.

## Recommended next actions

1. Run the current regression checklist against the published rail version using private browsing and fresh IDs.
2. Confirm automatic startup on iPhone and Android as well as desktop.
3. Send the initial-message and `sendMessage()` questions to Social Intents support.
4. Confirm who owns and monitors human escalation.
5. Demonstrate the rail layout to Media Commons/CampusPress stakeholders.
6. Decide whether production should remain a static shared page, move into CampusPress, or become a small equipment-record application.
7. Create permanent equipment names, room names, and item IDs before generating production QR codes.

## Source provenance

- Git history from `github.com/bds6/qr-demo` records the successive widget experiments.
- January proof-of-concept files are preserved under `archive/legacy-poc/`.
- Training materials are preserved under `references/training/`.
- The September Codex handoff documentation was incorporated into `docs/`.
- The original `/Users/bds6/Documents/Codex/2026-09-06/o-x20` workspace has deliberately not been deleted.

