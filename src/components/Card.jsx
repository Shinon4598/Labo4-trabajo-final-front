import {parseISO, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';

export default function Card({idea, ideaId, isLiked, ideaDescription, createdAt, theme, handleNavigateDetail, handleFavorite}) {
    const parseDate = parseISO(createdAt);
    const formattedDate = formatDistanceToNow(parseDate, {addSuffix: true, locale: es});
    console.log(ideaId, isLiked);
    return (
    <div
        className="w-full h-full hover:h-full duration-1000 group overflow-hidden relative rounded bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly my-10">
        <div
            className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24">
        </div>
        <div
            className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12">
        </div>
        <div
            className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12">
        </div>
        <div
            className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12">
        </div>
    
        <div className="z-10 flex flex-col justify-evenly w-full h-full">
            <span className="text-2xl font-bold truncate">{idea}</span>
            <span className="text-sm font-normal mb-4 text-center">{formattedDate}</span>
            <p className="truncate">
                {theme}, {ideaDescription}
            </p>
            <button 
                className=" rounded text-neutral-800 font-extrabold p-3 w-min"
                onClick={() => handleFavorite(ideaId, isLiked)
                }
                >
                {isLiked ? "💗": "❤️" }
            </button>
            <button 
                className="hover:bg-neutral-200 bg-neutral-50 rounded text-neutral-800 font-extrabold w-full p-3"
                onClick={() => handleNavigateDetail(ideaId)}
                >
                Ver más
            </button>
        </div>
    </div>
)
}