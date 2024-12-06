import { LoginForm } from '@/features/auth';
import { AboutPage } from '@/pages/AboutPage/ui/AboutPage';
import { Clients } from '@/pages/Clients/ui/Clients';
import { Employees } from '@/pages/Employees/ui/Employees';
import { MainPage } from '@/pages/MainPage/ui/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage/ui';
import { Reviews } from '@/pages/Reviews/ui/Reviews';
import { AppRoutesProps } from '@/shared/types/router';

export enum AppRoutes {
    MAIN = 'main',
    CLIENTS = 'clients',
    REVIEWS = 'reviews',
    LOGIN = 'login',
    ABOUTPAGE = 'about',
    EMPLOYEES = 'employees',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CLIENTS]: '/clients',
    [AppRoutes.REVIEWS]: '/reviews',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.ABOUTPAGE]: '/about',
    [AppRoutes.EMPLOYEES]: '/employees',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        text: 'Главная',
    },
    [AppRoutes.EMPLOYEES]: {
        path: RoutePath.employees,
        element: <Employees />,
        text: 'Сотрудники',
    },
    [AppRoutes.CLIENTS]: {
        path: RoutePath.clients,
        element: <Clients />,
        text: 'Клиенты',
    },
    [AppRoutes.REVIEWS]: {
        path: RoutePath.reviews,
        element: <Reviews />,
        text: 'Отзывы',
    },
    [AppRoutes.ABOUTPAGE]: {
        path: RoutePath.about,
        element: <AboutPage />,
        text: 'О банке',
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginForm />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
