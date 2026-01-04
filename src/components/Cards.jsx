import React from 'react'
import {Card, Row, Button} from 'antd';

const Cards = ({income, expense, totalBalance,showExpenseModal, showIncomeModal}) => {
  return (
    <div className="px-8 py-6">
       <Row className="flex justify-between items-stretch gap-4 w-full">
            {/* Current Balance Card */}
            <Card className="flex-1 shadow-md rounded-lg">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Balance</h2>
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{totalBalance}</p>
                    <Button 
                        type="primary" 
                        className="w-full bg-blue-500 hover:bg-blue-600 h-10 text-base font-medium"
                    >
                        Reset Balance
                    </Button>
                </div>
            </Card>

            {/* Total Income Card */}
            <Card className="flex-1 shadow-md rounded-lg">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Income</h2>
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{income}</p>
                    <Button 
                        type="primary" 
                        className="w-full bg-blue-500 hover:bg-blue-600 h-10 text-base font-medium"
                        onClick={showIncomeModal}
                    >
                        Add Income
                    </Button>
                </div>
            </Card>

            {/* Total Expenses Card */}
            <Card className="flex-1 shadow-md rounded-lg">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Expenses</h2>
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{expense}</p>
                    <Button 
                        type="primary" 
                        className="w-full bg-blue-500 hover:bg-blue-600 h-10 text-base font-medium"
                        onClick={showExpenseModal}
                    >
                        Add Expense
                    </Button>
                </div>
            </Card>
        </Row>
    </div>
  )
}

export default Cards