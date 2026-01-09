import React, { useState } from 'react'
import { Table, Input, Select, Radio } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { parse, unparse } from "papaparse";
import {toast} from 'react-toastify'



const Transactions = ({ transactions, addTransaction, fetchTransactions }) => {
    const { Option } = Select

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    const columns = [
       { 
        title: "Name",
        dataIndex: "name",
        key: "name"
       },
       { 
        title: "Amount",
        dataIndex: "amount", 
        key: "amount",
        render: (amount) => `₹${amount}`
       },
       { 
        title: "Tag",
        dataIndex: "tag",
        key: "tag"
       },
       { 
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type) => (
          <span className={type === 'income' ? 'text-green-600' : 'text-red-600'}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )
       },
       { 
        title: "Date",
        dataIndex: "date",
        key: "date"
       }
    ]

    const filteredTransactions = transactions.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase()) && 
       (typeFilter === "all" || typeFilter === "" || item.type === typeFilter)
    );

    const importFromCsv = (event) => {
      event.preventDefault();
      try {
        parse(event.target.files[0], {
          header: true,
          complete: async function (result) {
            
            for(const transaction of result.data){
               const newTransaction = {
                 ...transaction,
                 amount: parseFloat(transaction.amount),
               };
               await addTransaction(newTransaction, true)
            }
          }
        })
        toast.success("All Transactions Added")
        fetchTransactions();
        event.target.files = null;
      } catch (error) {
        toast.error(error.message)
      }
    }

    const sortedTransactions = [...filteredTransactions].sort((a,b) => {
        if(sortKey === "date"){
            return new Date(a.date) - new Date(b.date);

        }else if (sortKey === "amount"){
            return a.amount - b.amount;
        }else{
            return 0;
        }
    })

    function exportCSV(){
      var csv = unparse({
        fields: ["name", "type", "tag","date","amount"],
         data: transactions,
      });
      var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      var csvURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'transactions.csv');
      tempLink.click();
    }


  return (
    <div className="px-8 py-6">
      <div className="mb-4">
        <Input 
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           placeholder='Search by name'
           prefix={<SearchOutlined />}
           className="max-w-md"
        />
      </div>

      <Select
        className="select-input"
        onChange={(value) => setTypeFilter(value)}
        value={typeFilter}
        placeholder="Filter"
        allowClear
      >
        <Option value="all" >All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>


      </Select>
  

   
     <div>

      <Radio.Group
      className="input-radio"
      onChange={(e) => setSortKey(e.target.value)}
       value={sortKey}
      >
         <Radio.Button value="">No Sort</Radio.Button>
         <Radio.Button value="date" >Sort by Date</Radio.Button>
         <Radio.Button value="amount">Sort by Amount</Radio.Button>

      </Radio.Group>

      <div className='flex justify-center gap-4 w-100'>
         <button onClick={exportCSV}>
           Export to CSV
         </button>
         <label for="file-csv" className='btn btn-blue'>
            Import form CSV
         </label>

         <input
           id='file-csv'
           type='file'
           accept='.csv'
           required
           style={{display: "none"}}
           onChange={importFromCsv}
         />
      </div>

      <Table 
        dataSource={sortedTransactions} 
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg"
      />
       </div>
    </div>
   
  )
}

export default Transactions