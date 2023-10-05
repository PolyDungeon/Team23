import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Reports = () =>{

    const initialFormData = {
        name: '',
        formType: 'salesBySponsor',
        reportSize: ' '
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    
    const handleInputChange = (event) => {
        const { name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    };
    

        return(

        <div className="content">
        <h1>Reports</h1>
        <div>
            <label>Report Type:</label>
            &nbsp;
            <select
                name="formType"
                value={formData.formType}
                onChange={handleInputChange}
            >
                <option value="salesBySponsor">Sponsors</option>
                <option value="salesByDriver">Drivers</option>
                <option value="invoice">Invoice</option>
                <option value="auditlog">Audit Log</option>
            </select>
        </div>
            
        <div>
            {formData.formType === 'salesBySponsor' && (
               <select
                    name="reportSize"
                    value={formData.reportSize}
                    onChange={handleInputChange}
                    >
                        <option value="all">All Sponsors</option>
                        <option value="one">One Sponsor</option>
                    </select>
               
            )}
        </div>
        <div>
            <label> Date Range: </label>
            &nbsp;
            <DatePicker 
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate}
            />
            <>:</>
            <DatePicker 
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            />
        
        </div>
        <div>
            <button>Create Report</button>
        </div>
            



        </div>
        )

};
export default Reports;



