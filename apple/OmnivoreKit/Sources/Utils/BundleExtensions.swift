import Foundation

public extension Bundle {
  var isAppStoreBuild: Bool {
    #if DEBUG
      return false
    #else
      guard let path = appStoreReceiptURL?.path else {
        return true
      }
      return !path.contains("sandboxReceipt")
    #endif
  }
}
