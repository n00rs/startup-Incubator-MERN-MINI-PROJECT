import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Nav } from 'react-bootstrap'
import { ApplicationContext, urlContext } from '../../context/context';
import AppsTable from './AppsTable';
import Slots from './Slots';
import Banner from '../Banner'

const AdminBanner = () => {
  const { setApplications, statusChng } = useContext(ApplicationContext)
  const { API_URL } = useContext(urlContext)
  const [tabs, setTabs] = useState('pending')

  const fetchAllApps = async () => {
    try {
      const response = await axios.get(API_URL.adminViewAllApps, { withCredentials: true })
      if (response.data.fecthAllApps)
        setApplications(response.data.fecthAllApps)
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchAllApps()
  }, [statusChng])

  const handleSelect = (event) => {
    setTabs(event)
  }

  return (
    <div>
      <Banner imgSrc={'/images/adminBanner.jpg'} />

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

      {tabs === 'pending' && <AppsTable tab={tabs} />}
      {tabs === 'viewAll' && <AppsTable tab={tabs} />}
      {tabs === 'slots' && <Slots />}
    </div>
  )
}

export default AdminBanner