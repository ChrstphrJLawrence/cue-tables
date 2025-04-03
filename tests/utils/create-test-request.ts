// tests/utils/create-test-request.ts

export function createTestRequest({
    url = "/",
    method = "GET",
    formData,
    headers,
  }: {
    url?: string
    method?: string
    formData?: Record<string, string>
    headers?: HeadersInit
  } = {}): Request {
    let body: BodyInit | undefined
  
    if (formData) {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(formData)) {
        params.append(key, value)
      }
      body = params
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      }
    }
  
    return new Request(url, {
      method,
      headers,
      body,
    })
  }
  