"use client"

import { syncPaginatedOperationsByItem } from "@/app/lib/synchronizers/extra/operations/listByItem";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { Item } from "@/app/lib/types/data/items"
import { Operation, Operations } from "@/app/lib/types/data/operations"
import { Variant, Variants } from "@/app/lib/types/data/variants"
import { PaginationParams } from "@/app/lib/types/pageParams";
import { OperationsFiltersParams } from "@/app/lib/types/query/data";
import streamer from "@/app/lib/workers";
import { useEffect, useState } from "react";
import CardOperation from "../cards/CardOperation";
import { syncVariantsByItem } from "@/app/lib/synchronizers/extra/variants/listByItem";
import { User, Users } from "@/app/lib/types/data/users";
import { Ticket, Tickets } from "@/app/lib/types/data/tickets";

interface Props {
  tickets: Tickets,
  operations: Operations,
  variants: Variants,
  users: Users,
  item: Item,
  dictNotFound: string;
  filters?: OperationsFiltersParams;
  pagination?: PaginationParams;
}

export default function ListOperationsClient({
  tickets,
  operations,
  variants,
  users,
  item,
  filters,
  pagination,
  dictNotFound,
}: Props) {

  const [currentOperationsByItem, setCurrentOperationsByItem] = useState(operations);
  const [currentVariantsByItem, setCurrentVariantsByItem] = useState(variants);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [currentTickets, setCurrentTickets] = useState(tickets);

  useEffect(() => {
    syncPaginatedOperationsByItem({
      id: item.id as string,
      streamer: streamer as Worker,
      pagination: pagination,
      filters: filters,
      list: currentOperationsByItem,
      setList: setCurrentOperationsByItem
    });
    syncVariantsByItem({
      id: item.id as string,
      streamer: streamer as Worker,
      list: currentVariantsByItem,
      setList: setCurrentVariantsByItem
    });
    synchronizeList<"User">({
      streamer: streamer as Worker,
      type: "User",
      list: currentUsers,
      setList: setCurrentUsers,
    });
    synchronizeList<"Ticket">({
      streamer: streamer as Worker,
      type: "Ticket",
      list: currentTickets,
      setList: setCurrentTickets,
    });
  }, []);

  return (
    <>
      {currentOperationsByItem && currentOperationsByItem.map((operation: Operation) => (
        <CardOperation 
          operation={operation}
          variant={currentVariantsByItem.find(v => v.id === operation.variant) as Variant}
          user={currentUsers.find(u => u.id === operation.user) as User}
          ticket={currentTickets.find(t => t.id === operation.ticket) as Ticket}
        />
      ))}
      {!currentVariantsByItem && <>{dictNotFound}</>}
    </>
  );
};
