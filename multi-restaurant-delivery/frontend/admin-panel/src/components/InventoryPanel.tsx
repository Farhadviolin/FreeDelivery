import { useQuery, gql } from '@apollo/client';

const INVENTORY_QUERY = gql`
  query Inventory($productId: ID!) {
    inventory(productId: $productId) {
      available
      reserved
      updatedAt
    }
  }
`;

export default function InventoryPanel({ productId }: { productId: string }) {
  const { data, loading } = useQuery(INVENTORY_QUERY, { variables: { productId } });
  if (loading) return <div>Lade Bestand...</div>;
  return (
    <div>
      <h3>Inventar für Produkt {productId}</h3>
      <div>Verfügbar: {data?.inventory.available}</div>
      <div>Reserviert: {data?.inventory.reserved}</div>
      <div>Letzte Aktualisierung: {data?.inventory.updatedAt}</div>
    </div>
  );
}
