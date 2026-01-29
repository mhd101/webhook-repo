export function getEventStyle(action) {
  switch (action) {
    case "PUSH":
      return "bg-green-50 border-green-500";
    case "PULL_REQUEST":
      return "bg-yellow-50 border-yellow-500";
    case "MERGE":
      return "bg-purple-50 border-purple-500";
    default:
      return "bg-gray-50 border-gray-400";
  }
}
