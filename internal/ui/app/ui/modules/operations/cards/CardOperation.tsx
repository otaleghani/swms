"use client";

import { Operation } from "@/app/lib/types/data/operations";
import { Ticket } from "@/app/lib/types/data/tickets";
import { User } from "@/app/lib/types/data/users";
import { Variant } from "@/app/lib/types/data/variants";
import Image from "next/image";


interface Props {
  operation: Operation;
  variant: Variant;
  user: User;
  ticket?: Ticket;
}

export default function CardOperation({
  operation,
  variant,
  user,
  ticket,
}: Props) {
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full font-semibold">Operations: the card is an example</div>
        <div className="p-2 border-b flex gap-4 items-center">
          <Image 
            height={70}
            width={70}
            className="w-4 h-4 rounded-full"
            alt="sus"
            src="http://localhost:8080/media/2F99ffc3b2-9943-4ea8-99d5-34804bf8a5e1.jpg"
          />
          <div>{variant.name}</div>
          <div>{variant.identifier}</div>
          <div>{operation.quantity}</div>
          <div>{user.name} {user.surname}</div>
          <div>{operation.date}</div>
          <div>{ticket?.name}</div>
        </div>
      </div>
    </>
  );
};
