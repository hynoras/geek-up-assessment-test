const AVATAR_COLORS = [
  "0D8ABC",
  "D7263D",
  "FF6B6B",
  "FFD93D",
  "6BCB77",
  "4D96FF",
  "845EC2",
  "F9A826",
  "FF8066",
  "29C7AC"
]

export const getAvatarColor = (userId: number): string => {
  return AVATAR_COLORS[userId % AVATAR_COLORS.length]
}
