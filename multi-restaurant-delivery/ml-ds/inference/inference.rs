// inference.rs
use onnxruntime::{environment::Environment, tensor::OrtOwnedTensor, LoggingLevel};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let env = Environment::builder().with_name("edge").with_log_level(LoggingLevel::Warning).build()?;
    let session = env.new_session_builder()?.with_model_from_file("model.onnx")?;
    let input_tensor: Vec<f32> = vec![0.0; 10]; // Beispielinput
    let outputs: Vec<OrtOwnedTensor<f32, _>> = session.run(vec![input_tensor.into()])?;
    println!("Inference output: {:?}", outputs[0].as_slice());
    Ok(())
}
