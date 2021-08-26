package com.example.answerswebviewdemo;

import android.os.AsyncTask;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;


public class HttpRequest extends AsyncTask<HttpPayload, Void, StringBuffer> {
    public AsyncResponse delegate = null;

    public interface AsyncResponse {
        void processFinish(StringBuffer output);
    }


    public HttpRequest(AsyncResponse delegate) {
        this.delegate = delegate;
    }

    @Override
    protected StringBuffer doInBackground(HttpPayload... payloads) {
        try {

            HttpPayload payload = payloads[0];
            URL url = new URL(payload.getUrl());
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestMethod(payload.getMethod());

            setHeaders(payload.getHeaders(), con);

            if (payload.getMethod().equals("POST")) {
                return doPostRequest(con, payload.getData());
            } else {
                return doGetRequest(con);
            }

        } catch (Exception e) {
            return null;
        }
    }

    private StringBuffer doGetRequest(HttpURLConnection con) {
        try {
            return doRequest(con);
        } catch (Exception e) {
            return null;
        }
    }

    private StringBuffer doPostRequest(HttpURLConnection con, JSONObject payload) {
        try {
            String payloadStr = payload.toString();
            con.setDoOutput(true);
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = payloadStr.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            return doRequest(con);
        } catch (Exception e) {
            return null;
        }
    }

    private StringBuffer doRequest(HttpURLConnection con) {
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            return content;
        } catch (Exception e) {
            return null;
        }
    }

    private void setHeaders(JSONObject headers, HttpURLConnection con) {
        if (headers != null) {
            try {
                Iterator<String> headerKeys = headers.keys();
                while (headerKeys.hasNext()) {
                    String key = headerKeys.next();
                    if (headers.get(key) instanceof String) {
                        String value = (String) headers.get(key);
                        con.setRequestProperty(key, value);
                    }
                }
            } catch (Exception e) {
            }
        }
    }

    protected void onPostExecute(StringBuffer result) {
        delegate.processFinish(result);
    }
}
