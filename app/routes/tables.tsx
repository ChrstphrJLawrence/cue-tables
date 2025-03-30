// app/routes/tables.tsx
import { json } from "@remix-run/server-runtime"
import { prisma } from "#app/utils/db.server"
import { useLoaderData, useSubmit } from "react-router"
import type { Table, TableSession } from "@prisma/client"
import { Icon } from "#app/components/ui/icon"
import { Button } from "#app/components/ui/button"

type LoaderData = {
  tables: (Table & {
    sessions: (TableSession & { formattedStartedAt: string })[]
  })[]
}


export const loader = async () => {
  const tablesRaw = await prisma.table.findMany({
    orderBy: { name: "asc" },
    include: {
      sessions: {
        where: { endedAt: null },
        orderBy: { startedAt: "desc" },
        take: 1,
      },
    },
  })
  
  // Format sessions for display
  const tables = tablesRaw.map((table) => {
    const session = table.sessions[0]
    return {
      ...table,
      sessions: session
        ? [
            {
              ...session,
              formattedStartedAt: new Date(session.startedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ]
        : [],
    }
  })
  console.log(tables)
  return json({ tables })
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const currentStatus = formData.get("currentStatus") === "true"
  const tableIdRaw = formData.get("tableId")
  const endSession = formData.get("endSession") === "true"

  const tableId = Number(tableIdRaw)
  if (isNaN(tableId)) {
    return json({ error: "Invalid table ID" }, { status: 400 })
  }

  if (endSession) {
    const session = await prisma.tableSession.findFirst({
      where: { tableId, endedAt: null },
    })

    if (!session) {
      return json({ error: "No active session to end" }, { status: 404 })
    }

    await prisma.tableSession.update({
      where: { id: session.id },
      data: { endedAt: new Date() },
    })

    await prisma.table.update({
      where: { id: tableId },
      data: { inUse: false },
    })

    return json({ success: true })

  }

  // check for existing active table session
  const existingSession = await prisma.tableSession.findFirst({
    where: {
      tableId,
      endedAt: null,
    },
  })
  if (existingSession) {
    return json({ error: "This table already has an active table session" }, { status: 400 })
  }

  //TODO: add createdBy user id
  // create a new table session
  await prisma.tableSession.create({
    data: {
      tableId,
      //createdBy: user.id, 
    },
  })


  await prisma.table.update({
    where: { id: tableId },
    data: { inUse: !currentStatus },
  })

  return json({ success: true })
}

export default function Tables() {
  const { tables } = useLoaderData<LoaderData>()
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pool Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => {
          const activeSession = table.sessions[0]
  
          return (
            <div
              key={table.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <Icon name="plus" className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Table {table.name}
                </h2>
              </div>
  
              {/* Session Info */}
              {activeSession ? (
                <p className="text-sm text-gray-600 mb-2">
                  Started at:{" "}
                  {activeSession.formattedStartedAt}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mb-2">No session in progress</p>
              )}
  
              {/* Status + Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      table.inUse ? "bg-red-500" : "bg-green-500"
                    }`}
                  />
                  <span className="text-gray-600">
                    {table.inUse ? "In Use" : "Available"}
                  </span>
                </div>
  
                {table.inUse ? (
                  // End session
                  <form method="POST">
                    <input type="hidden" name="tableId" value={table.id} />
                    <input type="hidden" name="endSession" value="true" />
                    <Button type="submit" variant="destructive">
                      Mark Available
                    </Button>
                  </form>
                ) : (
                  // Start session
                  <form method="POST">
                    <input type="hidden" name="tableId" value={table.id} />
                    <input type="hidden" name="currentStatus" value={table.inUse.toString()} />
                    <Button type="submit" variant="default">
                      Mark In Use
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
