//
//  LoggingManager.m
//  MosaicPlayer
//
//  Created by Marcelo Ribeiro on 12/12/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "LoggingManager.h"
#import <React/RCTLog.h>

@implementation LoggingManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logMessage:(NSString *)message)
{
  RCTLogWarn(@"LOG:: %@", message);
}

@end
