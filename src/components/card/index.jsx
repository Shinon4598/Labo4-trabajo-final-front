import './card.css'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Card({titulo, fecha, texto}) {
    const parsedDate = parseISO(fecha);
    const formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true, locale: es});
    return (
        <li className='card'>
                <div className="card-img"></div>
                <div className="card-body">
                    <div className="card-header">
                        <h2>{titulo}</h2>
                        <span>{formattedDate}</span>
                    </div>
                    <p className='card-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident quasi ut impedit!</p>
                </div>
        </li>
    );
}