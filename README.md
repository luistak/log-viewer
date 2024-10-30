# 🪵 Log Viewer :eyes:

This project is a simple web application that renders a list of [log records](https://opentelemetry.io/docs/concepts/signals/logs/) from an OTLP logs
endpoint.

## Requirements 📦

- [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Node 20+](https://github.com/nvm-sh/nvm#installing-and-updating)

## Getting Started ✍️

Run the following commands:

```bash
nvm use             # change the node version to the supported
npm i               # install local dependencies
```

## Development 💻

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result;

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Next Steps

Given the short time to create this app here is the following features and enhancements i would do:

1. Styling: Enhance the current experience aligning with the company design team adapting the headless ui to follow proper guidelines;
2. Customize 404 and error boundaries styles;
3. Discuss modularization and next steps of this PoC, wether we should separate the code by features or specific domains;
4. Create an e2e test covering the major features without mocking any request.
