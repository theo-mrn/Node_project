import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('294130312954-h4fjidvi8o7gklofmrpueismo0ujifch.apps.googleusercontent.com');

export const verifyGoogleToken = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '294130312954-h4fjidvi8o7gklofmrpueismo0ujifch.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();

    console.log('Utilisateur vérifié:', payload);

    // Traitez l'utilisateur ici (inscription ou connexion)

    res.status(200).json({ message: 'Utilisateur authentifié.', user: payload });
  } catch (error) {
    console.error('Erreur de vérification Google:', error);
    res.status(400).json({ error: 'Token invalide.' });
  }
};