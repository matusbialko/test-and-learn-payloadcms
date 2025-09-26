import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  console.log('=== getMediaUrl Debug ===')
  console.log('Input URL:', url)
  console.log('Input cacheTag:', cacheTag)

  if (!url) console.log('URL is empty, returning empty string')

  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
    console.log('Encoded cacheTag:', cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const result = cacheTag ? `${url}?${cacheTag}` : url
    console.log('URL already has protocol, returning:', result)
    return result
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  console.log('Base URL from getClientSideURL():', baseUrl)
  const result = cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
  console.log('Final result:', result)
  console.log('=== End getMediaUrl Debug ===')
  return result
}
