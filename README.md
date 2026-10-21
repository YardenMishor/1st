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

## Personal accounts (Supabase)

Until configured, the app explicitly runs a temporary demo. Demo changes are not persisted. Old unscoped localStorage tasks are not imported into an account automatically, preventing another person using that browser from receiving them.

1. Create a Supabase project and execute `supabase-setup.sql` in its SQL editor. The table uses row level security: authenticated users can read and write only their own row. Anonymous requests receive no access. Shared boards are not implemented.
2. In Authentication → URL Configuration, set Site URL to the deployed Netlify URL and add that exact URL to Redirect URLs. Enable email authentication and email confirmation. Production use should configure SMTP and rate limits in Supabase.
3. In Netlify project environment variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` using the project URL and **public publishable** key (a legacy anon key also works). Never use the service-role key. Redeploy after adding variables. Local development uses `.env.local`.
4. Test with two separate email accounts: create a task in account A, sign out, then sign in as B. B must have an empty board. Also verify directly with each authenticated Supabase client that selecting/updating account A's user_id from account B returns no rows / a policy error. SQL is supplied but these live access checks require a configured Supabase project.

Tasks are saved to each account in Supabase; authentication sessions use the browser's standard persistent session storage. Sign out on shared devices. The app displays failures and allows retrying unsaved changes through the account dialog. Reminder checks run only while the app is open.

## Game

NEON FLOAT: hold pointer or Space to rise; release to fall. Pass gates and collect stars. Speed increases with score. Escape pauses. Leaving the window pauses automatically. Game score is local only; it never changes tasks. Sound is opt-in.
