import { Table } from 'antd';
import { useEffect, useState } from 'react';

export const Clients = () => {
    const [clients, setClients] = useState<any[]>([]);
    const fetchClients = () => {
        const storedClients = JSON.parse(
            localStorage.getItem('clients') || '[]',
        );
        setClients(storedClients);
    };

    useEffect(() => {
        fetchClients(); // Получаем список клиентов при монтировании компонента
    }, []);
    return (
        <div>
            <h3 className="mt-6 text-center">Список клиентов</h3>
            <Table
                dataSource={clients}
                rowKey="loanAmount"
                columns={[
                    { title: 'Имя', dataIndex: 'name', key: 'name' },
                    {
                        title: 'Дата рождения',
                        dataIndex: 'birthDate',
                        key: 'birthDate',
                    },
                    {
                        title: 'Номер паспорта',
                        dataIndex: 'passportNumber',
                        key: 'passportNumber',
                    },
                    {
                        title: 'Сумма кредита',
                        dataIndex: 'loanAmount',
                        key: 'loanAmount',
                    },
                    {
                        title: 'Срок кредита',
                        dataIndex: 'loanTerm',
                        key: 'loanTerm',
                    },
                    {
                        title: 'Процентная ставка',
                        dataIndex: 'interestRate',
                        key: 'interestRate',
                    },
                ]}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};
