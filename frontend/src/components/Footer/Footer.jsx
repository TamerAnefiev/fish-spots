import { Link } from 'react-router-dom';

const facebookFishGroups = {
    cssClasses: 'hover:text-cyan-600 duration-150',
    links: [
        {
            linkTo: 'https://www.facebook.com/groups/338746856576368',
            text: 'Морски риболов',
        },
        {
            linkTo: 'https://www.facebook.com/groups/643789872697112',
            text: 'Морски риболов - Варна',
        },
        {
            linkTo: 'https://www.facebook.com/groups/288897695142823',
            text: 'Черноморски риболов',
        },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-gray-700 p-5 mt-auto">
            <div className="max-w-screen-2xl mx-auto flex max-md:flex-col max-md:items-center justify-center gap-10 text-white">
                <section>
                    <h3 className="flex justify-center gap-x-1 mb-2">
                        Рибарски групи
                        <span>
                            <i className="text-cyan-600 fa-brands fa-facebook"></i>
                        </span>
                    </h3>
                    <ul className="flex flex-col items-center text-cyan-400">
                        {facebookFishGroups.links.map((group) => (
                            <li
                                key={group.text}
                                className={facebookFishGroups.cssClasses}
                            >
                                <Link to={group.linkTo}>{group.text}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="text-center mb-2">За Нас</h3>
                    <ul className="flex flex-col items-center text-cyan-400">
                        <li className={facebookFishGroups.cssClasses}>
                            <Link to="/changelog">Новости</Link>
                        </li>
                        <li className={facebookFishGroups.cssClasses}>
                            <Link to="/privacy-policy">
                                Политика за сигурност
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
