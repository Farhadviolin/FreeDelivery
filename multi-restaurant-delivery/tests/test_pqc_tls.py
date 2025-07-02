import ssl, socket
context = ssl.create_default_context()
context.load_verify_locations('/opt/openssl-pqc/certs/ca.pem')
# Enable PQC cipher
context.set_ciphers('ECDHE-KECCAK256-KYBER-512-SHA384')
with socket.create_connection(('service.delivery.local', 443)) as sock:
    with context.wrap_socket(sock, server_hostname='service.delivery.local') as ssock:
        print(ssock.cipher())
