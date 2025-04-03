import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { TableCard } from "#app/components/TableCard"
describe("TableCard", () => {
    it("renders table name and availability", () => {
        render(<TableCard table={{
            id: 1,
            name: "Table 1",
            inUse: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            sessions: []
        }}   />)

        expect(screen.getByText("Table 1")).toBeInTheDocument()
        expect(screen.getByText("Available")).toBeInTheDocument()
        expect(screen.getByText("No session in progress")).toBeInTheDocument()
    })
    it("renders in use when the table is in use", () => {
        render(<TableCard table={{
            id: 1,
            name: "Table 1",
            inUse: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            sessions: [
                {
                    id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    tableId: 1,
                    startedAt: new Date(),
                    endedAt: null,
                    createdById: null,
                    formattedStartedAt: "12:00",
                }
            ]
        }} />)
        expect(screen.getByText("In Use")).toBeInTheDocument()
        expect(screen.getByText("Mark Available")).toBeInTheDocument()
    })
})
