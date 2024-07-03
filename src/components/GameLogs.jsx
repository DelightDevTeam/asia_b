import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import BASE_URL from '../hooks/baseURL';
import useData from '../hooks/useData';

export default function GameLogs() {
    const [param, setParam] = useState("today")
    const [url, setUrl] = useState(BASE_URL + '/wager-logs?type=' + param);
    const {data, loading} = useData(url);

    useEffect(() => {
        setUrl(BASE_URL + '/wager-logs?type=' + param);
    }, [param]);

    const allData = data?.meta;
    const logs = data?.data;
    const pages = data?.meta?.links;


  return (
    <>
        <div className="container my-4 mb-5 pb-5">
          <div className="d-flex justify-content-center mb-4 gap-3">
            <button className={`btn btn-sm btn-${param === "today" ? "warning" : "outline-warning"}`} onClick={()=>setParam("today")}>
                Today
            </button>
            <button className={`btn btn-sm btn-${param === "yesterday" ? "warning" : "outline-warning"}`} onClick={()=>setParam("yesterday")}>
                Yesterday
            </button>
            <button className={`btn btn-sm btn-${param === "this_week" ? "warning" : "outline-warning"}`} onClick={()=>setParam("this_week")}>
                This Week
            </button>
            <button className={`btn btn-sm btn-${param === "last_week" ? "warning" : "outline-warning"}`} onClick={()=>setParam("last_week")}>
                Last Week
            </button>
          </div>
          <div className="table-responsive">
            <Table className='text-center'>
                <thead>
                <tr>
                    <th>
                    <small>From</small>
                    </th>
                    <th>
                    <small>To</small>
                    </th>
                    <th>
                    <small>ဂိမ်းနာမည်</small>
                    </th>
                    <th>
                    <small>အကြိမ်ရေ</small>
                    </th>
                    <th>
                    <small>လောင်းကြေး</small>
                    </th>
                    <th>
                    <small>လွှဲပြောင်းငွေ</small>
                    </th>
                </tr>
                </thead>
                <tbody>
                {loading ? 
                <span className='my-3'>
                    loading...
                </span> : logs && logs.map((log, index) => (
                    <tr key={index}>
                    <td>{log.from_date}</td>
                    <td>{log.to_date}</td>
                    <td>
                        {log.product}
                    </td>
                    <td className={`${log.type == "withdraw" ? "text-danger" : "text-success"}`}>
                        {log.total_count}
                    </td>
                    <td>{log.total_bet_amount}</td>
                    <td className={`${log.total_transaction_amount < 0 ? "text-danger" : "text-success"}`}>{log.total_transaction_amount}</td>
                    </tr>
                ))}
                {logs && logs.length == 0 && !loading && (
                    <tr>
                        <td colSpan={6}>
                            No Data Found!
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center pb-4">
                <div className='m-1'>
                    <button onClick={() => setUrl(pages[0]?.url)} className="btn btn-outline-warning" disabled={allData?.current_page === 1}>
                        <i className="fas fa-angle-left"></i>
                    </button>
                </div>
                {pages && pages.slice(1, -1).map((page, index) => (
                    <div key={index} className='m-1'>
                        <button className={`btn ${page.active ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setUrl(page.url)}>
                            {page.label}
                        </button>
                    </div>
                ))}
                <div className='m-1'>
                    <button onClick={() => setUrl(pages[pages.length - 1].url)} className="btn btn-outline-warning" disabled={allData?.current_page === (pages?.length - 2)}>
                        <i className="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
          </div>

        </div>
    </>
  )
}
