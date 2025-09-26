import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  console.log('=== getClientSideURL Debug ===')
  console.log('canUseDOM:', canUseDOM)
  console.log('NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)

  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    const result = `${protocol}//${domain}${port ? `:${port}` : ''}`
    console.log('Using DOM values - protocol:', protocol, 'domain:', domain, 'port:', port)
    console.log('Result from DOM:', result)
    return result
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  const result = process.env.NEXT_PUBLIC_SERVER_URL || ''
  console.log('Using NEXT_PUBLIC_SERVER_URL or empty string:', result)
  console.log('=== End getClientSideURL Debug ===')
  return result
}
