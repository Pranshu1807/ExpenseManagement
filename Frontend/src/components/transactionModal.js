import React, { useEffect, useState } from "react";
import "./transactionModal.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const TransactionModal = ({ closeModal, editable, setEditable }) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  const initialValues = {
    amount: "",
    type: "",
    category: "",
    description: "",
    date: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    let formErr = formErrors;
    delete formErr[`${name}`];
    setFormErrors(formErr);
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  });

  useEffect(() => {
    if (editable) {
      setformValues(editable);
    }
  }, [editable]);
  useEffect(() => {
    (async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        if (editable) {
          const res = await axios
            .post(
              "https://expensee-tf9c.onrender.com/transactions/edit-transaction",
              {
                payload: {
                  ...formValues,
                  userid: profile.user._id,
                },
                transactionId: editable._id,
              }
            )
            .catch((e) => {
              alert("Failed to edit Transaction");
              console.log(e.response);
            });
          if (res) {
            alert("Edit successfull");
            closeModal();
            setEditable(null);
            window.location.reload(false);
          }
        } else {
          const res = await axios
            .post(
              "https://expensee-tf9c.onrender.com/transactions/add-transaction",
              {
                ...formValues,
                userid: profile.user._id,
              }
            )
            .catch((e) => {
              alert("Failed to add Transaction");
              console.log(e.response);
            });
          if (res) {
            alert("Transaction added successfully");
            closeModal();
            setEditable(null);
            window.location.reload(false);
          }
        }
      }
    })();
    setIsSubmit(false);
  }, [formErrors]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = "Amount is required!";
    }
    if (!/^[0-9]*$/.test(values.amount)) {
      errors.amount = "Amount can not contain alphabets";
    }
    if (!values.type) {
      errors.type = "Type is required!";
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
    if (!values.date) {
      errors.date = "Date is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    return errors;
  };

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="transactionForm">
        <div className="formTitle">
          <h2>Add Transaction</h2>
          <CloseIcon onClick={closeModal} className="closeIcon"></CloseIcon>
        </div>
        <form className="trn-form" onSubmit={handleSubmit}>
          <label htmlFor="Amount">
            <p>Amount</p>
          </label>
          <input
            type="text"
            id="Amount"
            name="amount"
            value={formValues.amount}
            onChange={handleChange}
          ></input>
          {formErrors.amount && (
            <div className="validation-error">{formErrors.amount}</div>
          )}
          <label for="type">
            <p>Type</p>
          </label>
          <select
            id="type"
            value={formValues.type}
            name="type"
            onChange={handleChange}
          >
            <option value="" hidden></option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {formErrors.type && (
            <div className="validation-error">{formErrors.type}</div>
          )}
          <label for="category">
            <p>Category</p>
          </label>
          <select
            id="category"
            value={formValues.category}
            onChange={handleChange}
            name="category"
          >
            <option value="" hidden></option>
            <option value="Salary">Salary</option>
            <option value="Tip">Tip</option>
            <option value="Project">Project</option>
            <option value="Food">Food</option>
            <option value="Movie">Movie</option>
            <option value="Bills">Bills</option>
            <option value="Medical">Medical</option>
            <option value="Fee">Fee</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.category && (
            <div className="validation-error">{formErrors.category}</div>
          )}
          <label htmlFor="Date">
            <p>Date</p>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formValues.date}
            onChange={handleChange}
          />
          {formErrors.date && (
            <div className="validation-error">{formErrors.date}</div>
          )}
          <label htmlFor="Description">
            <p>Description</p>
          </label>
          <input
            type="text"
            name="description"
            id="Description"
            value={formValues.description}
            onChange={handleChange}
          ></input>
          {formErrors.description && (
            <div className="validation-error">{formErrors.description}</div>
          )}
          <button type="submit" className="SaveBtn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default TransactionModal;
