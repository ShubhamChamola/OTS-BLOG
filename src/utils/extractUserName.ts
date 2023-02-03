export default function extractUserName(name: string) {
  const nameArr = name.split(" ");
  let [firstName, lastName] = [nameArr[0], nameArr.pop()];

  firstName = firstName[0].toUpperCase() + firstName.slice(1);
  lastName = lastName ? lastName[0].toUpperCase() + lastName.slice(1) : "";

  return [firstName, lastName];
}
