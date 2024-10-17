package com.eagle

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.ktx.messaging
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage // REMOVE THIS IMPORT

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // REMOVE the following line or comment it out
                    // add(ReactNativePushNotificationPackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // Load native entry point if opted-in for the New Architecture
            load()
        }

        // Create the default notification channel for Android 8.0 and above
         createNotificationChannel()

        // Initialize Firebase messaging
        initFirebaseMessaging()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "default",
                "Default Channel",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "This is the default notification channel"
            }

            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
            Log.d("NotificationChannel", "Notification Channel created: ${channel.id}")
        }
    }

    private fun initFirebaseMessaging() {
        // Optional: Firebase initialization and Firebase Messaging setup
        Firebase.messaging.isAutoInitEnabled = true
    }
}
