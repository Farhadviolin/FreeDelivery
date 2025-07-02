import tensorflow as tf
from tensorflow import lite
# Lade zentrales Modell
model = tf.keras.models.load_model('models/production_model')
# Post-Training Quantization
converter = lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [lite.Optimize.DEFAULT]
tflite_model = converter.convert()
open('build/edge_model.tflite','wb').write(tflite_model)
