# mosaic-player

1. git clone
2. run `npm install`
3. run `react-native run-ios`
4. If device, run `react-native run-ios --device`


A few notes:

* EXPO does not seem to support objective-c native code. This did not seem to be the standard (react native and EXPO have their own libraries, but test requested objective-c for spotify sdk)

* I added a small api client/request on the js side even though this could be achieved on the ios sdk. I did this because it seemed you wanted the playlists list from their web apis.

* I enjoyed going through the discoveries of this project. I also used some of react-native-spotify project, although I performed a very thorough cleanup there to focus on the scope of what was asked. 
