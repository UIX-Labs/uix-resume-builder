/**
 * Extracts initials from firstName and lastName
 * Rules:
 * - If lastName exists: use first word of firstName + last word of lastName
 * - If no lastName but firstName has spaces: split firstName, use first part as firstName and last part as lastName
 * - Returns initials (first letter of firstName + first letter of lastName)
 */
export function getUserInitials(firstName: string | null, lastName: string | null): string {
  let firstPart = '';
  let lastPart = '';

  // If lastName exists, use it
  if (lastName && lastName.trim()) {
    const firstNameWords = firstName?.trim().split(/\s+/) || [];
    const lastNameWords = lastName.trim().split(/\s+/);

    // First word of firstName
    firstPart = firstNameWords[0] || '';
    // Last word of lastName
    lastPart = lastNameWords[lastNameWords.length - 1] || '';
  } else if (firstName && firstName.trim()) {
    // No lastName, check if firstName has spaces
    const firstNameWords = firstName.trim().split(/\s+/);

    if (firstNameWords.length > 1) {
      // Split firstName: first part as firstName, last part as lastName
      firstPart = firstNameWords[0];
      lastPart = firstNameWords[firstNameWords.length - 1];
    } else {
      // Single word firstName, use it as firstPart only
      firstPart = firstNameWords[0];
      lastPart = '';
    }
  }

  // Extract first letter of each part and convert to uppercase
  const firstInitial = firstPart.charAt(0).toUpperCase() || '';
  const lastInitial = lastPart.charAt(0).toUpperCase() || '';

  return firstInitial + lastInitial;
}
