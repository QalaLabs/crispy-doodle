export const getMoodColor = (mood: number) => {
  // Map 1-10 to a 10-step HSL palette
  // 1 (Red/Low) to 10 (Green/High)
  const hue = (mood - 1) * 12; // 0 to 108 (Red to Greenish)
  return `hsl(${hue}, 70%, 45%)`;
};

export const getMoodBg = (mood: number) => {
  const hue = (mood - 1) * 12;
  return `hsl(${hue}, 70%, 95%)`;
};

export const getMoodEmoji = (mood: number) => {
  if (mood <= 2) return "😫";
  if (mood <= 4) return "😕";
  if (mood <= 6) return "😐";
  if (mood <= 8) return "🙂";
  return "✨";
};