import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { TableCard } from "#app/components/TableCard"
import { useOptionalUser, userHasRole } from "#app/utils/user"

vi.mock("#app/utils/user")

const mockTable = {
    id: 1,
    name: "Table 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    sessions: [] as any[],
}

const mockTableWithSession = {
    ...mockTable,
    inUse: true,
    sessions: [{
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        tableId: 1,
        startedAt: new Date(),
        endedAt: null,
        createdById: null,
        formattedStartedAt: "12:00",
    }]
}

const mockAdminUser = {
    id: "1",
    name: "Admin User",
    username: "admin",
    image: null,
    roles: [{ 
        name: "admin",
        permissions: []
    }],
}

const mockRegularUser = {
    id: "2",
    name: "Regular User",
    username: "user",
    image: null,
    roles: [{ 
        name: "user",
        permissions: []
    }],
}

describe("TableCard", () => {
    describe("when logged in as admin", () => {
        beforeEach(() => {
            vi.mocked(useOptionalUser).mockReturnValue(mockAdminUser)
            vi.mocked(userHasRole).mockReturnValue(true)
        })

        it("renders table and availability when not in use", () => {
            render(<TableCard table={{ ...mockTable, inUse: false }} />)

            expect(screen.getByText("Table 1")).toBeInTheDocument()
            expect(screen.getByText("Available")).toBeInTheDocument()
            expect(screen.getByText("No session in progress")).toBeInTheDocument()
            expect(screen.queryByText("Mark In Use")).toBeInTheDocument()
        })

        it("renders in use when the table is in use", () => {
            render(<TableCard table={mockTableWithSession} />)
            
            expect(screen.getByText("In Use")).toBeInTheDocument()
            expect(screen.getByText(/Started at:.*12:00/i)).toBeInTheDocument()
            expect(screen.getByText(/In Use for:.*m/i)).toBeInTheDocument()
            expect(screen.getByText("Mark Available")).toBeInTheDocument()
        })
    })

    describe("session buttons are not visible when logged in as non-admin", () => {
        beforeEach(() => {
            vi.mocked(useOptionalUser).mockReturnValue(mockRegularUser)
            vi.mocked(userHasRole).mockReturnValue(false)
        })

        it("does not render admin buttons", () => {
            render(<TableCard table={{ ...mockTable, inUse: false }} />)

            expect(screen.queryByText("Mark In Use")).not.toBeInTheDocument()
            expect(screen.queryByText("Mark Available")).not.toBeInTheDocument()
        })
    })
})

