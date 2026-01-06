export  interface TicketFormValues {
  title: string;
  description: string;
  categoryId: number | "";
  priority: "low" | "medium" | "high";
}