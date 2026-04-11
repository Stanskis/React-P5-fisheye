'use client';

import { IPhotographer } from '@/types/photographer.types';
import { useState } from 'react';

interface ContactModalProps {
  photographer: IPhotographer;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  photographer,
}: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log({
      prenom: formData.get('prenom'),
      nom: formData.get('nom'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-white/100 backdrop-blur-sm transition-all"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative text-left w-full max-w-md rounded-xl p-4 pt-2 shadow-2xl quaternaire-bg">
        {/* Close button */}
        <button
          className="absolute top-[-1rem] right-3 text-8xl text-white font-[200] text-semibold z-[10] transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          &times;
        </button>

        {submitted ? (
          <p className="text-form text-xl font-medium mt-4">
            Message a bien été envoyé!
          </p>
        ) : (
          <>
            {/* Title */}
            <h1 className="mb-6 pr-8 text-5xl font-[350] leading-tight text-black">
              Contactez-moi
              <br />
              {` ${photographer.name}`}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 text-form"
            >
              {/* Prénom */}
              <div>
                <label className="block text-xl ">Prénom</label>
                <input
                  name="prenom"
                  type="text"
                  autoComplete="given-name"
                  className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Nom */}
              <div>
                <label className="block text-xl">Nom</label>
                <input
                  name="nom"
                  type="text"
                  autoComplete="family-name"
                  className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xl">Email</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xl">Votre message</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-fit primaire-bg rounded px-8 py-3 text-sm font-semibold transition-colors cursor-pointer"
              >
                Envoyer
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
