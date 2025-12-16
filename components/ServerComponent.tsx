// This is a Server Component (default in Next.js App Router)
// Server Components run on the server and can directly access server-side resources

async function getServerData() {
  // Simulate server-side data fetching
  // In a real app, this could be a database query, API call, etc.
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  return {
    timestamp: new Date().toISOString(),
    message: 'This content was rendered on the server',
  }
}

export default async function ServerComponent() {
  const data = await getServerData()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Server-Side Rendered Component</h1>
      <p>{data.message}</p>
      <p>Server timestamp: {data.timestamp}</p>
    </div>
  )
}

