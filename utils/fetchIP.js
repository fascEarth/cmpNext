export async function fetchIP() {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");

    if (response.ok) {
      const data = await response.json();
      return data.ip;
    } else {
      console.error("Failed to fetch client IP");
      return null;
    }
  } catch (error) {
    console.error("Error fetching client IP:", error);
    return null;
  }
}
