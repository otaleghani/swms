"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import { AcceptedLocales } from "@/app/lib/types/misc"
import { DatePickerPattern } from "../input/DatePickerPattern"
import InputPattern from "../input/InputPattern"

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"
import SelectFieldPattern from "../select/SelectFieldPattern"
import { TicketState, TicketType } from "@/app/lib/types/data/tickets";
import ProductsByClientSelectFields from "@/app/ui/modules/products/ProductsByClientSelectField";


export const TicketFormFields = ({
  fields,
  result,
  errorMessages,
  locale,
}: FormFieldsPropsWithDictCompleteMap["Ticket"] & {
  locale: AcceptedLocales;
}) => { 
  const [type, setType] = useState(
    result?.type ? 
      fields.ticketType.list.find(
        e => e.id === result.type) as TicketType : 
      { id: "", name: "" } as TicketType)

  const [state, setState] = useState(
    result?.state ? 
      fields.ticketState.list.find(
        e => e.id === result.state) as TicketState : 
      { id: "", name: "" } as TicketState)

  let defaultClient = result?.client ? 
    fields.client.list.find(i => i.id === result.client) : undefined;

  let defaultProduct = result?.product ? 
    fields.product.list.find(i => i.id === result.product) : undefined;

return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description}
    />

    <DatePickerPattern 
      field="openDate"
      dict={fields.openDate.dict}
      errorMessages={errorMessages.openDate}
      defaultValue={result?.open}
      locale={locale}
    />
    <DatePickerPattern 
      field="closeDate"
      dict={fields.closeDate.dict}
      errorMessages={errorMessages.closeDate}
      defaultValue={result?.close}
      locale={locale}
    />

    <ProductsByClientSelectFields
      fields={{
        client: {
          select: fields.client,
          defaultValue: defaultClient,
          errorMessages: errorMessages.client,
        },
        product: {
          select: fields.product,
          defaultValue: defaultClient,
          errorMessages: errorMessages.product,
        }
      }}
    />

    <SelectFieldPattern<"TicketType"> 
      {...fields.ticketType}
      element={type}
      setElement={setType}
      errorMessages={errorMessages.ticketType}
    />
    <SelectFieldPattern<"TicketState"> 
      {...fields.ticketState}
      element={state}
      setElement={setState}
      errorMessages={errorMessages.ticketState}
    />
    <input type="hidden" name="type" value="Ticket" />
  </>
)}
