import shap
# Annahme: model und data_sample geladen
model = shap.load_model('models/propensity')
explainer = shap.Explainer(model.predict, data_sample)
shap_values = explainer(data_sample)
shap.plots.waterfall(shap_values[0])
