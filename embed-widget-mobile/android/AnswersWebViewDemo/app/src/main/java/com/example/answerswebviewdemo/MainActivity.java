package com.example.answerswebviewdemo;

import static com.example.answerswebviewdemo.Utils.createAuthResponsePayloadForWebView;
import static com.example.answerswebviewdemo.Utils.createImageFile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.WebMessage;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

	final private String JS_INTERFACE_NAME = "AnswersWidgetSDK";
	final private long REFRESH_TOKEN_THRESHOLD = 1000 * 60 * 5 - 1000 * 10; // 4 minutes 50 seconds
	final private static int INPUT_FILE_REQUEST_CODE = 1;

	private String mToken;
	private String mTenantName = "";
	private String mWidgetId = "";
	private String mCameraPhotoPath;
	private long mTokenUpdateTimestamp = -1;
	private ValueCallback<Uri[]> mUploadMessage;

	WebView myWebView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		this.setupAnswersWebView();

		// Authenticate user and LoadWebView
		new Authenticator(token -> {
			setUserToken(token);
			loadWebView();
		}).execute();
	}

	private void setUserToken(String token) {
		mToken = token;
		mTokenUpdateTimestamp = new Date().getTime();
	}

	private void setupAnswersWebView() {
		myWebView = findViewById(R.id.answers_web_view);
		myWebView.getSettings().setJavaScriptEnabled(true);
		myWebView.addJavascriptInterface(new WebAppInterface(), JS_INTERFACE_NAME);
		myWebView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				view.loadUrl(url);
				return true;
			}
			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				view.evaluateJavascript("window.parent.postMessage = function (msg) { " + JS_INTERFACE_NAME + ".sendMessageToAndroid(JSON.stringify(msg))};", null);
			}
		});
		myWebView.setWebChromeClient(new WebChromeClient() {
			public boolean onShowFileChooser(
							WebView webView, ValueCallback<Uri[]> filePathCallback,
							WebChromeClient.FileChooserParams fileChooserParams) {
				if (mUploadMessage != null) {
					mUploadMessage.onReceiveValue(null);
				}
				mUploadMessage = filePathCallback;
				Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
				if (getApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {
					// Create the File where the photo should go
					File photoFile = null;
					try {
						photoFile = createImageFile();
						takePictureIntent.putExtra("PhotoPath", mCameraPhotoPath);
					} catch (IOException ex) {
						Log.e("TAG", "Unable to create Image File", ex);
					}

					// Continue only if the File was successfully created
					if (photoFile != null) {
						mCameraPhotoPath = photoFile.getAbsolutePath();
						Uri photoURI = FileProvider.getUriForFile(getApplicationContext(),
										"com.example.android.fileprovider",
										photoFile);
						takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
					} else {
						takePictureIntent = null;
					}
				}

				Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
				contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
				contentSelectionIntent.setType("*/*");
				String[] mimetypes = {"image/*", "video/*", "application/pdf", "application/msword", "application/vnd.ms-excel"};
				contentSelectionIntent.putExtra(Intent.EXTRA_MIME_TYPES, mimetypes);

				Intent[] intentArray;
				if (takePictureIntent != null) {
					intentArray = new Intent[]{takePictureIntent};
				} else {
					intentArray = new Intent[0];
				}

				Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
				chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
				chooserIntent.putExtra(Intent.EXTRA_TITLE, "Image Chooser");
				chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);

				startActivityForResult(chooserIntent, INPUT_FILE_REQUEST_CODE);

				return true;
			}
		});
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
		Log.i("onActivityResult", "requestCode: " + requestCode + " resultCode: " + resultCode + " - " + (mUploadMessage == null));
		if (requestCode != INPUT_FILE_REQUEST_CODE || mUploadMessage == null) {
			super.onActivityResult(requestCode, resultCode, intent);
			return;
		}

		Uri[] results = null;

		// Check that the response is a good one
		if (resultCode == MainActivity.RESULT_OK) {
			Log.i("onActivityResult", " mCameraPhotoPath: " + mCameraPhotoPath + " - " + (intent == null));

			if (intent == null) {
				// If there is not data, then we may have taken a photo
				if (mCameraPhotoPath != null) {
					results = new Uri[]{Uri.parse("file:" + mCameraPhotoPath)};
				}
			} else {
				String dataString = intent.getDataString();
				if (dataString != null) {
					results = new Uri[]{Uri.parse(dataString)};
				} else if (mCameraPhotoPath != null) {
					results = new Uri[]{Uri.parse("file:" + mCameraPhotoPath)};
				}
			}
		}

		mUploadMessage.onReceiveValue(results);
		mUploadMessage = null;
	}

	private void loadWebView() {
		String url = "https://" + mTenantName + ".wixanswers.com/apps/widget/v1/" + mTenantName + "/" + mWidgetId + "/view/en?token=" + mToken + "&mobile=true&mobilesdk=true";
		myWebView.loadUrl(url);
	}

	private boolean shouldRefreshToken() {
		if (mTokenUpdateTimestamp == -1) {
			return true;
		}
		long now = new Date().getTime();
		return now - mTokenUpdateTimestamp > REFRESH_TOKEN_THRESHOLD;
	}

	private void sendTokenToWebView() {
		final JSONObject authPayload = createAuthResponsePayloadForWebView(mToken);
		if (authPayload != null) {
			final Uri parsedUri = Uri.parse("*");
			this.runOnUiThread(() -> myWebView.postWebMessage(new WebMessage(authPayload.toString()), parsedUri));
		}
	}

	private class WebAppInterface {
		@JavascriptInterface
		public void sendMessageToAndroid(final String msg) {
			String type = getMessageType(msg);
			if (type.equals("authentication-request")) {
				if (shouldRefreshToken()){
					new Authenticator(token -> {
						setUserToken(token);
						sendTokenToWebView();
					}).execute();
				} else {
					sendTokenToWebView();
				}
			} else if (type.equals("collapse-widget")) {
				// Handle close widget view
			}
		}

		private String getMessageType(String msg) {
			try {
				JSONObject jObj = new JSONObject(msg);
				return jObj.getJSONObject("__ansWidget").getString("type");
			} catch (Exception e) {
				return "Unknown";
			}
		}
	}
}