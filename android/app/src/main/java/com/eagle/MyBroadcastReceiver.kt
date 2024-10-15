package com.eagle

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class MyBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        Log.d("MyBroadcastReceiver", "Broadcast received: ${intent.action}")

        // Handle the boot completed action (or any other action)
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            Log.d("MyBroadcastReceiver", "Device Booted!")
        }
    }
}
