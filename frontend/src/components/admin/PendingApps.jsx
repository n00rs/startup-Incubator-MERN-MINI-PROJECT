import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import { toast } from "react-toastify"
// import { toast } from "react-toastify"
import { ApplicationContext, urlContext } from "../../context/context"
import ViewEachApp from "./ViewEachApp"

const PendingApps = ({ tab }) => {

  const { applications, setApplications, setStatusChng } = useContext(ApplicationContext)
  const { API_URL } = useContext(urlContext)
  // console.log(applications, 'table')
  const [showModal, setShowModal] = useState(false)
  const [appId, setAppId] = useState('')

  const handleUpdate = async (e, id) => {
    try {
      let status = e.target.value

      console.log(status, id);

      const response = await axios.put(API_URL.adminUpdateStatus + id, { status }, { withCredentials: true })
      console.log(response.data);
      if (response.data.updated) setStatusChng((prev) => !prev)
    } catch (err) {
      console.log(err, 'err in updating status');
      toast.error(err.message)
    }
  }

  let filterApps = (tab === 'pending') ? applications.filter(app => app.status === 'pending') : applications

  return (
    <div className="p-5">

      <table className="table table-hover">
        <thead style={{ background: '#000d68', color: '#fff' }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company Name</th>
            <th scope="col">Application name</th>
            <th scope="col">View</th>
            <th scope="col">Status</th>
            {tab === 'pending' &&
              <>
                <th>Accept</th>
                <th>Decline</th>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {applications ? filterApps.map((apps, index) => {

            return <tr>
              <th scope="row">{index + 1}</th>
              <td>{
                (apps?.companyDetails?.companyName) ?
                  apps.companyDetails.companyName : ''}</td>
              <td>{
                (apps?.userDetails?.name) ?
                  apps.userDetails.name : ''
              }</td>
              <td>
                <button className="btn btn-outline-black" onClick={() => { setShowModal(true); setAppId(apps._id) }} >view Appdetails</button>
              </td>
              <td>{tab === 'pending' && apps?.status && apps.status}
                {tab === 'viewAll' &&
                  apps.status == 'pending' ?
                  <ProgressBar now={33} animated striped variant="warning" /> :
                  apps.status === 'approved' ?
                    <ProgressBar now={66} animated striped variant="primary" /> :
                    apps.status === 'Slot Alloted' ?
                      <ProgressBar now={100} animated striped variant="success" /> :
                      tab === 'viewAll' && <ProgressBar now={3} animated striped variant="danger" />
                }
              </td>
              {
                tab === 'pending' &&
                <>
                  <td>
                    <button className="bg-success" value='approved' onClick={(e) => handleUpdate(e, apps._id)}>Approve</button>
                  </td>
                  <td>
                    <button className="bg-danger" value='rejected' onClick={(e) => handleUpdate(e, apps._id)} >Reject</button>
                  </td>
                </>
              }
            </tr>
          })
            : (<tr></tr>)}


        </tbody>
      </table>
      <ViewEachApp showModal={showModal} setShowModal={setShowModal} id={appId} />
    </div>
  )
}

export default PendingApps