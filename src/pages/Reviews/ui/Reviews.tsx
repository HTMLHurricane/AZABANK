import React, { useState } from 'react';
import { Rate, Card, Button, Input, Form, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

interface Review {
    name: string;
    rating: number;
    comment: string;
    avatar: string; // Добавим поле для аватара
}

const initialReviews: Review[] = [
    {
        name: 'Узаков Тимур',
        rating: 1,
        comment: 'Мошенники АЗАБАНК, но мне нравиться',
        avatar: '👤',
    },
    {
        name: 'Турсынбаев Мирали',
        rating: 0,
        comment: 'Аза карызынды кайтар',
        avatar: '👤',
    },
    {
        name: 'Батырали',
        rating: 1,
        comment: 'Тунимен звонтетебереди кредит алын деп',
        avatar: '👤',
    },
    {
        name: 'Юнус',
        rating: 5,
        comment: 'Айфонга кредит алвем калганин озин толеп жиберерсен Аза',
        avatar: '👤',
    },
    {
        name: 'Мураддула',
        rating: 2,
        comment: 'Кайтип аламиз кредит?',
        avatar: '👤',
    },
    {
        name: 'Муха',
        rating: 4,
        comment: 'Бари формани дурис толтырсан оформить еталасан кредит.',
        avatar: '👤',
    },
    {
        name: 'Искандер',
        rating: 5,
        comment: 'Аза 200 мын болды проекттин.',
        avatar: '👤',
    },
    {
        name: 'Исмет',
        rating: 5,
        comment: 'Калай Аза',
        avatar: '👤',
    },
];

export const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [name, setName] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    // Обработчик отправки отзыва
    const handleSubmit = () => {
        if (!name || rating === 0 || !comment) {
            message.error('Пожалуйста, заполните все поля!');
            return;
        }

        const newReview: Review = {
            name,
            rating,
            comment,
            avatar: '👤', // Можно поменять на аватар, если хотите
        };

        setReviews([...reviews, newReview]);
        setName('');
        setRating(0);
        setComment('');
        message.success('Ваш отзыв успешно добавлен!');
    };

    return (
        <div className="p-8 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
                Отзывы клиентов
            </h2>

            {/* Форма для добавления отзыва */}
            <div className="mb-6 p-4 bg-white shadow-md rounded-md">
                <h3 className="text-2xl font-semibold mb-4">
                    Оставьте свой отзыв
                </h3>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Ваше имя" required>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите ваше имя"
                        />
                    </Form.Item>

                    <Form.Item label="Ваша оценка" required>
                        <Rate
                            value={rating}
                            onChange={(value) => setRating(value)}
                            style={{ fontSize: '20px' }}
                        />
                    </Form.Item>

                    <Form.Item label="Ваш комментарий" required>
                        <Input.TextArea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Напишите ваш комментарий"
                            rows={4}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="w-full">
                        Оставить отзыв
                    </Button>
                </Form>
            </div>

            {/* Отзывы */}
            <div>
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Пока нет отзывов. Будьте первым!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {reviews.map((review, index) => (
                            <Card
                                key={index}
                                className="shadow-md rounded-md"
                                title={
                                    <div className="flex items-center">
                                        <FontAwesomeIcon
                                            icon={faUserAlt}
                                            className="text-xl mr-2"
                                        />
                                        <span className="font-semibold text-xl">
                                            {review.name}
                                        </span>
                                    </div>
                                }
                                extra={<Rate disabled value={review.rating} />}
                                style={{ width: '100%' }}
                            >
                                <p className="text-gray-600">
                                    {review.comment}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
