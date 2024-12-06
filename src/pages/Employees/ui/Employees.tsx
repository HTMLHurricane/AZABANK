import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Input,
    Form,
    Typography,
    Table,
    Space,
    Descriptions,
} from 'antd';

interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
}

export const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const handleAddEmployee = (values: Omit<Employee, 'id'>) => {
        const newEmployee: Employee = { id: Date.now().toString(), ...values };
        setEmployees((prev) => [...prev, newEmployee]);
        setIsAddModalVisible(false);
    };

    const handleDeleteEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отдел',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: Employee) => (
                <Space size="middle">
                    <Button onClick={() => setSelectedEmployee(record)}>
                        Подробнее
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteEmployee(record.id)}
                    >
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
            <Typography.Title
                level={2}
                className="text-center mb-8 text-blue-700"
            >
                Сотрудники банка
            </Typography.Title>

            <Button
                type="primary"
                className="mb-8 block mx-auto bg-blue-600 hover:bg-blue-500 px-6  rounded"
                onClick={() => setIsAddModalVisible(true)}
            >
                Добавить сотрудника
            </Button>

            <Table
                dataSource={employees}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                className="shadow-md bg-white rounded overflow-hidden"
            />

            {/* Modal for viewing employee details */}
            <Modal
                title={
                    <Typography.Title level={4}>
                        Детали сотрудника
                    </Typography.Title>
                }
                open={!!selectedEmployee}
                onCancel={() => setSelectedEmployee(null)}
                footer={null}
                width={800}
                className="rounded-lg"
            >
                {selectedEmployee && (
                    <Descriptions
                        title="Информация о сотруднике"
                        bordered
                        column={1}
                    >
                        <Descriptions.Item label="Имя">
                            {selectedEmployee.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Должность">
                            {selectedEmployee.position}
                        </Descriptions.Item>
                        <Descriptions.Item label="Отдел">
                            {selectedEmployee.department}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedEmployee.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Телефон">
                            {selectedEmployee.phone}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Modal for adding employee */}
            <Modal
                title={
                    <Typography.Title level={4}>
                        Добавить сотрудника
                    </Typography.Title>
                }
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
                className="rounded-lg"
            >
                <Form
                    form={form}
                    onFinish={(values) => {
                        handleAddEmployee(values);
                        form.resetFields();
                    }}
                    layout="vertical"
                    className="space-y-4"
                >
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя сотрудника',
                            },
                        ]}
                    >
                        <Input placeholder="Введите имя" className="rounded" />
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="Должность"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите должность сотрудника',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Введите должность"
                            className="rounded"
                        />
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="Отдел"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите отдел сотрудника',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Введите отдел"
                            className="rounded"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Пожалуйста, введите корректный email',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Введите email"
                            className="rounded"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите телефон сотрудника',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Введите телефон"
                            className="rounded"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
                        >
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
