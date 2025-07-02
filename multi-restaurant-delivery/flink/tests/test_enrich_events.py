def test_enrich_events_sql():
    # Dummy test: check if SQL contains expected keywords
    with open('../jobs/enrich_events.py') as f:
        content = f.read()
    assert 'CREATE TABLE raw_events' in content
    assert 'CREATE TABLE enriched_events' in content
    assert 'LEFT JOIN geo_lookup' in content
