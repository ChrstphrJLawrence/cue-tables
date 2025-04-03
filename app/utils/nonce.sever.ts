let nonceCache: string | undefined

export function getNonce(): string {
    if (process.env.NODE_ENV === "development") {
        return "static-dev-nonce"
    }

    if (!nonceCache) {
        nonceCache = crypto.randomUUID()
    }

    return nonceCache
}