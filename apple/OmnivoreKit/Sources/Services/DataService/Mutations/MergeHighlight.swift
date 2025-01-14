import Combine
import Foundation
import Models
import SwiftGraphQL

public extension DataService {
  // swiftlint:disable:next function_parameter_count
  func mergeHighlightPublisher(
    shortId: String,
    highlightID: String,
    quote: String,
    patch: String,
    articleId: String,
    overlapHighlightIdList: [String]
  ) -> AnyPublisher<String, BasicError> {
    enum MutationResult {
      case saved(id: String)
      case error(errorCode: Enums.MergeHighlightErrorCode)
    }

    let selection = Selection<MutationResult, Unions.MergeHighlightResult> {
      try $0.on(
        mergeHighlightSuccess: .init {
          .saved(id: try $0.highlight(selection: Selection.Highlight { try $0.id() }))
        },
        mergeHighlightError: .init { .error(errorCode: try $0.errorCodes().first ?? .badData) }
      )
    }

    let mutation = Selection.Mutation {
      try $0.mergeHighlight(
        input: InputObjects.MergeHighlightInput(
          id: highlightID,
          shortId: shortId,
          articleId: articleId,
          patch: patch,
          quote: quote,
          prefix: .absent(),
          suffix: .absent(),
          annotation: .absent(),
          overlapHighlightIdList: overlapHighlightIdList
        ),
        selection: selection
      )
    }

    let path = appEnvironment.graphqlPath
    let headers = networker.defaultHeaders

    return Deferred {
      Future { promise in
        send(mutation, to: path, headers: headers) { result in
          switch result {
          case let .success(payload):
            if let graphqlError = payload.errors {
              promise(.failure(.message(messageText: "graphql error: \(graphqlError)")))
            }

            switch payload.data {
            case let .saved(id: id):
              promise(.success(id))
            case let .error(errorCode: errorCode):
              promise(.failure(.message(messageText: errorCode.rawValue)))
            }
          case .failure:
            promise(.failure(.message(messageText: "graphql error")))
          }
        }
      }
    }
    .receive(on: DispatchQueue.main)
    .eraseToAnyPublisher()
  }
}
