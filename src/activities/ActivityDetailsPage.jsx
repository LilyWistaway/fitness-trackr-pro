import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getActivityById, deleteActivity } from "../api/activities";

export default function ActivityDetailsPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      setLoading(true);
      setError(null);
      try {
        const data = await getActivityById(activityId);
        if (!cancelled) setActivity(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, [activityId]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <p>Loading activity…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>No activity found.</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      {activity.description && <p>{activity.description}</p>}
      {activity.creatorName && (
        <p>
          <strong>Created by:</strong> {activity.creatorName}
        </p>
      )}

      {token && <button onClick={tryDelete}>Delete this activity</button>}
    </>
  );
}
