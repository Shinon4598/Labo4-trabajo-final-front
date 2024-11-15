import { parseISO, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Card({
  idea,
  ideaId,
  userId,
  createdAt,
  handleNavigateDetail,
  handleFavorite,
  isLiked // Recibimos isLiked como prop
}) {
  const parseDate = parseISO(createdAt);
  const formattedDate = formatDistanceToNow(parseDate, { addSuffix: true, locale: es });

  return (
    <div className="w-full h-full hover:h-full duration-1000 group overflow-hidden relative rounded bg-neutral-200 text-neutral-50 p-4 flex flex-col justify-evenly my-10">
      <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-400 right-1 -bottom-24"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-400 right-12 bottom-12"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-500 right-1 -top-12"></div>
      <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-300 rounded-full group-hover:-translate-x-12"></div>

      <div className="z-10 flex flex-col justify-evenly w-full h-full">
        <span className="text-2xl font-bold truncate text-neutral-800">{idea}</span>
        <span className="text-sm font-normal mb-4 text-center text-neutral-500">{formattedDate}</span>

        <button
          className="rounded text-neutral-800 font-extrabold p-3 w-min text-3xl hover:scale-110 transform duration-500 right-0 top-0 absolute"
          onClick={() => handleFavorite(ideaId, userId, isLiked)} // Pasamos isLiked al hacer clic
        >
          ❤️
        </button>

        <button
          className="hover:bg-indigo-950 bg-indigo-800 rounded text-neutral-100 font-extrabold w-full p-3"
          onClick={() => handleNavigateDetail(ideaId)}
        >
          Ver más
        </button>
      </div>
    </div>
  );
}