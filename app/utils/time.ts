export function getDurationSince(date: Date | string): string {
    const now = new Date()
    const timestamp = typeof date === "string" ? new Date(date) : date
    const diffMs = now.getTime() - timestamp.getTime()
  
    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}h ${remainingMinutes}m`
    } else if (hours > 0) {
        return `${hours}h`
    } else {
        return `${minutes}m`
    }
  }
  