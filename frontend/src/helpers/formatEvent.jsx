export function formatEvent(e) {
  const Bold = ({ children }) => (
    <>
    <span className="font-semibold">{children}</span>
    </>
  );

  if (e.action === "PUSH") {
    return (
      <>
        <Bold>{e.author}</Bold> pushed to{" "}
        <Bold>{e.to_branch}</Bold> on{" "}
        <Bold>{e.timestamp}</Bold>
      </>
    );
  }

  if (e.action === "PULL_REQUEST") {
    return (
      <>
        <Bold>{e.author}</Bold> submitted a pull request from{" "}
        <Bold>{e.from_branch}</Bold> to{" "}
        <Bold>{e.to_branch}</Bold> on{" "}
        <Bold>{e.timestamp}</Bold>
      </>
    );
  }

  if (e.action === "MERGE") {
    return (
      <>
        <Bold>{e.author}</Bold> merged branch{" "}
        <Bold>{e.from_branch}</Bold> to{" "}
        <Bold>{e.to_branch}</Bold> on{" "}
        <Bold>{e.timestamp}</Bold>
      </>
    );
  }

  return null;
}