import React, { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Table,
    Modal,
    Form,
    Row,
    Col,
    Select,
    message,
} from 'antd';

export const MainPage: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanTerm, setLoanTerm] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(30); // Изначально процентная ставка 30%
    const [paymentData, setPaymentData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false); // Состояние для списка клиентов

    // Функция для расчета аннуитетных платежей
    const handleCalculateAnnuity = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const totalMonths = loanTerm * 12;
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

        const payments: any[] = [];
        let remainingBalance = loanAmount;

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;

            payments.push({
                month: i,
                monthlyPayment: monthlyPayment.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: remainingBalance.toFixed(2),
            });
        }
        setPaymentData(payments);
    };

    // Функция для расчета дифференцированных платежей
    const handleCalculateDifferentiated = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const totalMonths = loanTerm * 12;
        const payments: any[] = [];
        let remainingBalance = loanAmount;
        const principalPaymentPerMonth = loanAmount / totalMonths;

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = principalPaymentPerMonth;
            const totalPayment = principalPayment + interestPayment;
            remainingBalance -= principalPayment;

            payments.push({
                month: i,
                monthlyPayment: totalPayment.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: remainingBalance.toFixed(2),
            });
        }
        setPaymentData(payments);
    };

    // Валидация даты рождения (формат: ДД-ММ-ГГГГ)
    const validateDate = (date: string) => {
        const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
        return regex.test(date);
    };

    // Валидация номера паспорта (14 цифр)
    const validatePassport = (passport: string) => {
        const regex = /^\d{14}$/;
        return regex.test(passport);
    };

    // Сохранение данных в localStorage
    const handleSubmitLoan = (values: any) => {
        if (!validateDate(values.birthDate)) {
            message.error('Дата рождения должна быть в формате ДД-ММ-ГГГГ');
            return;
        }

        if (!validatePassport(values.passportNumber)) {
            message.error('Номер паспорта должен состоять из 14 цифр');
            return;
        }

        const newClient = {
            name: values.name,
            birthDate: values.birthDate,
            passportNumber: values.passportNumber,
            loanAmount,
            loanTerm,
            interestRate,
        };

        // Получаем текущий список клиентов из localStorage
        const storedClients = JSON.parse(
            localStorage.getItem('clients') || '[]',
        );

        // Добавляем нового клиента
        storedClients.push(newClient);

        // Сохраняем обновленный список в localStorage
        localStorage.setItem('clients', JSON.stringify(storedClients));

        message.success(
            'Кредит оформлен успешно. Благодарим за ваш выбор нашего АЗАБАНК',
        );
        handleCloseModal();
    };

    useEffect(() => {
        // Устанавливаем процентную ставку в зависимости от срока кредита
        if (loanTerm < 5) {
            setInterestRate(13);
        } else if (loanTerm >= 5 && loanTerm < 10) {
            setInterestRate(15);
        } else if (loanTerm >= 10) {
            setInterestRate(27);
        }
    }, [loanTerm]);

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setShowModal(false); // Закрывает модальное окно
    };

    // Отключаем кнопку оформления кредита, если не заполнены сумма кредита и срок
    const isSubmitDisabled = loanAmount < 1000000 || loanTerm <= 0;

    const columns = [
        { title: 'Месяц', dataIndex: 'month', key: 'month' },
        {
            title: 'Ежемесячный платеж',
            dataIndex: 'monthlyPayment',
            key: 'monthlyPayment',
        },
        {
            title: 'Платеж по процентам',
            dataIndex: 'interestPayment',
            key: 'interestPayment',
        },
        {
            title: 'Платеж по основному долгу',
            dataIndex: 'principalPayment',
            key: 'principalPayment',
        },
        {
            title: 'Остаток долга',
            dataIndex: 'remainingBalance',
            key: 'remainingBalance',
        },
    ];

    return (
        <div className="p-6 mx-auto bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">
                Кредитный калькулятор
            </h2>

            <Form layout="vertical" onFinish={handleCalculateAnnuity}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item
                            label="Сумма кредита"
                            tooltip="Введите сумму, которую вы хотите занять (минимальная сумма 1 млн)"
                        >
                            <Input
                                type="number"
                                value={loanAmount}
                                onChange={(e) =>
                                    setLoanAmount(Number(e.target.value))
                                }
                                placeholder="Сумма кредита"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Срок (лет)"
                            tooltip="Введите срок кредита в годах"
                            rules={[
                                {
                                    max: 15,
                                    message:
                                        'Срок кредита не может превышать 15 лет',
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                value={loanTerm}
                                onChange={(e) =>
                                    setLoanTerm(
                                        Math.min(Number(e.target.value), 15),
                                    )
                                }
                                placeholder="Срок кредита"
                                max={15}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Процентная ставка (%)"
                            tooltip="Выберите процентную ставку"
                        >
                            <Select value={interestRate} disabled>
                                <Select.Option value={13}>
                                    13% (до 5 лет)
                                </Select.Option>
                                <Select.Option value={15}>
                                    15% (от 5 до 10 лет)
                                </Select.Option>
                                <Select.Option value={27}>
                                    27% (более 10 лет)
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="text-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="mb-4"
                        onClick={handleCalculateAnnuity}
                    >
                        Рассчитать аннуитетные платежи
                    </Button>
                    <Button
                        type="default"
                        size="large"
                        className="mb-4 ml-4"
                        onClick={handleCalculateDifferentiated}
                    >
                        Рассчитать дифференцированные платежи
                    </Button>
                </div>
            </Form>

            <Table
                dataSource={paymentData}
                columns={columns}
                rowKey="month"
                pagination={false}
                className="my-6"
                scroll={{ y: 400 }}
            />

            <div className="text-center">
                <Button
                    type="default"
                    onClick={() => setShowModal(true)}
                    size="large"
                    disabled={isSubmitDisabled} // Отключаем кнопку, если не введены сумма и срок
                >
                    Оформить кредит
                </Button>
            </div>

            <Modal
                visible={showModal}
                onCancel={handleCloseModal}
                footer={null}
            >
                <div className="mb-4">
                    <Form layout="vertical" onFinish={handleSubmitLoan}>
                        <Form.Item
                            label="ФИО"
                            name="name"
                            rules={[
                                { required: true, message: 'Введите ваше имя' },
                            ]}
                        >
                            <Input placeholder="Введите ФИО" />
                        </Form.Item>
                        <Form.Item
                            label="Дата рождения"
                            name="birthDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите дату рождения',
                                },
                                {
                                    pattern: /^(\d{2})-(\d{2})-(\d{4})$/,
                                    message:
                                        'Дата рождения должна быть в формате ДД-ММ-ГГГГ',
                                },
                            ]}
                        >
                            <Input placeholder="Введите дату рождения (ДД-ММ-ГГГГ)" />
                        </Form.Item>
                        <Form.Item
                            label="Номер паспорта"
                            name="passportNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите номер паспорта',
                                },
                                {
                                    pattern: /^\d{14}$/,
                                    message:
                                        'Номер паспорта должен состоять из 14 цифр',
                                },
                            ]}
                        >
                            <Input placeholder="Введите номер паспорта" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Оформить кредит
                        </Button>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};
