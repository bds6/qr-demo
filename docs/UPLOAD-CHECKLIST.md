# Upload and testing checklist

## Publish

1. Open `github.com/bds6/qr-demo`.
2. Replace the contents of `equip-help.html` with the packaged working copy.
3. Commit the change to the GitHub Pages publishing branch.
4. Wait for the Pages workflow in the repository's Actions tab to finish successfully.

## Test automatic startup

1. Open one URL from `TEST-LINKS.md` in a private window.
2. Confirm the asset and room appear correctly in the banner.
3. Confirm the widget opens automatically.
4. Confirm CLIve receives the opening context and gives an equipment-specific response.
5. Note whether Social Intents displays the opening visitor bubble; its absence is a known platform limitation in the current integration.

## Test follow-up behavior

1. After the first response, tap one sample-question button.
2. Confirm the question actually appears in the chat and receives a response. A page status change alone is not proof of delivery.
3. Type a manual follow-up question.
4. Test `Can I speak with a consultant?` after escalation trigger phrases and routing have been configured in Social Intents.

## Test responsive behavior

1. Test on an actual phone after scanning a QR code.
2. Test desktop widths and confirm the widget does not hide essential content after the proposed reserved-rail layout is implemented.
3. Test keyboard focus, accordion expansion, and chat reopening.

## Social Intents settings to verify

- Domain targeting includes the exact GitHub Pages path during testing.
- Production targeting includes the eventual Media Commons page.
- Name and email collection remain disabled for this anonymous QR flow.
- AI chatbot remains available outside human-staff hours if that is the intended service model.
- Human escalation phrases and response text are configured.
- The escalation destination is a monitored Slack channel, inbox, or other agent destination.

