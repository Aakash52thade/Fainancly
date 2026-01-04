import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncome from "../Modals/AddIncome";
import AddExpense from "../Modals/AddExpense";
import { Modal } from "antd";
import {useAuthState} from 'react-firebase-hooks/auth'
import {toast} from 'react-toastify'


function Dashboard() {
  // const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

 
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const addTransaction = async(transaction) => {
     try{
      const docRef = await addDoc(
        collection(debug, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
     }catch(e){
      console.error("Error adding document:", e);
      toast.error("Couldn't add transactions")
     }
  }

  useEffect(() => {
    calculateBalance();
  },[transactions])

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transactions) => {
      if(transactions.type === 'income'){
        incomeTotal += transactions.amount;
      }else {
        expensesTotal += transactions.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  }

  return (
    <div>
      <Header />

      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <Modal
        style={{ maxWidth: 600 }}
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <AddIncome onFinish={handleIncomeCancel} />
      </Modal>

      <Modal
        style={{ maxWidth: 600 }}
        title="Add Expense"
        open={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <AddExpense onFinish={handleExpenseCancel} />
      </Modal>
    </div>
  );
}

export default Dashboard;