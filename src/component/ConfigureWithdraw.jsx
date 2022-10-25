import React, {useState} from 'react'
import './ConfigureWithdraw.css'

const ConfigureWithdraw = () => {
    return (
        <div className='main-container'>
            <div className='container-row'>
                <div className='row-group'>
                    <h2>Employee Enrollment</h2>
                    <div className='group-inline'>
                        <span>Day 1-7 Transfers</span><span>AED</span>
                    </div>
                    <div className='group-inline'>
                        <span>Day 8-15 Transfers</span><span>AED</span>
                    </div>
                    <div className='group-inline'>
                        <span>Day 16-23 Transfers</span><span>AED</span>
                    </div>
                    <div className='group-inline'>
                        <span>Day 24-31 Transfers</span><span>AED</span>
                    </div>
                    <div className='group-inline'>
                        <span>Savings</span><span>Freed of Charge</span>    
                    </div>
                    <div className='group-inline'>
                        <span>Probation period triggering Blockout</span><span>Months</span>
                    </div>
                </div>
                <div className='row-group'>
                    <h2>Employee Enrollment</h2>
                    <span>Allow FlexxPay contribution:</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <span>Contributing by:</span>
                    <select size={1} className='contributing-by'>
                        <option value="1">By Salary</option>
                    </select>
                </div>
                <div className='row-group'>
                    <h2>Employee Enrollment</h2>
                    <div className='group-inline'>
                        <span>Allow employee sign-up with mobile number</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className='group-inline'>
                        <span>Allow employee sign-up with personal email</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className='group-inline'>
                        <span>Manual approval of employee's transactions</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className='group-inline'>
                        <span>2FA during login</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='container-row'>
                <div className='row-group'>
                    <h2>Employee Enrollment</h2>
                    <span>Use percentage</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <span>Contribution Amount:</span>
                    <input />
                    <span>Default contribution amount: 0.0 AED</span>
                </div>
                <div className='row-group'>
                    <h2>Limits</h2>
                    <span>Contributing by:</span>
                    <select size={1} className='contributing-by'>
                        <option value="1">By Employee</option>
                    </select>
                    <span>Advance limit:</span>
                    <input />
                    <span>FlexxPay Default: 3000.00 AED</span>
                    <span>Max advance from earned salary:</span>
                    <input />
                    <span>FlexxPay Default: 50%</span>
                </div>
                <div className='row-group'>
                    <h2>Salary</h2>
                    <div className='group-inline'>
                        <span>Use days from the end of the month</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <span>Salary Pay Day (day in the month)</span>
                    <select size={1} className='contributing-by'>
                        {Array.from(31).map((n)=>{
                            console.log(n)
                            return <option key={n} value={n}>{n}</option>
                        })
                        }
                    </select>
                    <span>FlexxPay monthly settlement file will be sent to you</span>
                    <div className='group-inline'>
                        <select size={1} className='contributing-by'>
                            {Array.from(31).map((n)=>{
                                console.log(n)
                                return <option key={n} value={n}>{n}</option>
                            })
                            }
                        </select>
                        <span>Days before salary Pay Day</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigureWithdraw