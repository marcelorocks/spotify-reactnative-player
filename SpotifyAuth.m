#import "SpotifyLoginViewController.h"
#import "SpotifyAuth.h"
#import "SpotifyLoginViewController.h"
#import "AppDelegate.h"

@interface SpotifyAuth ()
@property (nonatomic, strong) SPTAuth *auth;
@property (nonatomic, strong) SPTAudioStreamingController *player;
@property (nonatomic, strong) NSString *clientID;
@property (nonatomic, strong) NSArray *requestedScopes;
@property (nonatomic, strong) NSString *currentUri;
@end

@implementation SpotifyAuth

+ (id) sharedManager {
  static SpotifyAuth *sharedMyManager = nil;
  @synchronized(self) {
    if (sharedMyManager == nil)
      sharedMyManager = [[self alloc] init];
  }
  return sharedMyManager;
}

RCT_EXPORT_MODULE(SpotifyModule)

RCT_REMAP_METHOD(
                 initWithCredentials,
                 setClientID:(NSString *) clientID
                 setRedirectURL:(NSString *) redirectURL
                 callback:(RCTResponseSenderBlock)block
                 )
{
  SpotifyAuth *sharedManager = [SpotifyAuth sharedManager];
  
  self.auth = [SPTAuth defaultInstance];
  self.player = [SPTAudioStreamingController sharedInstance];
  self.auth.clientID = clientID;
  self.auth.redirectURL = [NSURL URLWithString:redirectURL];
  self.auth.sessionUserDefaultsKey = @"current session";
  self.auth.requestedScopes = [NSArray arrayWithObject:SPTAuthStreamingScope];
  self.player.delegate = self;
  self.player.playbackDelegate = self;
  
  [sharedManager setMyScheme:redirectURL];
  
  NSError *audioStreamingInitError;
  BOOL success = [self.player startWithClientId:self.auth.clientID error:&audioStreamingInitError];
  
  if(success) {
    block(@[@(success), [NSNull null]]);
  } else {
    block(@[@(success), audioStreamingInitError.description]);
  }
}

- (SPTAudioStreamingController *) audioController {
  return [SPTAudioStreamingController sharedInstance];
}

RCT_EXPORT_METHOD(accessToken:(RCTResponseSenderBlock)block)
{
  block(@[[self.auth.session accessToken]]);
}

RCT_EXPORT_METHOD(loggedIn:(RCTResponseSenderBlock)block)
{
  block(@[@([self.auth.session isValid])]);
}

RCT_EXPORT_METHOD(authenticatePlayerForPlaylist: (NSString *) playListUri)
{
  self.currentUri = playListUri;
  [self.player loginWithAccessToken:self.auth.session.accessToken];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[];
}

- (void) audioStreamingDidLogin:(SPTAudioStreamingController *)audioStreaming
{
  if(_currentUri != nil) {
    [self.player playSpotifyURI:_currentUri startingWithIndex:0 startingWithPosition:0 callback:^(NSError *error) {
      if(error != nil){
        NSLog(@"\n\n>>> ERROR: %@", error.localizedDescription);
      }
    }];
  }
}

RCT_REMAP_METHOD(startAuthenticationFlow, callback:(RCTResponseSenderBlock)block)
{
  NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  NSURL *authURL = [self.auth spotifyWebAuthenticationURL];
  
  SpotifyLoginViewController *webView1 = [[SpotifyLoginViewController alloc] initWithURL:authURL];
  UINavigationController *controller = [[UINavigationController alloc] initWithRootViewController: webView1];
  
  [delegate.window.rootViewController presentViewController: controller animated:YES completion:nil];
  
  [center addObserverForName:@"loginRes" object:nil queue:nil usingBlock:^(NSNotification *notification)
   {
     if(notification.userInfo[@"error"] != nil){
       block(@[notification.userInfo[@"error"]]);
     } else {
       block(@[[NSNull null]]);
     }
     
   }];
}

-(void) urlCallback: (NSURL *)url {
  NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
  NSMutableDictionary *loginRes =  [NSMutableDictionary dictionary];
  if ([[SPTAuth defaultInstance] canHandleURL:url]) {
    [[SPTAuth defaultInstance] handleAuthCallbackWithTriggeredAuthURL:url callback:^(NSError *error, SPTSession *session) {
      if (error != nil) {
        loginRes[@"error"] = @"error while attempting to login!";
      } else {
        if (session) {
          [self.player loginWithAccessToken:self.auth.session.accessToken];
        }
      }
    }];
  } else {
    loginRes[@"error"] = @"error while attempting to login!";
  }
  [center postNotificationName:@"loginRes" object:nil userInfo:loginRes];
  [center removeObserver:self name:@"loginRes" object:nil];
  
}

-(void) setMyScheme:(NSString *)myScheme {
  _myScheme = myScheme;
}

@end
