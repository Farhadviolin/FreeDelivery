import tflite_runtime.interpreter as tflite
interpreter = tflite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()
# input_data aus Telegraf-Push
def run_inference(input_data, input_index, output_index, threshold):
    interpreter.set_tensor(input_index, input_data)
    interpreter.invoke()
    output = interpreter.get_tensor(output_index)
    if output > threshold:
        trigger_alert(output)
