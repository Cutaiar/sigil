interface ApiCredentials {
  apiKey: string
  apiUrl: string
}

// Generate a random three-word endpoint
function generateRandomEndpoint(): string {
  const words = [
    "ocean",
    "marble",
    "sunset",
    "forest",
    "river",
    "mountain",
    "desert",
    "valley",
    "meadow",
    "canyon",
    "island",
    "garden",
    "crystal",
    "ember",
    "shadow",
    "thunder",
    "whisper",
    "breeze",
    "autumn",
    "winter",
  ]

  // Pick three random words
  const randomWords = Array.from({ length: 3 }, () => words[Math.floor(Math.random() * words.length)])

  return `sigil.io/${randomWords.join("-")}`
}

// Generate a random API key
function generateApiKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const prefix = "sk_test_"
  let result = prefix

  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

export async function fetchApiCredentials(): Promise<ApiCredentials> {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        apiKey: generateApiKey(),
        apiUrl: generateRandomEndpoint(),
      })
    }, 800) // Simulate network delay
  })
}
