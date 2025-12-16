# PseudoConsoleHomePage

A modern Next.js application with React and TypeScript, featuring server-side rendering.

## Features

- ⚡ Next.js 16 with App Router
- ⚛️ React 19
- 📘 TypeScript
- 🖥️ Server-Side Rendering (SSR) components
- 🎨 Modern CSS styling

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout component
  - `page.tsx` - Main page (empty page)
  - `globals.css` - Global styles
- `components/` - React components
  - `ServerComponent.tsx` - Example server-side rendered component

## Server Components

By default, components in the App Router are Server Components. They:
- Run on the server
- Can directly access server-side resources (databases, APIs, etc.)
- Reduce client-side JavaScript bundle size
- Improve performance and SEO
