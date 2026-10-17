# Architecture and implementation notes

## User flow

`Equipment QR code → shared equipment-help page → Social Intents widget → CLIve response → optional human support`

Every QR code points to the same page. Equipment context is supplied through URL parameters, so the project does not require a separate page for every item.

## Dynamic equipment data

The page reads:

```text
asset
room
id
```

Example:

```text
?asset=Godox%20SK400II-V&room=Shields%20Photo%20Studio&id=LIGHT-SK400-001
```

The page cleans these values, places the asset and room into the visible banner, and retains the ID as hidden conversation metadata.

## Social Intents integration

The prototype uses the supported 1.5 advanced loader:

```javascript
socialintents.load({
  app_id: WIDGET_ID,
  alignment: "right",
  horizontal_padding: "25px",
  name: "Visitor",
  email: "",
  question: openingQuestion,
  custom1: equipment.asset,
  custom2: equipment.room,
  custom3: equipment.id
});
```

When `onSIApiReady` fires, the page adds named metadata, opens the popup, and starts the chat.

The routing group is intentionally blank. The former `Studio-Gear` value came from sample code and would only be appropriate if a matching Social Intents group or department were configured.

## Why the widget floats

Social Intents creates its own cross-domain iframe and applies fixed positioning. The host page's central button calls the widget API to open the popup; the button is not a container into which the iframe is inserted.

## Why the inline iframe was not selected

Social Intents provides a standalone iframe URL, which can be embedded in a normal page column. It solves overlap, but creates a control problem:

- The iframe is hosted on `chat.socialintents.com`.
- The page is hosted on `bds6.github.io` or `mediacommons.psu.edu`.
- Browser same-origin rules prevent the parent page from reaching into the iframe to fill its textbox or press Start Chat.
- The current floating-widget SDK methods operate on the standard/advanced widget integration, not an arbitrary standalone iframe controlled by the parent page.

An iframe retry is worthwhile only if Social Intents confirms a supported query parameter, initialization setting, or `postMessage` interface for supplying and automatically submitting the initial question.

## Session behavior

The page stores a session-only key such as:

```text
clive-opening:LIGHT-SK400-001
```

This prevents a refresh from creating repeated automatic opening questions for the same item. `sessionStorage` normally ends when the browser tab/session closes. During development, a new test ID or a new private browsing session creates a clean test.

## Security and privacy notes

- The widget ID is a public embed identifier, not a secret.
- Keep Social Intents domain targeting restricted to approved URLs.
- Do not put API keys or confidential data in this HTML or in QR parameters.
- Treat `asset`, `room`, and `id` as untrusted visitor-supplied context.
- The anonymous visitor name is `Visitor`; name and email collection are disabled for this flow.

## Hosting strategies considered

1. **CampusPress-native:** place the page and JavaScript directly on Media Commons, with CampusPress approval and possibly a WordPress data source.
2. **Static shared page:** the current GitHub Pages approach, with context encoded in each QR URL and no database.
3. **Independent application:** a separately hosted app with a database/API and short opaque equipment IDs, offering the most control and scalability.

## Reference documentation

- Social Intents JavaScript SDK: `https://www.socialintents.com/docs/widget-setup/javascript-sdk-variables-popups`
- Social Intents widget settings: `https://app.socialintents.com/docs/widget-setup/widget-settings-configuration`
- Social Intents targeting guidance: `https://help.socialintents.com/article/63-the-wrong-widget-is-displaying-on-my-website`
- GitHub Pages publishing source: `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site`
