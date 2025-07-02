def test_write_delta_code():
    # Dummy test: check if Spark job contains delta write
    with open('../jobs/write_delta.py') as f:
        content = f.read()
    assert 'format("delta")' in content
    assert 'checkpointLocation' in content
