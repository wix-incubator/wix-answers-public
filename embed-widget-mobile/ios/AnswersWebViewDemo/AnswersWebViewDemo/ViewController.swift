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
        callback(token)
      }
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
          getToken(callback: sendTokenToWebView)
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

