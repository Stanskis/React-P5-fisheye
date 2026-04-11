import Link from 'next/link';
import { IPhotographer } from '@/types/photographer.types';

export default function PhotographerCard({
  photographer,
}: {
  photographer: IPhotographer;
}) {
  return (
    <li className="flex flex-col items-center text-center">
      <Link
        href={`/photographer-page/${photographer.id}`}
        className="flex flex-col items-center"
        aria-labelledby={`photographer-${photographer.id} action-${photographer.id}`}
      >
        <span className="w-48 h-48 rounded-full overflow-hidden block">
          <img
            src={`/${photographer.portrait}`}
            alt={''}
            className="w-full h-full object-cover scale-125"
          />
        </span>
        <h2
          id={`photographer-${photographer.id}`}
          className="secondaire-text text-3xl mt-2"
        >
          {photographer.name}
        </h2>
        <span id={`action-${photographer.id}`} className="sr-only">
          Accéder au profil
        </span>
      </Link>
      <p className="primaire-text text-xs mt-1">
        {photographer.city}, {photographer.country}
      </p>
      <p className="paragraph-text text-sm mt-1">{photographer.tagline}</p>
      <p className="tertiaire-text text-xs mt-1">{photographer.price}€/jour</p>
    </li>
  );
}
