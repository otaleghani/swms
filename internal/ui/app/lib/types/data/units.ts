export type Unit = {
  id: string;
  type: "weight" | "length"
  ratio: number,
  system: "metric" | "imperial"
}
