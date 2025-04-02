import { expect, describe, it } from "vitest"
import { getDurationSince } from "./time"


describe("getDurationSince", () => {
    it("shows minutes correctly", () => {
        const now = new Date()
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
        expect(getDurationSince(fiveMinutesAgo)).toBe("5m")
    })

    it("shows hours correctly", () => {
        const now = new Date()
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
        expect(getDurationSince(oneHourAgo)).toBe("1h")
    })

    it("shows combined hours and minutes correctly", () => {
        const now = new Date()
        const oneHourAndTenMinutesAgo = new Date(now.getTime() - 70 * 60 * 1000)
        expect(getDurationSince(oneHourAndTenMinutesAgo)).toBe("1h 10m")
    })

    it("works if the date is a string", () => {
        const now = new Date()
        const oneHourAndTenMinutesAgo = new Date(now.getTime() - 70 * 60 * 1000)
        expect(getDurationSince(oneHourAndTenMinutesAgo.toISOString())).toBe("1h 10m")
    })
    
})