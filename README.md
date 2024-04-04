# Next App Starter

Clone with: `npx create-next-app@latest my-new-next-app -e https://github.com/ralf-boltshauser/next-app-starter`

## Todo

### Prio

- [ ] paste a fancy dashboard from shadcn into the app route
- [x] tooltip btn
- [ ] SEO
- [ ] think about how to add a blog / docs (should it be a separate app? or just a route? maybe zones?)
- [ ] find beautiful charting library, maybe shadcn has one
- [ ] think about onboarding process that the user can go through and supply more data

### Backlog

- [ ] should be able to reach contact and about etc when signed in? -> either duplicate this to both, or find a better solution with the parallel routes in terms of figuring out and then displaying conditionally useSelectedLayoutSegment
- [ ] build an actual app
- [ ] implement onboarding system
- [ ] proper mobile support
- [ ] think about community features
- [ ] add a blog
- [ ] realtime updates
- [ ] inline stripe checkout
- [ ] internationalization
- [ ] telemetry
- [ ] proper dark mode for everything
- [ ] check out horizon boilerplate what they already have

## Getting Started

- [ ] Development

  - [ ] adjust the app name in the navbar
  - [ ] Visit shadcn/ui for components / theming
  - [ ] Extend the schema.prisma and run `npx prisma generate` to generate the types and `npx prisma migrate dev` to create the database tables. DON'T FORGET TO APPLY MIGRATIONS TO PROD
  - [ ] Implement your functionality in the /app route, otherwise change the callback in auth/sign-in/page.tsx route.
  - [ ] use storybook: `npm run storybook`
  - [ ] Stripe
    - [ ] Create a stripe account
    - [ ] Add the stripe environment variables to the .env file
    - [ ] Create a product for each plan in the stripe dashboard and add the price ids to the plans.ts file.
    - [ ] Create the tiers in the database and add the ids to the access.ts file. Name and ids must match the database tier table.
    - [ ] Create features in the database and add the ids to the access.ts file. Ids must match the database feature table.
    - [ ] Configure the default tier as Tier 0.
    - [ ] Add the webhook to the stripe dashboard. The endpoint is /api/stripe/webhook
    - [ ] Add the stripe webhook secret to the .env file `stripe listen -e customer.subscription.updated,customer.subscription.deleted,checkout.session.completed --forward-to http://localhost:3000/api/stripe/webhook`
  - [ ] Email
    - [ ] Setup SendGrid account
    - [ ] Add the SendGrid environment variables to the .env file
    - [ ] create dynamic templates and add the ids to the mail.ts file
  - [ ] Design System
    - [ ] Have a consistent design system, for every heading of a page use H1 component, if you are not happy with the look of it change the component don't use a different heading component.
  - [ ] Go through all deployment steps, since there are many steps that you need to take for local dev as well, like NEXTAUTH_SECRET etc.

- [ ] Deployment

  - [ ] Go through the development steps!
  - [ ] Change the NEXTAUTH_SECRET in .env to a random string `openssl rand -base64 32`
  - [ ] Create Google Cloud Project
  - [ ] Create a new OAuth client type web app
  - [ ] Add your domain to the google cloud project
  - [ ] Add the callback url for google provider to domain/api/auth/callback/google
  - [ ] Add a localhost:3000 callback url for development
  - [ ] Get a database (maybe in vercel, PlanetScale or just deploy a docker container with a database)
  - [ ] Make a git repo
  - [ ] Deploy the app on vercel
  - [ ] Add the domain to the vercel project
  - [ ] Set the NEXTAUTH_URL to domain without any path
  - [ ] Set the DATABASE_URL to the database url
  - [ ] (Adjust the database type in schema.prisma to the database type if it is not postgres)
  - [ ] PostHog
    - [ ] If you don't want PostHog, remove the providers from root layout and delete the files from components/posthog
    - [ ] Add a PostHog project, add the API key to the .env file and enable session replay!
    - [ ] Add A/B tests https://posthog.com/tutorials/nextjs-ab-tests
  - [ ] Stripe
    - [ ] Add the stripe environment variables to the vercel project
      - [ ] STRIPE_SECRET_KEY
      - [ ] STRIPE_WEBHOOK_SECRET
      - [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    - [ ] Register the webhook endpoint in the stripe dashboard

- [ ] Testing

  - [ ] Install browsers etc `npx playwright install`
  - [ ] Use `npx playwright codegen` to generate tests

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
