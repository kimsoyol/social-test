"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  title: string
  reactions: number
  views: number
  userId: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "reactions.likes",
    header: "Reactions",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "userId",
    header: "User Id",
  },
]
