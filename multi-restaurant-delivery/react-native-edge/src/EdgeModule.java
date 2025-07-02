package com.delivery.edge;
import com.facebook.react.bridge.*;
import org.tensorflow.lite.Interpreter;
import java.io.File;
import java.util.*;

public class EdgeModule extends ReactContextBaseJavaModule {
  public EdgeModule(ReactApplicationContext ctx) { super(ctx); }
  @Override public String getName() { return "EdgeModule"; }
  @ReactMethod
  public void runInference(String modelPath, ReadableArray input, Promise promise) {
    Interpreter tflite = new Interpreter(new File(modelPath));
    float[][] output = new float[1][10]; // NUM_CLASSES=10 Beispiel
    tflite.run(input.toArrayList(), output);
    List<Float> result = new ArrayList<>();
    for (float v : output[0]) result.add(v);
    promise.resolve(Arguments.fromList(result));
  }
}
