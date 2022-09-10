import axios from "axios"
import { useContext, useEffect, useState } from "react"
// import { toast } from "react-toastify"
import { ApplicationContext, urlContext } from "../../context/context"
import ViewEachApp from "./ViewEachApp"

const PendingApps = () => {

  const { applications, setApplications, setStatusChng} = useContext(ApplicationContext)
  const { API_URL } = useContext(urlContext)
  console.log(applications, 'table')
  const [showModal, setShowModal] = useState(false)
  const [appId, setAppId] = useState('')
  
  // const [pendingApp, setPendingApp] = useState([])
  // const[statusChng, ] = useState(false)

  // console.log(pendingApp, 'pending');
  const handleUpdate = async (e, id) => {
    try {
      let status = e.target.value

      console.log(status, id);

      const response = await axios.put(API_URL.adminUpdateStatus + id, { status }, { withCredentials: true })
      console.log(response.data);
      if(response.data.updated) setStatusChng(true)
    } catch (err) {
      console.log(err, 'err in updating status');
    }

  }

  // useEffect(() => {
  //   let filterApps = applications.filter(app => app.status === 'pending')
  //   setPendingApp(filterApps)
  // }, [applications,statusChng])

  return (
    <div className="p-5">

      <table className="table table-hover">
        <thead style={{ background: '#000d68', color: '#fff' }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company Name</th>
            <th scope="col">Application name</th>
            <th scope="col">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {pendingApp ? (pendingApp.map((apps, index) => { */}
          { applications ? (applications.filter(app => app.status === 'pending' ).map((apps, index) => {

            return <tr>
              <th scope="row">{index + 1}</th>
              <td>{
                (apps?.companyDetails?.companyName) ?
                  apps.companyDetails.companyName : ''}</td>
              <td>{
                (apps?.userDetails?.name) ?
                  apps.userDetails.name : ''
              }</td>
              <td>{
                (apps?.status) ? apps.status : ''
              }

              </td>
              <td>
                <button className="btn btn-outline-black" onClick={() => { setShowModal(true); setAppId(apps._id) }} >view Appdetails</button>
              </td>
              <td>
                <button className="bg-success" value='approved' onClick={(e) => handleUpdate(e, apps._id)}>Approve</button>
              </td>
              <td>
                <button className="bg-danger" value='rejected' onClick={(e)=> handleUpdate(e,apps._id)} >Reject</button>
              </td>
            </tr>
          })
          ) : (<tr></tr>)}


        </tbody>
      </table>
      <ViewEachApp showModal={showModal} setShowModal={setShowModal} id={appId} />
    </div>

  )
}

export default PendingApps