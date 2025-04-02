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
})