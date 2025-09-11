export interface NJOrderTicketProps {
  /** Mirror the ticket horizontally */
  mirrored?: boolean;
  /** Additional CSS classes */
  class?: string;
}

export default function NJOrderTicket({
  mirrored = false,
}: NJOrderTicketProps) {
  return (
    <img
      src="/nick-jonas/nj-collection-highlight/order-up.png"
      alt="Order Ticket"
      style={{
        transform: mirrored ? "rotate(32.35deg)" : "rotate(0deg)",
        scale: mirrored ? ".8" : "1",
      }}
    />
  );
}
