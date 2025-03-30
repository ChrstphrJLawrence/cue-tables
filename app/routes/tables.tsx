// app/routes/tables.tsx
import { json } from "@remix-run/server-runtime"
import { prisma } from "#app/utils/db.server"
import { useLoaderData } from "react-router"
import type { Table, TableSession } from "@prisma/client"
import { TableCard } from "#app/components/table-card.tsx"

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
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </main>
  )
}
