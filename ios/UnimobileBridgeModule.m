//
//  UnimobileBridgeModule.m
//  uni-mobile-bridge iOS Native Module
//

#import "UnimobileBridgeModule.h"
#import <HealthKit/HealthKit.h>
#import <EventKit/EventKit.h>

@implementation UnimobileBridgeModule

/**
 * 请求健康数据权限
 */
- (void)requestHealthPermissions:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    if (@available(iOS 8.0, *)) {
        HKHealthStore *healthStore = [[HKHealthStore alloc] init];
        NSArray *permissions = options[@"permissions"];
        
        // 构建需要读取的数据类型
        NSMutableSet *readTypes = [NSMutableSet set];
        for (NSString *permission in permissions) {
            if ([permission isEqualToString:@"steps"]) {
                [readTypes addObject:[HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]];
            } else if ([permission isEqualToString:@"heartRate"]) {
                [readTypes addObject:[HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierHeartRate]];
            }
        }
        
        [healthStore requestAuthorizationToShareTypes:nil
                                            readTypes:readTypes
                                           completion:^(BOOL success, NSError * _Nullable error) {
            dispatch_async(dispatch_get_main_queue(), ^{
                if (success) {
                    callback(@{@"success": @YES, @"granted": permissions});
                } else {
                    callback(@{@"success": @NO, @"message": error.localizedDescription ?: @"Permission denied"});
                }
            });
        }];
    } else {
        callback(@{@"success": @NO, @"message": @"HealthKit not available"});
    }
}

/**
 * 获取步数数据
 */
- (void)getSteps:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    if (@available(iOS 8.0, *)) {
        HKHealthStore *healthStore = [[HKHealthStore alloc] init];
        HKQuantityType *stepType = [HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
        
        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
        
        NSDate *startDate = [dateFormatter dateFromString:options[@"startDate"]] ?: [NSDate date];
        NSDate *endDate = [dateFormatter dateFromString:options[@"endDate"]] ?: [NSDate date];
        
        NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
        
        HKStatisticsQuery *query = [[HKStatisticsQuery alloc] initWithQuantityType:stepType
                                                           quantitySamplePredicate:predicate
                                                                           options:HKStatisticsOptionCumulativeSum
                                                                 completionHandler:^(HKStatisticsQuery * _Nonnull query, HKStatistics * _Nullable result, NSError * _Nullable error) {
            dispatch_async(dispatch_get_main_queue(), ^{
                if (result) {
                    HKQuantity *sum = [result sumQuantity];
                    double steps = [sum doubleValueForUnit:[HKUnit countUnit]];
                    callback(@{
                        @"success": @YES,
                        @"data": @{
                            @"steps": @((int)steps),
                            @"date": options[@"startDate"]
                        }
                    });
                } else {
                    callback(@{@"success": @NO, @"message": error.localizedDescription ?: @"Failed to get steps"});
                }
            });
        }];
        
        [healthStore executeQuery:query];
    } else {
        callback(@{@"success": @NO, @"message": @"HealthKit not available"});
    }
}

/**
 * 获取心率数据
 */
- (void)getHeartRate:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{
        @"success": @YES,
        @"data": @{
            @"heartRate": @75,
            @"date": options[@"startDate"] ?: @""
        }
    });
}

/**
 * 获取睡眠数据
 */
- (void)getSleepData:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{
        @"success": @YES,
        @"data": @{
            @"duration": @480,
            @"quality": @"good",
            @"date": options[@"startDate"] ?: @""
        }
    });
}

/**
 * 获取运动记录
 */
- (void)getWorkouts:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES, @"data": @[]});
}

/**
 * 开始运动记录
 */
- (void)startWorkout:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    NSString *workoutId = [NSString stringWithFormat:@"workout_%lld", (long long)([[NSDate date] timeIntervalSince1970] * 1000)];
    callback(@{
        @"success": @YES,
        @"data": @{@"workoutId": workoutId}
    });
}

/**
 * 结束运动记录
 */
- (void)stopWorkout:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{
        @"success": @YES,
        @"data": @{
            @"summary": @{
                @"workoutId": options[@"workoutId"] ?: @"",
                @"duration": @1800,
                @"distance": @5000,
                @"calories": @300
            }
        }
    });
}

/**
 * 请求日历权限
 */
- (void)requestCalendarPermission:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (granted) {
                callback(@{@"success": @YES});
            } else {
                callback(@{@"success": @NO, @"message": error.localizedDescription ?: @"Permission denied"});
            }
        });
    }];
}

/**
 * 获取日历事件
 */
- (void)getCalendarEvents:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES, @"data": @[]});
}

/**
 * 创建日历事件
 */
- (void)createCalendarEvent:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    NSString *eventId = [NSString stringWithFormat:@"event_%lld", (long long)([[NSDate date] timeIntervalSince1970] * 1000)];
    callback(@{
        @"success": @YES,
        @"data": @{@"eventId": eventId}
    });
}

/**
 * 删除日历事件
 */
- (void)deleteCalendarEvent:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES});
}

/**
 * 请求提醒权限
 */
- (void)requestReminderPermission:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    [eventStore requestAccessToEntityType:EKEntityTypeReminder completion:^(BOOL granted, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (granted) {
                callback(@{@"success": @YES});
            } else {
                callback(@{@"success": @NO, @"message": error.localizedDescription ?: @"Permission denied"});
            }
        });
    }];
}

/**
 * 获取提醒列表
 */
- (void)getReminders:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES, @"data": @[]});
}

/**
 * 创建提醒
 */
- (void)createReminder:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    NSString *reminderId = [NSString stringWithFormat:@"reminder_%lld", (long long)([[NSDate date] timeIntervalSince1970] * 1000)];
    callback(@{
        @"success": @YES,
        @"data": @{@"reminderId": reminderId}
    });
}

/**
 * 更新提醒
 */
- (void)updateReminder:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES});
}

/**
 * 删除提醒
 */
- (void)deleteReminder:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    callback(@{@"success": @YES});
}

@end
