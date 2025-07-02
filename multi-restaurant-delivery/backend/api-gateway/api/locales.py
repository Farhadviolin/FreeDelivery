TRANSLATIONS = {
    'en': {
        'greeting': 'Welcome to KiLiefer!',
        'unauthorized': 'Unauthorized',
        'user_registered': 'User registered',
        'invalid_credentials': 'Invalid credentials',
        'only_restaurant_admins': 'Only restaurant admins allowed',
        'payment_initiated': 'Payment initiated. Please complete the payment.',
        'payment_success': 'Payment successful!',
        'invalid_payment_method': 'Invalid payment method.',
        '2fa_sent': '2FA code sent (demo: see response)',
        '2fa_success': '2FA verification successful!',
        '2fa_invalid': 'Invalid 2FA code.'
    },
    'de': {
        'greeting': 'Willkommen bei KiLiefer!',
        'unauthorized': 'Nicht autorisiert',
        'user_registered': 'Benutzer registriert',
        'invalid_credentials': 'Ungültige Zugangsdaten',
        'only_restaurant_admins': 'Nur Restaurant-Admins erlaubt',
        'payment_initiated': 'Zahlung eingeleitet. Bitte Zahlung abschließen.',
        'payment_success': 'Zahlung erfolgreich!',
        'invalid_payment_method': 'Ungültige Zahlungsmethode.',
        '2fa_sent': '2FA-Code gesendet (Demo: siehe Antwort)',
        '2fa_success': '2FA-Verifizierung erfolgreich!',
        '2fa_invalid': 'Ungültiger 2FA-Code.'
    },
    'fr': {
        'greeting': 'Bienvenue chez KiLiefer!',
        'unauthorized': 'Non autorisé',
        'user_registered': 'Utilisateur enregistré',
        'invalid_credentials': 'Identifiants invalides',
        'only_restaurant_admins': 'Seuls les admins de restaurant sont autorisés',
        'payment_initiated': 'Paiement initié. Veuillez finaliser le paiement.',
        'payment_success': 'Paiement réussi!',
        'invalid_payment_method': 'Méthode de paiement invalide.',
        '2fa_sent': 'Code 2FA envoyé (démo : voir la réponse)',
        '2fa_success': 'Vérification 2FA réussie!',
        '2fa_invalid': 'Code 2FA invalide.'
    },
    'es': {
        'greeting': '¡Bienvenido a KiLiefer!',
        'unauthorized': 'No autorizado',
        'user_registered': 'Usuario registrado',
        'invalid_credentials': 'Credenciales inválidas',
        'only_restaurant_admins': 'Solo administradores de restaurante permitidos',
        'payment_initiated': 'Pago iniciado. Por favor, complete el pago.',
        'payment_success': '¡Pago exitoso!',
        'invalid_payment_method': 'Método de pago no válido.',
        '2fa_sent': 'Código 2FA enviado (demo: ver respuesta)',
        '2fa_success': '¡Verificación 2FA exitosa!',
        '2fa_invalid': 'Código 2FA inválido.'
    }
}

def translate(key: str, lang: str = 'en') -> str:
    return TRANSLATIONS.get(lang, TRANSLATIONS['en']).get(key, key)
