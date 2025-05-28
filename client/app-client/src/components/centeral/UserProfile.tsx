
import decodeToken from "./authUtils"

const UserProfile = () => {
  const token = sessionStorage.getItem("token")
  if (!token) return null

  const payload = decodeToken(token)
  if (!payload) return null

  const initial = payload.email.charAt(0).toUpperCase()

  return (
    <div className="user-profile">
      <div className="profile-circle">
        <span className="profile-initial">{initial}</span>
      </div>
    </div>
  )
}

export default UserProfile

