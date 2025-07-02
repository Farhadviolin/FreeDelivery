from optimizely import optimizely
optimizely_client = optimizely.Optimizely(sdk_key="YOUR_SDK_KEY")
def is_experiment_active(user_id, experiment_key):
    return optimizely_client.is_feature_enabled(experiment_key, user_id)
