import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Nav } from 'react-bootstrap'
import { ApplicationContext, urlContext } from '../../context/context';
import PendingApps from './PendingApps';
import Slots from './Slots';

const AdminBanner = () => {
  const { applications, setApplications, statusChng } = useContext(ApplicationContext)

  const { API_URL } = useContext(urlContext)
  const [tabs, setTabs] = useState('pending')

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
  console.log(statusChng, 'status')

  useEffect(() => {
    fetchAllApps()
  }, [statusChng])

  const handleSelect = (event) => {
    console.log(event);
    setTabs(event)
  }

  return (

    <div>
      <div className='align-items-center'>
        <img src="/images/adminBanner.jpg" alt="" className='img-fluid ' />
        <div className="container mt-5">

          <div className="col md-12 justify-content-center">
            <div className="row">
              <Nav justify variant='tabs' defaultActiveKey='pending' style={{ background: 'rgb(66 86 145 / 50%)' }} onSelect={handleSelect} >
                <Nav.Item >
                  <Nav.Link className='text-black' eventKey='pending'>Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='text-black' eventKey='viewAll'>View All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='text-black' eventKey='slots' >Allot Slot</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {tabs === 'pending' && <PendingApps tab={tabs}  />}
      {tabs == 'viewAll' && <PendingApps tab={tabs} />}
      {tabs === 'slots' && <Slots />}
    </div>
  )
}

export default AdminBanner