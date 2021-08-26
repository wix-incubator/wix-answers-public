//
//  ViewController.swift
//  AnswersWebViewDemo
//
//  Created by Almog Adziashvili on 26/08/2021.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate, WKScriptMessageHandler {
    var webView: WKWebView!
    var JS_INTERFACE_NAME = "iosBridge"
    var REFRESH_TOKEN_THRESHOLD = 1000 * 60 * 5 - 1000 * 10 // 4 minutes 50 seconds

    var mToken: String! // Will hold the user's token
    var mTokenUpdateTimestamp: Int64 = -1 // Will hold the generate time for the token
    var mTenantName = "" // Answers tenant name
    var mWidgetId = "" // Answers widget id
    
    override func loadView() {
      // Setup WebKit WebView and View
      let webConfiguration = WKWebViewConfiguration()
      webView = WKWebView(frame: .zero, configuration: webConfiguration)
      webView.uiDelegate = self
      view = webView
      view.snapshotView(afterScreenUpdates: true)

      // Initialize Token, then load widget in WebView
      getToken(callback: loadWebView)
    }

    override func viewDidLoad() {
      super.viewDidLoad()
        
      // userContentController and postMessage handler
      configureWebViewPostMessages()
    }

    func getToken(callback: @escaping (String) -> Void) {
      Auth().authUser() { (token) -> Void in
        self.mToken = token
        self.mTokenUpdateTimestamp = Int64((Date().timeIntervalSince1970 * 1000.0).rounded())
        callback(token)
      }
    }
    
    func shouldRefreshToken() -> Bool {
      if (mTokenUpdateTimestamp == -1) {
        return true
      }
      let now = Int64((Date().timeIntervalSince1970).rounded())
      return now - mTokenUpdateTimestamp < REFRESH_TOKEN_THRESHOLD
    }
    
    func sendTokenToWebView(token: String) {
      let script = String(format: "window.postMessageToSelf({__ansWidget: {type: 'authentication-response', data: {token: '%@'}}}, location.origin);", token);
      DispatchQueue.main.async {
        self.webView.evaluateJavaScript(script, completionHandler:nil)
      }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
      if (message.name == JS_INTERFACE_NAME) {
        guard let body = message.body as? [String: Any] else { return }
        guard let ansWidget = body["__ansWidget"] as? [String: Any] else { return }
        guard let type = ansWidget["type"] as? String else { return }
        if (type == "authentication-request") {
          if (shouldRefreshToken()) {
            getToken(callback: sendTokenToWebView)
          } else {
            sendTokenToWebView(token: mToken)
          }
        } else if (type == "collapse-widget") {
          // This will run when the user is trying to get out of the widget
        }
      }
    }
    
    func configureWebViewPostMessages() {
      webView.configuration.userContentController.add(self, name: JS_INTERFACE_NAME)
      webView.translatesAutoresizingMaskIntoConstraints = false
      let overridePostMessageScript = String(format: "window.postMessageToSelf = window.postMessage;window.parent.postMessage = function(message, targetOrigin, transfer) {console.log('sending message', message); return window.webkit.messageHandlers.%@.postMessage(message);};", JS_INTERFACE_NAME)
      webView.evaluateJavaScript(overridePostMessageScript, completionHandler:nil);
    }
    
    func loadWebView(token: String) {
      let url = "https://" + mTenantName + ".wixanswers.com/apps/widget/v1/" + mTenantName + "/" + mWidgetId + "/view/en?token=" + token + "&mobile=true&mobilesdk=true"
      let myURL = URL(string: url)
      let myRequest = URLRequest(url: myURL!)
      DispatchQueue.main.async {
        self.webView.load(myRequest)
      }
    }

}

