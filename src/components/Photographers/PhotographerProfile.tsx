'use client';

import { useState } from 'react';
import { IPhotographer } from '@/types/photographer.types';
import ContactForm from '../Modals/ContactForm';

export default function PhotographerProfile(photographer: IPhotographer) {
  const [contactForm, setContactForm] = useState(false);

  return (
    <>
      <article className="grid grid-cols-3 bg-gray-100 p-6 rounded-lg items-center gap-4">
        <div className="text-left flex flex-col">
          <h2 id={`photographer-${photographer.id}`} className="text-6xl">
            {photographer.name}
          </h2>
          <p className="primaire-text text-md mt-2">
            {photographer.city}, {photographer.country}
          </p>
          <p className="tertiaire-text text-sm mt-2">{photographer.tagline}</p>
        </div>
        <div>
          <button
            className="primaire-bg font-bold py-4 px-4 rounded cursor-pointer transition-colors"
            onClick={() => setContactForm(true)}
            aria-label={`Contacter ${photographer.name}`}
          >
            Contactez-moi
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={`/${photographer.portrait}`}
            alt={`Portrait de ${photographer.name}`}
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        {contactForm && (
          <ContactForm
            isOpen={contactForm}
            onClose={() => setContactForm(false)}
            photographer={photographer}
          />
        )}
      </article>
    </>
  );
}
