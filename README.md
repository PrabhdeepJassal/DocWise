<p align="center">
  <img src="assets/logo.png" width="140" />
</p>

<h1 align="center">DocWise</h1>

<p align="center">
AI-powered prescription management that helps you never miss a dose</p>


# 💊 DocWise - Smart Prescription Management App

> AI-powered prescription management that helps you never miss a dose

DocWise is an intelligent prescription management application that leverages advanced AI and computer vision to help users manage their medications efficiently. Upload a photo of your prescription, and DocWise extracts medication details, schedules reminders, and answers your health-related queries.

---

## ✨ Features

### 📸 Prescription Photo Upload
- **Instant Capture**: Take photos of prescriptions directly from your camera
- **Gallery Upload**: Select prescription images from your device library
- **High-Quality Processing**: Optimized image handling for accurate data extraction
- **Multi-format Support**: Works with various image formats and lighting conditions

### 🤖 AI-Powered Prescription Analysis
- **Smart Data Extraction**: Automatically extracts medication details including:
  - Drug names and dosages
  - Timing and frequency information (e.g., "3 times daily", "every 6 hours")
  - Prescription dates and validity periods
  - Doctor's instructions and special warnings
  - Quantity and refill information
- **Intelligent Parsing**: Advanced OCR and AI algorithms accurately read prescriptions
- **Data Organization**: Automatically structures information in an easy-to-read format

### 🔔 Smart Reminder & Notifications
- **Custom Reminders**: Set personalized reminder notifications based on medication timing
- **Flexible Scheduling**: Choose notification frequency (daily, multiple times per day, weekly)
- **Push Notifications**: Timely alerts to help users never miss their medication
- **Customizable Alerts**: Adjust reminder preferences, snooze options, and notification sounds
- **Time-Based Reminders**: Schedule reminders based on meal times or daily routines

### 💬 AI Assistant for Health Queries
- **24/7 Support**: Get answers to medication-related questions anytime
- **Intelligent Q&A**: Ask about:
  - Side effects and adverse reactions
  - Drug interactions
  - Dosage clarifications
  - Dietary restrictions
  - When to take medications
- **Context-Aware Responses**: AI understands prescription context for accurate recommendations
- **Safe & Reliable**: Provides information while encouraging consultation with healthcare professionals

### 📊 Prescription Management
- **Digital Prescription Library**: Store all prescriptions in one secure place
- **Prescription History**: Access past prescriptions and medication records
- **Quick Overview**: See all active medications at a glance

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router for seamless screen transitions
- **Camera Integration**: expo-camera for prescription capture
- **Image Processing**: expo-image-picker for gallery uploads
- **UI Components**: React Native components with Ionicons
- **Platform Support**: iOS, Android, and Web

### Backend (Future Integration)
- **API**: Node.js/Express for prescription analysis endpoints
- **AI/ML**: Advanced prescription recognition and OCR
- **Notifications**: Firebase Cloud Messaging for push notifications
- **Database**: MongoDB for storing user data and prescriptions

### Key Libraries
- `expo-router`: File-based routing
- `expo-camera`: Camera functionality
- `expo-image-picker`: Image selection
- `react-native`: Cross-platform mobile development
- `@expo/vector-icons`: Icon library

---

## 📱 Installation & Setup

### Prerequisites
- Node.js v16+ and npm v9+
- Expo CLI installed globally
- iOS Simulator or Android Emulator (or physical device)
- API Keys (future): Google Vision API, Firebase

### Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-repo/docwise.git
cd docwise
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Environment** (Create `.env` file)
```bash
EXPO_PUBLIC_API_BASE_URL=http://your-api-endpoint
EXPO_PUBLIC_GOOGLE_VISION_KEY=your_api_key
```

4. **Start Development Server**
```bash
expo start
```

5. **Run on Different Platforms**

**iOS:**
```bash
expo start --ios
```

**Android:**
```bash
expo start --android
```

**Web:**
```bash
expo start --web
```

6. **Using Physical Device**
- Install Expo Go app from App Store or Play Store
- Scan the QR code from the terminal using your device camera

---

## 🔐 Permissions

### iOS Permissions
- **Camera**: `NSCameraUsageDescription` - To capture prescription photos
- **Photo Library**: `NSPhotoLibraryUsageDescription` - To access and upload prescription images

### Android Permissions
- `CAMERA` - For taking prescription photos
- `READ_EXTERNAL_STORAGE` - To read prescription images from device
- `WRITE_EXTERNAL_STORAGE` - To save prescription data

*Note: All permissions are declared in `app.json` and requested with user consent.*

---

## 📖 Usage Guide

### Getting Started

1. **Open the App**: Launch DocWise on your device
2. **Sign Up/Log In**: Create an account or log in with existing credentials
3. **Upload Prescription**: 
   - Tap the "Scan" button on the home screen
   - Choose to take a photo or select from gallery
   - Position prescription clearly in frame
4. **Review Data**: Check the extracted medication details
5. **Set Reminders**: Configure notification timings based on your medication schedule
6. **Ask Questions**: Use the AI assistant (sparkles icon) to get answers about your medications
7. **Manage Profile**: Access prescription history and settings

### Main Screens

- **Home Screen**: Dashboard with weekly stats, upcoming reminders, and daily summary
- **Scan Screen**: Camera interface for capturing or uploading prescription images
- **Prescription Details**: View extracted medication information
- **Reminders**: Manage medication reminders and notifications
- **Profile**: User settings and prescription history

---

## 🔒 Privacy & Security

- ✅ All prescription data is handled securely
- ✅ Images are processed locally when possible
- ✅ User data is encrypted and protected
- ✅ No data is shared without explicit consent
- ✅ Compliance with HIPAA and GDPR standards
- ✅ Option to delete prescription images after processing

---

## 🎯 Roadmap & Future Features

### Phase 2
- 💊 Prescription refill reminders
- ⚠️ Drug interaction warnings
- 📲 Multi-device sync

### Phase 3
- 🏪 Integration with pharmacy services
- 👨‍👩‍👧 Family member sharing (with permissions)
- 📊 Medication adherence tracking and analytics

### Phase 4
- 📈 Health insights and trends
- 🔬 Integration with medical records
- 🤖 Advanced AI recommendations

---

## 🐛 Troubleshooting

### Camera Not Working
- Ensure camera permission is granted in device settings
- Try restarting the app
- Check if device storage is full

### Images Not Being Processed
- Ensure image quality is good (well-lit, clear)
- Try rotating the prescription image
- Check internet connection for API calls

### Reminders Not Showing
- Enable notifications in device settings
- Check app notification settings
- Ensure device is not in "Do Not Disturb" mode

---

## 🤝 Contributing

We welcome contributions! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Important Disclaimer

**DocWise is a helper tool and should not replace professional medical advice.** Always:
- Consult with your healthcare provider for medical concerns
- Verify medication instructions with your doctor
- Report any severe side effects to medical professionals immediately
- Do not use DocWise as a substitute for professional medical judgment

---

## 👨‍💻 Team

- **Prabhdeep Singh** - Lead Developer
- **Contributors**: Open to community contributions

---

Made with ❤️ by Rubber Ducky Mafia Team

**Version**: 1.0.0  
**Last Updated**: January 2026
