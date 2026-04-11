import PhotographerProfile from '@/components/Photographers/PhotographerProfile';
import MediasList from '@/components/Media/MediasList';
import { getPhotographerById } from '@/lib/DataLib/dataLib';

export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const parsedId = parseInt(rawId);

  if (isNaN(parsedId)) {
    return <div>Invalid id</div>;
  }

  const result = await getPhotographerById(parsedId);

  if (!result.success) {
    return (
      <div className="border text-red-500 p-4 bg-red-50 rounded-lg w-1/2 h-full text-center my-8">
        <p>{result.error}</p>
      </div>
    );
  }

  const photographer = result.data;

  return (
    <article className="text-center w-4/5 mx-auto my-4">
      <PhotographerProfile {...photographer} />
      <MediasList photographerId={photographer.id} />
    </article>
  );
}
