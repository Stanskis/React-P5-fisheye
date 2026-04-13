export default function PhotographerStats({
  totalLikes,
  price,
}: {
  totalLikes: number;
  price: number;
}) {
  return (
    <div
      className="fixed bottom-0 right-[19%] flex items-center gap-10 px-4 py-2 quaternaire-bg rounded-t-lg"
      aria-label="Statistiques du photographe"
    >
      <span className="text-black font-bold text-xl" aria-label={`${totalLikes} likes`}>
        {totalLikes.toLocaleString('fr-FR')} ♥
      </span>
      <span
        className="text-black font-medium text-xl"
        aria-label={`${price} euros par jour`}
      >
        {price}€ / jour
      </span>
    </div>
  );
}
