from flask_jwt_extended import get_jwt_identity

def get_user_id_from_token():
    """
    Retrieves the userId from the JWT token's identity claim.
    Returns:
        int: The userId extracted from the token, or None if not found.
    """
    current_user = get_jwt_identity()
    user_id = current_user.get('userId') if current_user else None
    return user_id
