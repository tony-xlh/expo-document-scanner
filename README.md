# expo-document-scanner

A document scanner demo in Expo.

It can scan documents via cameras or physical document scanners.

[Dynamsoft Document Normalizer](https://www.dynamsoft.com/document-normalizer/docs/core/introduction/) is used to detect the document boundaries and crop the document image via the camera and [Dynamic Web TWAIN](https://www.dynamsoft.com/web-twain/overview)'s [REST API](https://www.dynamsoft.com/web-twain/docs/indepth/development/restful.html) is used to connect to document scanners.

Demo video:

https://github.com/tony-xlh/expo-document-scanner/assets/5462205/ff0c15f2-db86-4bd2-97b1-12645739e111

In the demo video, it first opens the camera and scans the document in react-native-webview. Then, it scans a document image from a scanner. After scanning, it opens the history browser and selects an image for sharing.

The demo can run in Expo's managed mode.
