# AI Signature Generator

An AI-powered signature generator application built with React Native, Expo, and Node.js. This application allows users to generate custom handwritten signatures by providing text prompts. Generated signatures can be downloaded, shared, and viewed in a history section.

## Features

- Generate custom signatures using AI
- Save generated signatures to your device
- Share signatures with others
- View history of previously generated signatures
- Choose from different signature styles

## Technology Stack

### Frontend
- React Native
- Expo
- TypeScript
- Context API for state management
- AsyncStorage for local storage

### Backend
- Node.js
- Express.js
- Replicate AI API for signature generation

## Project Structure

```
project/
│
├── frontend/           # React Native Expo app
│   ├── assets/         # Images, fonts, etc.
│   │   └── src/
│   │       └── App.tsx         # Entry point
│   └── backend/            # Node.js API server
│       └── src/
│           └── index.js     # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Replicate API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-signature-generator.git
cd ai-signature-generator
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with your Replicate API key
```
REPLICATE_API_TOKEN=your_api_key_here
PORT=8080
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the App

1. Start the backend server
```bash
cd backend
npm start
```

2. Start the Expo development server
```bash
cd frontend
npm start
```

3. Use the Expo Go app on your device to scan the QR code or use an emulator

## Usage

1. Enter a prompt for your signature in the input field (e.g., "John Smith" or "Jane Doe")
2. Select a style for your signature
3. Tap "Generate Signature" and wait for the AI to create your signature
4. Once generated, you can download or share the signature
5. View your signature history in the History tab

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Replicate AI](https://replicate.com/) for the AI model
- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the mobile app framework 