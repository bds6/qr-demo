# UI options for the floating widget

## Implemented in this package: responsive reserved chat rail

On desktop widths, this prototype reserves 510 pixels on the right for the widget. The main page content uses the remaining width and no longer sits beneath the widget.

Conceptually:

```text
┌───────────────────────────────┬──────────────────┐
│ Equipment context             │                  │
│ Suggested questions           │  Open CLIve      │
│ About / human support         │  widget rail     │
│                               │                  │
└───────────────────────────────┴──────────────────┘
```

Implementation direction:

- The rail appears at 1180 pixels and wider.
- The entire document—including header and footer—uses the remaining left portion of the viewport.
- On narrow screens, the reserved rail disappears and the widget behaves as its normal overlay.
- The rail remains reserved while the widget is minimized. This is intentional in the stakeholder prototype so the proposed layout is always visible.

This preserves automatic opening and the known working initial-question behavior.

## Option 2: chat-first minimal page

Reduce the landing page to the equipment banner, chat status, and human-support shortcut above the fold. Put explanations, sample questions, and the footer below. When the floating chat opens, it covers less meaningful content.

Advantages:

- Small implementation change.
- Works with the existing widget behavior.
- Especially appropriate because QR visitors primarily want the chat.

Disadvantage:

- The widget still overlaps something on large screens; the underlying content is simply less important.

## Option 3: open chat only after a deliberate tap

Do not open the widget automatically. Show a dominant `Start equipment help` button. After the visitor taps it, open and start the chat.

Advantages:

- No unexpected obstruction while reading the page.
- A user gesture may make SDK behavior more reliable.
- Clearer accessibility and user-control model.

Disadvantage:

- Adds one tap and departs from the original scan-and-immediately-answer goal.

## Option 4: desktop side rail, mobile automatic overlay

Automatically open the widget on phones, where it effectively becomes the primary interface. On desktops, either reserve a right rail or wait for the visitor to tap the chat button.

Advantages:

- Optimizes for the actual QR-scanning audience.
- Avoids the awkward desktop overlay demonstrated in current screenshots.

## Option 5: retry the inline iframe

Embed the standalone chat URL in a centered page container.

Advantages:

- Predictable layout with no overlap.
- Chat can be the central page content.

Risks and unresolved questions:

- Parent JavaScript cannot manipulate a cross-origin iframe directly.
- It is not yet established that the standalone iframe accepts equipment context and automatically submits the opening question.
- The floating-widget SDK may not control the standalone iframe.

Before implementing this option, ask Social Intents:

> Does the standalone iframe support a documented query parameter, JavaScript initialization option, or postMessage API that can set visitor metadata, set the initial question, start the chat, and submit that question automatically?

## Option 6: customize widget dimensions and placement in Social Intents

Use the Social Intents CSS & JavaScript settings to reduce the desktop widget width/height or change its placement. This should be tested carefully because the custom code runs in the vendor-controlled widget and may depend on internal class names.

Advantages:

- Leaves the page mostly unchanged.

Disadvantages:

- More fragile across vendor updates.
- May still overlap the page.

## Suggested decision

Start with the responsive reserved chat rail. It changes only the page layout, preserves the working integration, and directly addresses the overlap visible in the screenshots. Keep the iframe experiment as a separate proof of concept rather than replacing the working baseline.
