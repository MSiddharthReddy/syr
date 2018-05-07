package com.example.dereanderson.syrnativeandroid;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.RelativeLayout;

import com.paypal.authcore.authentication.AuthenticationDelegate;
import com.paypal.authcore.authentication.Authenticator;
import com.paypal.authcore.authentication.model.AuthClientConfig;
import com.paypal.authcore.authentication.model.AuthClientConfigBuilder;

import net.openid.appauth.AuthorizationException;
import net.openid.appauth.TokenResponse;



public class MainActivity extends AppCompatActivity {

    final PYPLCheckout sharedInstance = PYPLCheckout.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        RelativeLayout layout = new RelativeLayout(this);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        layout.setLayoutParams(layoutParams);
        WebView w = new WebView(this);

        sharedInstance.interceptWebView(w, this, layout);


        w.loadUrl("https://taco-cat-sticker-store.myshopify.com");
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
        w.setLayoutParams(params);
        layout.addView(w);

        // hide action bar aka title bar
        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        // set the content of the to the Rootview
        setContentView(layout);

    }
}