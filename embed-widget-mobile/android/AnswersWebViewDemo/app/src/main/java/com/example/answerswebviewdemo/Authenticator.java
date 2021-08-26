package com.example.answerswebviewdemo;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Authenticator extends AsyncTask<Void, Void, String> {
    public AsyncResponse delegate = null;

    public interface AsyncResponse {
        void processFinish(String output);
    }

    public Authenticator(AsyncResponse delegate) {
        this.delegate = delegate;
    }

    @Override
    protected String doInBackground(Void... voids) {
        try {
            String urlAddress = ""; // Your endpoint
            URL url = new URL(urlAddress);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            String userData = "{\"firstName\": \"a\", \"lastName\": \"b\", \"email\": \"c@wix.com\"}"; // user information
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = userData.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            try {
                JSONObject jObj = new JSONObject(content.toString());
                return jObj.getString("token");
            } catch (JSONException e) {
                return "ERROR";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    protected void onPostExecute(String token)
    {
        delegate.processFinish(token);
    }
}