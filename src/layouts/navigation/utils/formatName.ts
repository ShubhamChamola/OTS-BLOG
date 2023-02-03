export default function formatUserName(
  firstName: string | null,
  lastName: string | null
): string {
  if (firstName && lastName) {
    if (firstName.length <= 8 && lastName.length <= 8) {
      return `${firstName} ${lastName}`;
    } else if (firstName.length <= 4) {
      return `${firstName[0]} ${lastName}`;
    } else {
      return `${firstName[0]}.${lastName[0]}.`;
    }
  } else {
    return firstName || lastName || "User";
  }
}
