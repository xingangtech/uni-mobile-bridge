Pod::Spec.new do |s|
  s.name         = "UnimobileBridgeModule"
  s.version      = "1.0.0"
  s.summary      = "uni-mobile-bridge iOS Native Module"
  s.description  = "跨平台原生功能访问组件 - iOS实现"
  s.homepage     = "https://github.com/xingangtech/uni-mobile-bridge"
  s.license      = { :type => "MIT" }
  s.author       = { "xingangtech" => "support@xingangtech.com" }
  s.platform     = :ios, "10.0"
  s.source       = { :git => "https://github.com/xingangtech/uni-mobile-bridge.git", :tag => "#{s.version}" }
  s.source_files = "ios/*.{h,m,swift}"
  s.requires_arc = true
  
  s.frameworks = 'UIKit', 'HealthKit', 'EventKit'
end
