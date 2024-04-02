# Next App Starter

Clone with: `npx create-next-app@latest my-new-next-app -e https://github.com/ralf-boltshauser/next-app-starter`

## Todo

- [ ] Stripe
  - [x] payment screen -> plans + checkout
  - [x] profile settings
  - [x] access-button which can be passed a feature and if clicked a popup of the pricing page is shown, through modal parallel routes
  - [x] payment success / failure page
  - [x] only show manage billing if user has a subscription
  - [x] try edge cases
    - [x] upgrade / downgrade plan
  - [ ] testing
    - [ ] figure out how to test stripe with playwright
    - [ ] create subscription
    - [ ] cancel subscription
    - [ ] update subscription
  - [ ] tutorial for readme
    - [ ] creating product
    - [ ] where to add price ids etc
    - [ ] needing to add webhook api endpoint
    - [ ] what secrets to put
- [ ] default landing page
  - [x] create landing page
  - [ ] make it available for dark mode
- [ ] check out horizon boilerplate what they already have
- [ ] internationalization
- [ ] telemetry
- [ ] email
- [x] parallel routes for landing vs signed in state

## Getting Started

- [ ] Deployment

  - [ ] Change the NEXTAUTH_SECRET in .env to a random string `openssl rand -base64 32`
  - [ ] Create Google Cloud Project
  - [ ] Create a new OAuth client type web app
  - [ ] Add your domain to the google cloud project
  - [ ] Add the callback url for google provider to domain/api/auth/callback/google
  - [ ] Add a localhost:3000 callback url for development
  - [ ] Get a database (maybe in vercel, planetscale or just deploy a docker container with a database)
  - [ ] Make a git repo
  - [ ] Deploy the app on vercel
  - [ ] Add the domain to the vercel project
  - [ ] Set the NEXTAUTH_URL to domain without any path
  - [ ] Set the DATABASE_URL to the database url
  - [ ] (Adjust the database type in schema.prisma to the database type)
  - [ ] PostHog
    - [ ] If you don't want PostHog, remove the providers from root layout and delete the files from components/posthog
    - [ ] Add a PostHog project, add the API key to the .env file and enable session replay!
    - [ ] Add A/B tests https://posthog.com/tutorials/nextjs-ab-tests

- [ ] Development

  - [ ] adjust the app name in the navbar
  - [ ] Visit shadcn/ui for components / theming
  - [ ] Extend the schema.prisma and run `npx prisma generate` to generate the types and `npx prisma migrate dev` to create the database tables. DON'T FORGET TO APPLY MIGRATIONS TO PROD
  - [ ] Implement your functionality in the /app route, otherwise change the callback in auth/sign-in/page.tsx route.
  - [ ] use storybook: `npm run storybook`

- [ ] Testing

  - [ ] Use `npx playwright codegen` to generate tests
  - [ ] Install browsers etc `npx playwright install`

- [ ] CI/CD

  - [ ] Setup playwright tests on github actions

- [ ] Check out all TODO comments in the code (todo tree could help)

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
