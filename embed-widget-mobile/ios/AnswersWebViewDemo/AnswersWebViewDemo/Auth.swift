//
//  Auth.swift
//  AnswersWebViewDemo
//
//  Created by Almog Adziashvili on 26/08/2021.
//

import Foundation

public class Auth {
    @objc public func authUser(setToken: @escaping (String) -> Void) {
        print("authenticating user!");
        
        let parameters = ["firstName": "Samuel", "lastName": "Swift", "email": "samuel-swift@anstest-halliburton.com"]
        // put here your authentication endpoint link!
        let url = URL(string: "")!
        let session = URLSession.shared
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted)
        } catch let error {
            print(error.localizedDescription)
        }
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            
            guard error == nil else {
                return
            }
            
            guard let data = data else {
                return
            }
            
            do {
                //create json object from data
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                    print("user token json \(json)")
                    if (json["token"] as? String != nil) {
                        setToken(json["token"] as! String)
                    } else {
                        print("no user token received from server!")
                    }
                }
            } catch let error {
                print(error.localizedDescription)
            }
        })
        task.resume()
        
        
    }
}
