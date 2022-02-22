import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

// ----------------------------------------------------------------------
export default function AuthSocial() {
  const { loginWithGoogle } = useAuth ();
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick = {async () => {
            try {
              await loginWithGoogle ();
              navigate('/dashboard', { replace: true }); 
            }
            catch {
              alert('Error occured!')
            }
          
          }}>
          <Icon icon={googleFill} color="#DF3E30" height={24}  
            />
        </Button>

      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
