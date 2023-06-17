import React, { useEffect, useState } from "react";
import TransactionModal from "../components/transactionModal";
import Analytics from "../components/analytics";
import "./home.css";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [editable, setEditable] = useState(null);
  const navigate = useNavigate();
  const [allTransaction, setAllTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [time, setTime] = useState("0");
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(6);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [transactionToshow, setTransactionToShow] = useState([]);
  const profile = JSON.parse(localStorage.getItem("profile"));

  const getAllTransactions = async () => {
    const res = await axios
      .post(
        "https://expensee-tf9c.onrender.com/transactions//get-transaction",
        {
          userid: profile.user._id,
          time,
          type,
        }
      )
      .catch((e) => {
        alert("Failed to load Transactions");
        console.log(e.response);
      });
    if (res) {
      setAllTransactions(res.data);
      setPageNumber(1);
      setStartIdx(0);
      setEndIdx(6);
    }
  };

  useEffect(() => {
    const trn = allTransaction.slice(startIdx, endIdx);
    setTransactionToShow(trn);
  }, [allTransaction, startIdx, endIdx]);

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, [profile]);

  useEffect(() => {
    getAllTransactions();
  }, [time, type]);

  async function handleDelete(id) {
    const res = await axios
      .post(
        "https://expensee-tf9c.onrender.com/transactions/delete-transaction",
        {
          transactionId: id,
        }
      )
      .catch((e) => {
        alert("Failed to Delete Transaction");
        console.log(e.response);
      });
    if (res) {
      alert("Transaction Deleted");
      window.location.reload(false);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="homePage">
      <div className="Transactions">
        <h3> Time</h3>
        <select
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        >
          <option value="0">All Time</option>
          <option value="7">Last 1 Week</option>
          <option value="30">Last 1 Month</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last 1 Year</option>
        </select>
        <h3>Type</h3>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="all">All </option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <div className="displayType">
          <UnorderedListOutlined
            className={`dispOption  ${
              viewType === "table" ? "active" : "inactive"
            }`}
            onClick={(e) => {
              setViewType("table");
            }}
          ></UnorderedListOutlined>
          <AreaChartOutlined
            className={`dispOption  ${
              viewType === "table" ? "inactive" : "active"
            }`}
            onClick={(e) => {
              setViewType("chart");
            }}
          ></AreaChartOutlined>
        </div>
        <button
          className="AddBtn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add New
        </button>
      </div>
      {viewType === "table" ? (
        <div className="Trn-History">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionToshow.map((values) => {
                return (
                  <tr key={values._id}>
                    <th>{moment(values.date).format("DD-MM-YYYY")}</th>
                    <th>{values.amount}</th>
                    <th>{values.type}</th>
                    <th>{values.category}</th>
                    <th>{values.description}</th>
                    <th>
                      <EditOutlined
                        className="edit"
                        onClick={(e) => {
                          setEditable({
                            ...values,
                            date: moment(values.date).format("YYYY-MM-DD"),
                          });
                          setShowModal(true);
                        }}
                      ></EditOutlined>
                      <DeleteOutlined
                        className="delete"
                        onClick={() => {
                          handleDelete(values._id);
                        }}
                      ></DeleteOutlined>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <LeftOutlined
              className={`arrow ${pageNumber === 1 ? "inactive" : "active"}`}
              onClick={() => {
                if (pageNumber === 1) return;
                setStartIdx(startIdx - 6);
                setEndIdx(endIdx - 6);
                setPageNumber(pageNumber - 1);
              }}
            ></LeftOutlined>
            <p>{pageNumber}</p>
            <RightOutlined
              className={`arrow ${
                pageNumber === Math.ceil(allTransaction.length / 6)
                  ? "inactive"
                  : "active"
              }`}
              onClick={() => {
                if (pageNumber === Math.ceil(allTransaction.length / 6)) return;
                setStartIdx(startIdx + 6);
                setEndIdx(endIdx + 6);
                setPageNumber(pageNumber + 1);
              }}
            ></RightOutlined>
          </div>
        </div>
      ) : (
        <Analytics allTransaction={allTransaction}></Analytics>
      )}
      {showModal && (
        <TransactionModal
          closeModal={closeModal}
          editable={editable}
          setEditable={setEditable}
        ></TransactionModal>
      )}
    </div>
  );
};

export default Home;
