import { useEffect, useState } from "react";
import { getMembers } from "../../api/userApi";
import "../../App.css";

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch members", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = (user) => {
    // Only Admin can be deactivated here
    if (user.role?.toLowerCase() !== "admin") {
      alert("User cannot be deactivated");
      return;
    }

    setMembers((prev) =>
      prev.map((member) =>
        member.id === user.id
          ? { ...member, status: "Deactivated" }
          : member
      )
    );

    alert(`${user.name} deactivated successfully`);
  };

  if (loading) {
    return (
      <div className="members-container">
        <h1>Members</h1>
        <div className="empty">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="members-container">
      <h1>Members</h1>

      {members.length === 0 ? (
        <div className="empty">No Members Found</div>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={
                      user.status === "Deactivated"
                        ? "status-deactivated"
                        : "status-active"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-deactivate"
                    onClick={() => handleDeactivate(user)}
                    disabled={user.status === "Deactivated"}
                  >
                    {user.status === "Deactivated"
                      ? "Deactivated"
                      : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Members;