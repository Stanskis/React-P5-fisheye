import { allPhotographers } from '@/lib/DataLib/dataLib';
import PhotographerCard from './PhotographerCard';

export default async function PhotographersList() {
  const result = await allPhotographers();

  if (!result.success) {
    return (
      <div className="border text-red-500 p-4 bg-red-50 rounded-lg w-1/2 h-full text-center my-8">
        <p>{result.error}</p>
      </div>
    );
  }

  const photographers = result.data;

  return (
    <section className="my-8">
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 w-full justify-items-center mt-8">
        {photographers.map((p) => (
          <PhotographerCard key={p.id} photographer={p} />
        ))}
      </ul>
    </section>
  );
}
