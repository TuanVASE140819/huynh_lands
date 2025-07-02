import PropertyDetailPage from "../../[id]/page";

export default function PropertyDetailThuePage({
  params,
}: {
  params: { id: string };
}) {
  return <PropertyDetailPage params={params} />;
}
