package com.example.answerswebviewdemo;

import org.json.JSONObject;

class HttpPayload {
	private String mUrl;
	private String mMethod;
	private JSONObject mData;
	private JSONObject mHeaders;

	HttpPayload(String url, String method, JSONObject data, JSONObject headers) {
		mUrl = url;
		mData = data;
		mMethod = method;
		mHeaders = headers;
	}

	public String getUrl() {
		return mUrl;
	}

	public String getMethod() {
		return mMethod;
	}

	public JSONObject getData() {
		return mData;
	}

	public JSONObject getHeaders() {
		return mHeaders;
	}
}
