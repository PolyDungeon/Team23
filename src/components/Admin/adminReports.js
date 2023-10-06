import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




/* 
    This is only for Admin Reports 
    Still need to implement changing start date and end date
    Still need to implement submitting the data and generating a report.
*/

const AdminReports = () =>{

    const [startDate,setStartDate] = useState(new Date(2023,7,1));
    const [endDate,setEndDate] = useState(new Date());
    

    const initialFormData = {
        name: '',
        formType: 'salesBySponsor',
        numSponsors: ' ',
        numDrivers: ' ',
        sponsorName: ' ',
        driverName: '',
        viewType: '',
        auditType: '',
        startDate: startDate,
        endDate: endDate
    };
    
    const [formData, setFormData] = useState(initialFormData);

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
        <label>All or Individual Sponsors:</label> &nbsp;
        <select
                name="numSponsors"
                value={formData.numSponsors}
                onChange={handleInputChange}
            >
                    <option value="all">All Sponsors</option>
                    <option value="one">Individual Sponsor</option>
            </select>
        </div>
        

        {(formData.numSponsors === 'one') &&(
            <div>
            <label>Sponsor Name:</label> &nbsp;
            <input
                name='sponsorName'
                value={formData.sponsorName}
                onChange={handleInputChange}
            >
            </input>
            </div>
        )}

        {(formData.formType === 'salesByDriver' && formData.numSponsors === 'one') &&(
            <div>
            <label>All or Individual Drivers:</label> &nbsp;
            <select
                    name="numDrivers"
                    value={formData.numDrivers}
                    onChange={handleInputChange}
                >
                        <option value="all">All Drivers</option>
                        <option value="one">Individual Driver</option>
                </select>

            </div>
        )}

        {formData.formType === 'salesByDriver' && formData.numDrivers === 'one' && formData.numSponsors === 'one' &&(
            <div>
            <label>Driver Name:</label> &nbsp;
            <input
                name='driverName'
                value={formData.driverNameName}
                onChange={handleInputChange}
            >
            </input>
            </div>
        )}

        
        <div>
            <label> Date Range: </label>
            &nbsp;
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate}
            />
            <>&nbsp;to&nbsp;</>
            <DatePicker 
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            maxDate={new Date()}
            />
        
        </div>

        {(formData.formType === 'salesBySponsor' || formData.formType === 'salesByDriver') && (
            <div>
                <label> View Type:</label>&nbsp;
                <select
                    name="viewType"
                    value={formData.viewType}
                    onChange={handleInputChange}
                    >
                        <option value="Detailed">Detailed View</option>
                        <option value="Summary">Summary View</option>
                </select>
            </div>
        )}

        {formData.formType === 'auditlog' &&(
            <div>
                <label> Audit Type: </label>&nbsp;
                <select
                    name="auditType"
                    value={formData.auditType}
                    onChange={handleInputChange}
                    >
                        <option value="driverApp">Driver Applications</option>
                        <option value="pointChanges">Point Changes</option>
                        <option value="passChange">Password Changes</option>
                        <option value="logins">Login Attempts</option>
                </select>



            </div>
        )}



        <div>
            <button>Create Report</button>
        </div>
            



        </div>
        )

};
export default AdminReports;



