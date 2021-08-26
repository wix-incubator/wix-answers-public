package com.example.answerswebviewdemo;

import static android.os.Environment.getExternalStoragePublicDirectory;

import android.os.Environment;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Utils {

    static public JSONObject createAuthResponsePayloadForWebView(String mToken) {
        try {
            JSONObject authResponsePayload = new JSONObject();
            JSONObject internalObj = new JSONObject();
            JSONObject dataObj = new JSONObject();

            dataObj.put("token", mToken);
            internalObj.put("type", "authentication-response");
            internalObj.put("data", dataObj);
            authResponsePayload.put("__ansWidget", internalObj);

            return authResponsePayload;
        } catch (JSONException e) {
            return null;
        }
    }

    static public File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
    }
}
