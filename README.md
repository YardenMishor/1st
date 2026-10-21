# פּוֹפּ

Pastel bubble task manager in Hebrew. Personal/work filters, draggable bubbles, optional task metadata, in-app reminders, a compact layout, and a free-play bubble break. Tasks are stored locally in the browser (not synced across devices).

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci --cache /tmp/pop-npm-cache
npm run dev
```

`npm run build` creates a production build. `npm run preview` serves it for validation.

Reminders require the page to be open; background push notifications and always-on-top native windows are not implemented. The side mode is a compact layout. No account or external API is required.
