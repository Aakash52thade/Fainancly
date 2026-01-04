import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';

const AddIncome = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinishForm = (values) => {
    setLoading(true);
    console.log('Income values:', values);
    
    // Add your logic to save income to Firebase here
    
    setTimeout(() => {
      form.resetFields();
      setLoading(false);
      onFinish();
    }, 1000);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishForm}
      requiredMark={true}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { 
            required: true, 
            message: 'Please input the name of the transaction!' 
          }
        ]}
      >
        <Input placeholder="Enter income name" />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          { 
            required: true, 
            message: 'Please input the amount!' 
          },
          {
            pattern: /^[0-9]+$/,
            message: 'Please enter a valid number!'
          }
        ]}
      >
        <Input placeholder="123" type="number" />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[
          { 
            required: true, 
            message: 'Please select a date!' 
          }
        ]}
      >
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tag"
        rules={[
          { 
            required: true, 
            message: 'Please select a tag!' 
          }
        ]}
      >
        <Select placeholder="Select a tag">
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="freelance">Freelance</Select.Option>
          <Select.Option value="investment">Investment</Select.Option>
          <Select.Option value="business">Business</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600"
          loading={loading}
        >
          Add Income
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddIncome;