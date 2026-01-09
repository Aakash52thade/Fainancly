import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncome from "../Modals/AddIncome";
import AddExpense from "../Modals/AddExpense";
import { Modal } from "antd";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import Transactions from '../components/Transactions.jsx'
import Chart from '../components/Chart.jsx'
import NoTransactions from '../components/NoTransactions.jsx'


function Dashboard() {
  const [user] = useAuthState(auth);
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

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if(!many) toast.success("Transaction Added!")
      if (!many) {
        toast.success("Transaction Added!");
      }
      
      let newArr = [...transactions, transaction];
      setTransactions(newArr);
      calculateBalance(newArr);
    } catch (e) {
      console.error("Error adding document:", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance(transactions);
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      try {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        
        querySnapshot.forEach((doc) => {
          transactionsArray.push({ ...doc.data(), id: doc.id });
        });
        
        setTransactions(transactionsArray);
        toast.success("Transactions Fetched!");
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Couldn't fetch transactions");
      }
    }
    setLoading(false);
  };

  const calculateBalance = (transactionsArray = transactions) => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactionsArray.forEach((transaction) => {
      if (transaction.type === 'income') {
        incomeTotal += parseFloat(transaction.amount);
      } else {
        expensesTotal += parseFloat(transaction.amount);
      }
    });
    
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  return (
    <div>
      <Header />

      {}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        <Cards
          income={income}
          expense={expense}
          totalBalance={totalBalance}
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
        />

      )}
      {transactions.length !== 0 ? <Chart />  : <NoTransactions />}


      <Modal
        style={{ maxWidth: 600 }}
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <AddIncome 
          onFinish={handleIncomeCancel}
          addTransaction={addTransaction}
        />
      </Modal>

      <Modal
        style={{ maxWidth: 600 }}
        title="Add Expense"
        open={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <AddExpense 
          onFinish={handleExpenseCancel}
          addTransaction={addTransaction}
        />
      </Modal>

      <Transactions transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
    </div>
  );
}

export default Dashboard;