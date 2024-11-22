import { routeConfig } from '@/app/providers/router/routeConfig/routeConfig';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'antd/es/button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <FlexBox cls="relative px-[5%] flex justify-between shadow-sm">
            {/* Логотип и навигация */}
            <div className="flex items-center">
                <NavLink className="text-3xl font-medium" to="/">
                    AZABANK
                </NavLink>
                {/* Мобильная кнопка-гамбургер */}
                <Button
                    className="md:hidden ml-4"
                    icon={<FontAwesomeIcon icon={faBars} />}
                    type="text"
                    onClick={toggleMenu}
                />
            </div>

            {/* Навигационное меню для десктопа */}
            <nav className="hidden md:flex items-center">
                {Object.values(routeConfig).map(
                    ({ path, text }) =>
                        path &&
                        text && (
                            <NavLink
                                key={path}
                                className={({ isActive }) =>
                                    `p-5 hover:bg-[rgba(0,0,0,0.2)] ${
                                        isActive
                                            ? 'border border-solid border-b-2 border-b-slate-950 border-x-0 border-t-0 bg-[rgba(0,0,0,0.1)]'
                                            : ''
                                    }`
                                }
                                to={path}
                            >
                                {text}
                            </NavLink>
                        ),
                )}
            </nav>

            {/* Мобильное меню */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden z-10">
                    {Object.values(routeConfig).map(
                        ({ path, text }) =>
                            path &&
                            text && (
                                <NavLink
                                    key={path}
                                    className={({ isActive }) =>
                                        `block p-4 hover:bg-[rgba(0,0,0,0.1)] ${
                                            isActive
                                                ? 'bg-[rgba(0,0,0,0.2)]'
                                                : ''
                                        }`
                                    }
                                    to={path}
                                    onClick={toggleMenu} // Закрывает меню при клике
                                >
                                    {text}
                                </NavLink>
                            ),
                    )}
                </div>
            )}
        </FlexBox>
    );
};
