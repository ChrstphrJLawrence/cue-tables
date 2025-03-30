// app/routes/tables.tsx
import { json } from "@remix-run/server-runtime"
import { prisma } from "#app/utils/db.server"
import { useLoaderData, useSubmit } from "react-router"
import type { Table } from "@prisma/client"
import { Icon } from "#app/components/ui/icon"
import { Button } from "#app/components/ui/button"

type LoaderData = {
  tables: Table[]
}

export const loader = async () => {
  const tables = await prisma.table.findMany({
    orderBy: { name: "asc" },
  })
  return json<LoaderData>({ tables })
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const tableId = formData.get("tableId")
  const currentStatus = formData.get("currentStatus") === "true"

  if (!tableId || typeof tableId !== "string") {
    return json({ error: "Invalid table ID" }, { status: 400 })
  }

  await prisma.table.update({
    where: { id: parseInt(tableId) },
    data: { inUse: !currentStatus },
  })

  return json({ success: true })
}

export default function Tables() {
  const data = useLoaderData<LoaderData>()
  const submit = useSubmit()
  
  const handleStatusToggle = (table: Table) => {
    submit(
      {
        tableId: table.id.toString(),
        currentStatus: table.inUse.toString(),
      },
      { method: "post" }
    )
  }
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pool Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.tables.map((table: Table) => (
          <div
            key={table.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name="plus" className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Table {table.name}
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${table.inUse ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-gray-600">{table.inUse ? 'In Use' : 'Available'}</span>
              </div>
              <Button
                variant={table.inUse ? "destructive" : "default"}
                onClick={() => handleStatusToggle(table)}
              >
                {table.inUse ? 'Mark Available' : 'Mark In Use'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
