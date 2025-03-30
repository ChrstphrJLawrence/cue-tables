// app/routes/tables.tsx
import { json } from "@remix-run/server-runtime"
import { prisma } from "#app/utils/db.server"
import { useLoaderData } from "react-router"
import type { Table } from "@prisma/client"

type LoaderData = {
  tables: Table[]
}

export const loader = async () => {
  const tables = await prisma.table.findMany({
    orderBy: { name: "asc" },
  })
  return json<LoaderData>({ tables })
}

export default function Tables() {
  const data = useLoaderData<LoaderData>()
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pool Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.tables.map((table: Table) => (
          <div
            key={table.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {table.name}
            </h2>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${table.inUse ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="text-gray-600">{table.inUse ? 'In Use' : 'Available'}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
