import Button from '@mui/material/Button';
import styled from '@mui/system/styled';

const SettingsBtn = styled(Button)(({ theme }) => ({
  fontFamily: 'SpaceMono',
  textTransform: 'lowercase',
  backgroundColor: theme.palette.gray['5'],
  border: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '0px',
}));

export default SettingsBtn;
