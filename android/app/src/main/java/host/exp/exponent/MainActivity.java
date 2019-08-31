package host.exp.exponent;

import android.os.Bundle;
import android.annotation.TargetApi;
import android.os.Build;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivityDelegate;

import com.facebook.react.ReactPackage;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import org.unimodules.core.interfaces.Package;

import java.util.List;

import host.exp.exponent.experience.DetachActivity;
import host.exp.exponent.generated.DetachBuildConstants;

public class MainActivity extends DetachActivity implements PermissionAwareActivity {
  private final ReactActivityDelegate mDelegate;
  @Nullable private PermissionListener mPermissionListener;

  protected MainActivity() {
    mDelegate = createReactActivityDelegate();
  }

  @Override
  public String publishedUrl() {
    return "exp://exp.host/@fedme/beerpi";
  }

  @Override
  public String developmentUrl() {
    return DetachBuildConstants.DEVELOPMENT_URL;
  }

  @Override
  public List<ReactPackage> reactPackages() {
    return ((MainApplication) getApplication()).getPackages();
  }

  @Override
  public List<Package> expoPackages() {
    return ((MainApplication) getApplication()).getExpoPackages();
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public Bundle initialProps(Bundle expBundle) {
    // Add extra initialProps here
    return expBundle;
  }

  protected @Nullable String getMainComponentName() {
    return null;
  }

  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName());
  }

  @Override
  public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
    mDelegate.requestPermissions(permissions, requestCode, listener);
  }

  @Override
  public void onRequestPermissionsResult(
    int requestCode,
    String[] permissions,
    int[] grantResults) {
    mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
}
