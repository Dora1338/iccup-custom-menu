export function calculateReward(format: string, players: number) {
  let reward: number[] = [];
  switch (format) {
    case "1x1":
      if (players < 4) {
        reward = [0, 0, 0];
      } else if (players >= 4 && players <= 7) {
        reward = [30, 20, 10];
      } else if (players >= 8 && players <= 13) {
        reward = [50, 30, 20];
      } else if (players >= 14 && players <= 17) {
        reward = [70, 50, 30];
      } else if (players >= 18) {
        reward = [80, 60, 40];
      }
      break;
    case "2x2":
      if (players < 4) {
        reward = [0, 0, 0];
      } else if (players >= 4 && players <= 7) {
        reward = [50, 25, 10];
      } else if (players >= 8 && players <= 12) {
        reward = [70, 50, 30];
      } else if (players >= 13) {
        reward = [80, 60, 40];
      }
      break;
    case "3x3":
      if (players < 4) {
        reward = [0, 0, 0];
      } else if (players >= 4 && players <= 6) {
        reward = [50, 30, 20];
      } else if (players >= 7) {
        reward = [70, 50, 30];
      }
      break;
    case "5x5":
      if (players < 4) {
        reward = [0, 0, 0];
      } else if (players >= 4 && players <= 6) {
        reward = [70, 50, 30];
      } else if (players >= 7) {
        reward = [80, 60, 40];
      }
      break;
  }
  return reward;
}
