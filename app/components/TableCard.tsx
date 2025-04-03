import { getDurationSince } from "#app/utils/time.ts"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import type { Table, TableSession } from "@prisma/client"
import { useOptionalUser, userHasRole } from "#app/utils/user"
type Props = {
    table: Table & {
        sessions: (TableSession & { formattedStartedAt: string })[]
    }
}

export function TableCard({ table }: Props) {
    const user = useOptionalUser()
    const activeSession = table.sessions[0]
    const [ duration, setDuration ] = useState<string | null>(null)

    useEffect(() => {
        if (!activeSession) return

        const updateDuration = () => {
            setDuration(getDurationSince(activeSession.startedAt))
        }

        updateDuration()

        const interval = setInterval(updateDuration, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [activeSession])
  
          return (
            <div
              key={table.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {table.name}
                </h2>
              </div>
  
              {/* Session Info */}
              {activeSession ? (
                <p className="text-sm text-gray-600 mb-2">
                  Started at:{" "}
                  {activeSession.formattedStartedAt} <br />
                  In use for: {duration}
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
  
                {user && userHasRole(user, "admin") ? (
                  table.inUse ? (
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
                  )
                ) : null}
              </div>
            </div>
          )
}