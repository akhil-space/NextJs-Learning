This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

schema.prisma : // first  use schema  that replaced by prisma adapter schema from next-auth
model User {
  id      Int    @id @default(autoincrement())
  name    String
  email   String @unique
  website String
}

cmd : npx prisma migrate dev