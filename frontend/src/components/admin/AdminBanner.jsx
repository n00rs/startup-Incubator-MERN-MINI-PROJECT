import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { ApplicationContext, urlContext } from '../../context/context';

const AdminBanner = () => {
  const { applications, setApplications, statusChng } = useContext(ApplicationContext)

  const { API_URL } = useContext(urlContext)

  const fetchAllApps = async () => {
    try {
      const response = await axios.get(API_URL.adminViewAllApps, { withCredentials: true })
      if (response.data.fecthAllApps)
        setApplications(response.data.fecthAllApps)

    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }
  console.log(statusChng , 'status')
  useEffect(() => { fetchAllApps() }, [statusChng])
  return (
    <div>
      <div className='align-items-center'>
        <img src="/images/adminBanner.jpg" alt="" className='img-fluid ' />
        <div className="container mt-5">

          <div className="col md-12 justify-content-center">
            <div className="row">
              <h1>hello admin</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBanner