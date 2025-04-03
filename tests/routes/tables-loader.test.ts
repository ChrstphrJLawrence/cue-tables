// tests/routes/tables-loader.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { loader } from "#app/routes/tables"
import { prisma } from "#app/utils/db.server"
import { createTestRequest } from "../utils/create-test-request"

describe("tables loader", () => {
  beforeAll(async () => {
    // Clean DB and seed test data
    await prisma.table.deleteMany()
    await prisma.tableSession.deleteMany()

    await prisma.table.createMany({
      data: [
        { id: 1, name: "A", inUse: false },
        { id: 2, name: "B", inUse: true },
      ],
    })

    await prisma.tableSession.create({
      data: {
        tableId: 2,
        startedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
      },
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("returns tables sorted by name with active sessions formatted", async () => {
    const request = createTestRequest({ url: "/tables" })
    const response = await loader({ request, params: {}, context: {} })

    const { tables } = await response.json()

    expect(tables).toHaveLength(2)
    expect(tables?.[0]?.name).toBe("A")
    expect(tables?.[1]?.name).toBe("B")

    const activeSession = tables?.[1]?.sessions?.[0]
    expect(activeSession).toHaveProperty("formattedStartedAt")
    expect(typeof activeSession?.formattedStartedAt).toBe("string")
  })
})
