import React from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const AboutPage: React.FC = () => {
    return (
        <Layout className="min-h-screen flex flex-col">
            <Content className="flex-grow bg-gray-50 p-8">
                <section className="max-w-4xl mx-auto space-y-6">
                    <Card className="shadow-md rounded-lg">
                        <header>
                            <Title level={2} className="text-gray-800">
                                О нас
                            </Title>
                        </header>
                        <Paragraph className="text-gray-600">
                            AZABANK — это ведущий банк, предоставляющий широкий
                            спектр финансовых услуг. Мы стремимся сделать ваши
                            финансовые операции удобными и безопасными.
                        </Paragraph>
                    </Card>

                    <Card className="shadow-md rounded-lg">
                        <header>
                            <Title level={2} className="text-gray-800">
                                Наши услуги
                            </Title>
                        </header>
                        <Row gutter={[16, 16]} className="mt-4">
                            <Col xs={24} sm={12} md={6}>
                                <div className="p-4 bg-blue-100 rounded-lg text-center">
                                    <Title level={4} className="text-blue-800">
                                        Кредитование
                                    </Title>
                                    <Paragraph className="text-gray-600">
                                        Простые и выгодные условия.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="p-4 bg-green-100 rounded-lg text-center">
                                    <Title level={4} className="text-green-800">
                                        Депозиты
                                    </Title>
                                    <Paragraph className="text-gray-600">
                                        Надежность и стабильный доход.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="p-4 bg-yellow-100 rounded-lg text-center">
                                    <Title
                                        level={4}
                                        className="text-yellow-800"
                                    >
                                        Интернет-банкинг
                                    </Title>
                                    <Paragraph className="text-gray-600">
                                        Удобство и контроль ваших средств.
                                    </Paragraph>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="p-4 bg-purple-100 rounded-lg text-center">
                                    <Title
                                        level={4}
                                        className="text-purple-800"
                                    >
                                        Инвестиции
                                    </Title>
                                    <Paragraph className="text-gray-600">
                                        Умножайте капитал с нами.
                                    </Paragraph>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <Card className="shadow-md rounded-lg">
                        <header>
                            <Title level={2} className="text-gray-800">
                                Контакты
                            </Title>
                        </header>
                        <Paragraph className="text-gray-600">
                            Адрес: г. Москва, ул. Финансовая, д. 1<br />
                            Телефон: +998 90 474-39-18
                            <br />
                            Email: info@mybank.ru
                        </Paragraph>
                    </Card>
                </section>
            </Content>
        </Layout>
    );
};
