// app/routes/tables.tsx
import { json } from "@remix-run/server-runtime"
import { prisma } from "#app/utils/db.server"

export const loader = async () => {
  const tables = await prisma.table.findMany({
    orderBy: { name: "asc" },
  })
  return json({ tables })
}
