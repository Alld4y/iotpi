package com.iotpi

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle
import android.view.WindowManager
import android.view.View
import androidx.core.view.WindowInsetsControllerCompat



class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "iotpi"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

       override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // เปิดโหมด  ให้แอปเต็มจอ
         window.decorView.systemUiVisibility = 
                //View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
               // View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                
        
        // ตั้งสีของ StatusBar ให้โปร่งใส
        //window.statusBarColor = 0x00000000 // โปร่งใส (สีดำ 00 เป็นโปร่งใส)

    }
}
