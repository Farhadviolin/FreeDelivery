// Use node label scan avoidance
CALL db.indexes() YIELD name, type WHERE type = 'NODE_LABEL_PROPERTY' RETURN name;
// Example query with hint
CYPHER runtime=slotted PROFILE
MATCH (u:User {id:$uid})-[:ORDERED]->(m:MenuItem)
RETURN m ORDER BY m.popularity DESC LIMIT 10;
