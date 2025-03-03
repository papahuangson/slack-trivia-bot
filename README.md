# Slack Trivia Bot 🎯

A fun and interactive Slack bot that lets you play trivia games with your team! Challenge your colleagues and keep track of scores right within Slack.

## 🚀 Features

- Start trivia games with `/trivia` command
- View leaderboard with `/trivia-scores` command
- Multiple-choice questions with interactive buttons
- Score tracking for all participants
- Easy to extend with new questions and categories

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Slack workspace with admin permissions

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/papahuangson/slack-trivia-bot.git
   cd slack-trivia-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   SLACK_BOT_TOKEN=your-bot-token
   SLACK_SIGNING_SECRET=your-signing-secret
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   # or
   yarn build
   ```

5. Start the server:
   ```bash
   npm start
   # or
   yarn start
   ```

## ⚙️ Configuration

### Slack App Setup

1. Create a new Slack App at [api.slack.com/apps](https://api.slack.com/apps)
2. Under "OAuth & Permissions", add the following bot token scopes:
   - `commands`
   - `chat:write`
   - `im:write`
3. Install the app to your workspace
4. Copy the Bot User OAuth Token and Signing Secret to your `.env` file

### Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port number for the server (default: 3000) |
| `SLACK_BOT_TOKEN` | Your Slack bot's OAuth token |
| `SLACK_SIGNING_SECRET` | Your Slack app's signing secret |

## 🎮 Usage

### Available Commands

- `/trivia` - Start a new trivia game
- `/trivia-scores` - View the current leaderboard

### Adding New Questions

To add new trivia questions, modify the questions database in `src/data/questions.ts`:

```typescript
export const questions = [
{
question: "Your question here?",
options: ["Option 1", "Option 2", "Option 3", "Option 4"],
correctAnswer: 0 // Index of correct answer
}
];
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add JSDoc comments for new functions
- Update tests for new features
- Update documentation as needed

## 📁 Project Structure

slack-trivia-bot/
├── src/
│ ├── actions/ # Slack interactive action handlers
│ ├── commands/ # Slack command handlers
│ ├── config/ # App configuration
│ ├── data/ # Questions and other data
│ └── index.ts # Main entry point
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── package.json # Project dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # This file


## 🔒 Security

- Never commit your `.env` file or any sensitive credentials
- Regularly update dependencies to patch security vulnerabilities
- Follow Slack's security best practices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the [Slack Bolt framework](https://slack.dev/bolt-js/concepts) team
- All contributors who help improve this project

## 📫 Support

If you have any questions or run into issues, please:
1. Check the [existing issues](https://github.com/yourusername/slack-trivia-bot/issues)
2. Open a new issue if your problem isn't already reported
3. Provide as much detail as possible when reporting issues