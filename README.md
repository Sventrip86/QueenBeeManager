# Queen Bee Manager

## Introduction
Queen Bee Manager is a mobile application designed for apiarists to manage their apiaries and bee hives. It helps keep track of various apiaries, hives, and visits, providing an easy overview of the apiary's state and productivity.

## Features
- **Manage Apiaries**: Users can create, view, and delete apiaries.
- **Track Hives**: Each apiary can have multiple hives. Users can add and remove hives.
- **Record Visits**: Users can record each visit to a hive, tracking important parameters and observations.
- **Firebase Integration**: Data and Auth is stored and managed using Firebase cloud storage.

## Technology Stack
- React Native
- Firebase Firestore
- Firebase Authentication
- React Navigation
- Native Paper

## Installation
To run the app on your local machine, follow these steps:

1. **Clone the Repository**
   \```bash
   git clone https://github.com/Sventrip86/QueenBeeManager.git
   cd QueenBeeManager
   \```

2. **Install Dependencies**
   \```bash
   npm install
   \```

3. **Set Up Firebase**
   - Create a Firebase project and enable Firestore and Authentication.
   - Add your Firebase configuration to `src/config/firebaseConfig.js`.

4. **Run the App**
   \```bash
   npm start
   \```

## How to Use the App
After launching the app, create an account or log in to manage your apiaries. First create an Apiary, then select the apiary and create the first Hive related to that apiary. You can then navigate through different tabs to access apiaries, hives, and profile details. For every hive, you can create a visit that is a snapshot of the hive at a certain time and date.

## Contributing
Contributions are welcome! If you have any suggestions or want to improve the app, please feel free to fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the [GPL-3.0 license](LICENSE).
"""



