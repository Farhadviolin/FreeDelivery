// tflite_inference.cpp
#include "tensorflow/lite/interpreter.h"
#include "tensorflow/lite/model.h"
#include "tensorflow/lite/kernels/register.h"
#include <iostream>
#include <vector>

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <model.tflite>" << std::endl;
        return 1;
    }
    auto model = tflite::FlatBufferModel::BuildFromFile(argv[1]);
    if (!model) {
        std::cerr << "Failed to load model." << std::endl;
        return 1;
    }
    tflite::ops::builtin::BuiltinOpResolver resolver;
    std::unique_ptr<tflite::Interpreter> interpreter;
    tflite::InterpreterBuilder(*model, resolver)(&interpreter);
    interpreter->AllocateTensors();
    float* input = interpreter->typed_input_tensor<float>(0);
    // TODO: Fill input with real data
    interpreter->Invoke();
    float* output = interpreter->typed_output_tensor<float>(0);
    std::cout << "Inference output: " << output[0] << std::endl;
    return 0;
}
