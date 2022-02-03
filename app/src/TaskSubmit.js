import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./customHooks/useFetch";
import { toDateTime } from "./utils";

const TaskSubmit = ({ token, user }) => {
  const TASK_INTERVAL = 10000;
  const { id: taskId } = useParams();
  const [task, setTask] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const [answer, setAnswer] = React.useState("");
  const [spendTime, setSpendTime] = React.useState(0);
  const [sessionsCount, setSessionsCount] = React.useState(0);
  const [avgSessTime, setAvgSessionTime] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  let api = useFetch();

  React.useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSpendTime((spendTime) => spendTime + 1);
      setAvgSessionTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [spendTime]);

  React.useEffect(() => {
    setAvgSessionTime(spendTime / sessionsCount);
  }, [spendTime, sessionsCount]);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      let { data } = await api(
        `/timeTracker`,
        "POST",
        JSON.stringify({
          taskId,
          userId: user?.id,
          period: TASK_INTERVAL,
        })
      );

      if (data.success) {
        setTask(data.data);
      } else {
        setErrors(JSON.stringify(data.errors));
      }
    }, TASK_INTERVAL);

    return () => clearInterval(interval);
  }, [taskId, token, user]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api(`/tasks/${taskId}`);
      const result = data;
      let task = { ...result.data, totalTime: 9945, sessionsCount: 2 };

      setTask(task);
      setSpendTime(task.totalTime);
      setSessionsCount(task.sessionsCount);
    })();
  }, [taskId]);

  const onChangeAnswer = React.useCallback(
    (event) => setAnswer(event.target.value),
    []
  );

  const onSubmitAnswer = React.useCallback(
    (event) => {
      (async () => {
        setIsSubmitting(true);

        const { data } = await api(
          `/tasks/${taskId}`,
          "PUT",
          JSON.stringify({ task: { submitted: true, answer } })
        );
        if (data.success) {
          setTask(data.data);
        } else {
          setErrors(JSON.stringify(data.errors));
        }

        setIsSubmitting(false);
      })();
    },
    [taskId, answer]
  );

  const isLoading = task === null;
  return isLoading ? (
    "Loading…"
  ) : (
    <>
      <div>
        <Link to="/">Back</Link>
      </div>
      <div>Spent time: {toDateTime(spendTime)}</div>
      <div>Sessions count: {sessionsCount}</div>
      <div>Avarage Time : {toDateTime(avgSessTime)}</div>
      <div>
        <h1>{task.instructions}</h1>

        {task.submitted ? (
          <>
            <h3>Your answer</h3>
            <hr />
            <p>{task.answer}</p>
          </>
        ) : (
          <>
            <p>Submit your answer:</p>
            <textarea
              rows="20"
              style={{ display: "block", width: "80%" }}
              onChange={onChangeAnswer}
              value={answer}
            />
            {errors ? <p>{errors}</p> : null}
            <button onClick={onSubmitAnswer} disabled={isSubmitting}>
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TaskSubmit;
